
import { findIndex, zip } from "lodash";
import Question from "../../common/models/Question";
import { AnswerVerificationService } from "./verification/AnswerVerificationService";
import { Game } from "../collections/Game";
import { Games } from "../collections/Games";
import { Tile } from "../../common/models/Tile";
import { GameBoardRepository } from "../repositories/GameBoardRepository";
import { BoardStateService } from "./BoardStateService";
import {GameStatus, GAME_STATUS} from "../../common/models/GameStatus";
import { GameBoard } from "../../common/models/GameBoard";
import { KIND } from "../../common/models/questions/common/Kind";
import { Marker } from "../../common/models/questions/geolocation/Marker";
import { QuestionFactory } from "./../../common/models/questions/QuestionFactory";
import {MultipleChoiceData, MultipleChoiceAnswer} from "./verification/services/MultipleChoiceVerificationService";
import {TimelineData} from "./verification/answers/TimelineData";
import {TimelineAnswer} from "./verification/answers/TimelineAnswer";
import {GeoData} from "./verification/answers/GeoData";
import {GeoAnswer} from "./verification/answers/GeoAnswer";
import {Answer} from "./verification/answers/Answer";


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
      game.status = GAME_STATUS.Ended;
    }
    else if (draw) {
      game.wonBy = 0;
      game.status = GAME_STATUS.Ended;
    }

    game.nextTurn();
    Games.update(game._id, game);

    return {
      status: 'success',
      message: `All went fine`
    };
  }

  export function post(gameId: string | Mongo.ObjectID, tileId: Mongo.ObjectID, answers, game?: Game) {
    if (!game) {
      game = Games.findOne(gameId);
    }

    if (!game) {
      throw new Meteor.Error('500', `Cannot find game with id ${gameId}`);
    }

    const board: GameBoard = game.getCurrentBoard();
    const tiles = board.tiles;
    const tile: Tile = board.getTileById(tileId);

    if (!tile) {
      throw new Meteor.Error('500', `Cannot find tile with id ${tileId.toString()}`);
    }
    
    tile.questions.forEach((q: Question, i: number) => {
      q.userAnswer = answers[i];
    });

    const boardState = game.boardState;
    const currentPlayer: number = game.playerTurn;
    const boardService = new BoardStateService(boardState, currentPlayer);

    const typedAnswers = this.typeAnswers(tile, answers);

    const result = AnswerVerificationService.verifyTile(tile, typedAnswers);
    const questions = tile.questions;
    

    const scores = questions.map((q: Question, i: number) => {
      return {questionId: q._id, score: result[i]};
    });

    
    const index = findIndex(tiles, (t: Tile) => t._id.toString() == tileId.toString());
    const row = Math.floor(index / 3);
    const col = index % 3;

    const correctAnswersNum = scores.reduce((acc, s) => acc + s.score, 0);
    const wrongAnswersNum = questions.length - correctAnswersNum;
    const otherScore = boardState[row][col].player != currentPlayer ? boardState[row][col].score : 0;

    const newScore = correctAnswersNum;
    game.incrementCurrentPlayerScore(newScore);

    if (newScore > otherScore || otherScore == 0) {
      const scoreKey = `player${currentPlayer}Scores`;
      game[scoreKey][tileId.toString()] = scores;

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
      game.status = GAME_STATUS.Ended;
    } else if (draw) {
      game.wonBy = 0;
      game.status = GAME_STATUS.Ended;
    }

    game.nextTurn();

    Games.update(game._id, game);
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
      questionAnswer[i]= {question: QuestionFactory.questionFromRaw(questions[i]), answer: answers[i]};

    }
    return questionAnswer.map((entry: QuestionAnswer) => this.typeAnswer(entry.question, entry.answer));
  }

  export function typeAnswer(question: Question, answer: Answer): Answer {
    const kind = question.kind;
    const data: any = answer.data;

    switch (kind) {
      case KIND.MultipleChoice:
        return new MultipleChoiceAnswer(new MultipleChoiceData(data.choice));

      case KIND.Timeline:
        return new TimelineAnswer(new TimelineData(data.date));

      case KIND.Geolocation:
        return new GeoAnswer(new GeoData(new Marker(data.marker.latitude, data.marker.longitude)));

      case KIND.Order:
        // const items = data.items.map(i => new OrderItem(i.id, i.text));
        // const order = new OrderData(items);
        //
        // return new OrderAnswer(answer.timespent, order);
        return answer;

      default:
        throw new Meteor.Error('500', `Unsupported question type ${kind}`);
    }
  }

  export function updateMoves(game: Game, score: number, player: number, filterMoves) {
    const player1AvailableMoves = game.player1AvailableMoves;
    const player2AvailableMoves = game.player2AvailableMoves;

    const player1NewMoves = player1AvailableMoves.filter(filterMoves);
    const player2NewMoves = player2AvailableMoves.filter(filterMoves);

    if (score == 3) {
      game.player1AvailableMoves = player1NewMoves;
      game.player2AvailableMoves = player2NewMoves;
    }
    else {
      if (player == 1) {
        game.player1AvailableMoves = player1NewMoves;
      } else {
        game.player2AvailableMoves = player2NewMoves;
      }
    }
  }

}

