///<reference path="verification/GeoData.ts"/>

import { findIndex, zip } from "lodash";
import Question from "../../common/models/Question";
import { Answer, AnswerVerificationService } from "./verification/AnswerVerificationService";
import { Game } from "../collections/Game";
import { Games } from "../collections/Games";
import { Tile } from "../../common/models/Tile";
import { GameBoardRepository } from "../repositories/GameBoardRepository";
import { BoardStateService } from "./BoardStateService";
import { GameStatus } from "../../common/models/GameStatus";
import { GameBoard } from "../../common/models/GameBoard";
import { MultipleChoiceData, MultipleChoiceAnswer } from "./verification/MultipleChoiceVerificationService";
import { Kind } from "../../common/models/questions/Kind";
import { Marker } from "../../common/models/questions/Marker";
import { GeoData } from "./verification/GeoData";
import { OrderItem } from "./verification/OrderItem";
import { OrderData } from "./verification/OrderData";
import { OrderAnswer } from "./verification/OrderAnswer";
import { GeoAnswer } from "./verification/GeoAnswer";
import { TimelineData } from "./verification/TimelineData";
import { TimelineAnswer } from "./verification/TimelineAnswer";


interface QuestionAnswer {
  question: Question;
  answer: Answer;
}

export module AnswerService {

  export function timeOut(gameId: string, tileId: string) {
    if (gameId == null || tileId == null) {
      return {
        status: 'error',
        message: `Missing arguments for AnswerService.timeOut`
      };
    }

    const game: Game = <Game>Games.findOne(gameId);

    if (!game) {
      return {
        status: 'error',
        message: `Cannot find game with id ${gameId}`
      };
    }

    const board = game.getCurrentBoard();

    if (!board) {
      return {
        status: 'error',
        message: `Cannot find board for current player`
      };
    }

    const tile: Tile = board.getTileById(tileId);

    if (!tile) {
      return {
        status: 'error',
        message: `Cannot find tile with id ${tileId}`
      };
    }

    tile.disabled = true;
    GameBoardRepository.save(board);

    const currentPlayer = game.playerTurn;
    const boardService = new BoardStateService(game.boardState, currentPlayer);
    const wins = boardService.playerWins();
    const draw = boardService.isDraw(game);

    if (wins) {
      game.wonBy = currentPlayer;
      game.status = GameStatus.Ended;
    }
    else if (draw) {
      game.wonBy = 0;
      game.status = GameStatus.Ended;
    }

    game.nextTurn();
    Game.save(game);

    return {
      status: 'success',
      message: `All went fine`
    };
  }

  export function post(gameId: string, tileId: string, answers) {
    const game: Game = <Game>Games.findOne(gameId);

    if (!game) {
      throw new Meteor.Error(500, `Cannot find game with id ${gameId}`);
    }

    const board: GameBoard = game.getCurrentBoard();
    const tiles = board.tiles;
    const tile: Tile = board.getTileById(tileId);

    if (!tile) {
      throw new Meteor.Error(500, `Cannot find tile with id ${tileId}`);
    }

    const boardState = game.boardState;
    const currentPlayer: number = game.playerTurn;
    const boardService = new BoardStateService(boardState, currentPlayer);

    const typedAnswers = this.typeAnswers(tile, answers);

    const result = AnswerVerificationService.verifyTile(tile, typedAnswers);
    const questions = tile.questions;

    const scores = _.zip(questions, result).map(([question, score]) => ({
      questionId: (<Question>question)._id,
      score: score
    }));

    const index = findIndex(tiles, (t: Tile) => t._id === tileId);
    const row = Math.floor(index / 3);
    const col = index % 3;

    const correctAnswersNum = scores.reduce((acc, s) => acc + s.score, 0);
    const wrongAnswersNum = questions.length - correctAnswersNum;
    const otherScore = boardState[row][col].player != currentPlayer ? boardState[row][col].score : 0;

    const newScore = correctAnswersNum;
    game.incrementCurrentPlayerScore(newScore);

    if (newScore > otherScore || otherScore === 0) {
      const scoreKey = `player${currentPlayer}Scores`;
      game[scoreKey][tileId] = scores;

      boardState[row][col].player = currentPlayer;
      boardState[row][col].score = newScore;
    }

    tile.disabled = true;

    const filterMoves = m => m.row !== row || m.column !== col;

    this.updateMoves(game, newScore, currentPlayer, filterMoves);

    const wins = boardService.playerWinsForRowAndColumn(currentPlayer, row, col);
    const draw = boardService.isDraw(game);


    if (wins) {
      game.wonBy = currentPlayer;
      game.status = GameStatus.Ended;
    } else if (draw) {
      game.wonBy = 0;
      game.status = GameStatus.Ended;
    }

    game.nextTurn();

    Game.save(game);
    GameBoardRepository.save(board);

    const returnValue = {
      status: 'success',
      win: wins,
      draw: draw,
      correct: correctAnswersNum,
      wrong: wrongAnswersNum
    };

    console.log(`Result of player ${currentPlayer} turn:`, returnValue);

    return returnValue;
  }

  export function typeAnswers(tile: Tile, answers: Answer[]) {
    const questions: Question[] = tile.questions;
    let questionAnswer: QuestionAnswer[] = [];

    for (let i: number = 0; i < questions.length; i++) {
      questionAnswer[i].question = questions[i];
      questionAnswer[i].answer = answers[i];
    }
    return questionAnswer.map((entry: QuestionAnswer) => this.typeAnswer(entry.question, entry.answer));
  }

  export function typeAnswer(question: Question, answer: Answer): Answer {
    const kind = question.kind;
    const data = answer.data;

    switch (kind) {
      case Kind.MultipleChoice:
        return new MultipleChoiceAnswer(new MultipleChoiceData(data.choice));

      case Kind.Timeline:
        return new TimelineAnswer(new TimelineData(data.date));

      case Kind.Geolocation:
        return new GeoAnswer(new GeoData(new Marker(data.marker.latitude, data.marker.longitude)));

      case Kind.Order:
        const items = data.items.map(i => new OrderItem(i.id, i.text));
        const order = new OrderData(items);

        return new OrderAnswer(answer.timespent, order);

      default:
        throw new Meteor.Error(500, `Unsupported question type ${kind}`);
    }
  }

  export function updateMoves(game: Game, score: number, player: number, filterMoves) {
    const player1AvailableMoves = game.player1AvailableMoves;
    const player2AvailableMoves = game.player2AvailableMoves;

    const player1NewMoves = player1AvailableMoves.filter(filterMoves);
    const player2NewMoves = player2AvailableMoves.filter(filterMoves);

    if (score === 3) {
      game.player1AvailableMoves = player1NewMoves;
      game.player2AvailableMoves = player2NewMoves;
    }
    else {
      if (player === 1) {
        game.player1AvailableMoves = player1NewMoves;
      } else {
        game.player2AvailableMoves = player2NewMoves;
      }
    }
  }

}

