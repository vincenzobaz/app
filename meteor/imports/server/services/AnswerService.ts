///<reference path="../../common/models/questions/answers/Answer.ts"/>

import {findIndex} from "lodash";
import Question from "../../common/models/Question";
import {AnswerVerificationService} from "./verification/AnswerVerificationService";
import {Game} from "../collections/Game";
import {Games} from "../collections/Games";
import {Tile} from "../../common/models/Tile";
import {GameBoardRepository} from "../repositories/GameBoardRepository";
import {BoardStateService} from "./BoardStateService";
import {GAME_STATUS} from "../../common/models/GameStatus";
import {GameBoard} from "../../common/models/GameBoard";
import {KIND} from "../../common/models/questions/common/Kind";
import {QuestionFactory} from "../../common/models/questions/QuestionFactory";
import {MultipleChoiceData, MultipleChoiceAnswer} from "./verification/services/MultipleChoiceVerificationService";
import {TimelineData} from "../../common/models/questions/answers/TimelineData";
import {TimelineAnswer} from "../../common/models/questions/answers/TimelineAnswer";
import {GeoAnswer} from "../../common/models/questions/answers/GeoAnswer";
import {Answer} from "./../../common/models/questions/answers/Answer";
import {OrderData} from "../../common/models/questions/answers/OrderData";
import {OrderItem} from "../../common/models/questions/answers/OrderItem";
import {OrderAnswer} from "../../common/models/questions/answers/OrderAnswer";
import {Option, None, Some} from "option-t";
import * as _ from 'lodash';
import {Notification} from "../../common/models/Notification";
import {FacebookService} from "./FacebookService";
import {NotificationRepository} from "../repositories/NotificationRepository";
import {BotService} from "./BotService";


interface QuestionAnswer {
  question: Question;
  answer: Answer;
}

export module AnswerService {


  function _setCurrentPlayerScore(gameId: string, tileId: string, score: number): Option<{game: Game, board: GameBoard}> {

    let game: Game = Games.findOne(gameId);
    if (!game) {
      logger.error("Could not find game", {gameId: gameId});
      return new None<{game: Game, board: GameBoard}>();
    }
    const board = game.getCurrentBoard();
    const tiles = board.tiles;

    if (!board) {
      logger.error("Could not find board", {gameId: game._id});
      return new None<{game: Game, board: GameBoard}>();
    }

    const tile: Tile = board.getTileById(tileId);

    if (!tile) {
      logger.error(`Could not find tile: ${tileId} for board ${board._id}`, {gameId: gameId});
      return new None<{game: Game, board: GameBoard}>();
    }

    const index = findIndex(tiles, (t: Tile) => t._id.toString() == tileId.toString());
    const row = Math.floor(index / 3);
    const col = index % 3;
    tile.disabled = true;
    if (game.playerTurn == 1) {
      game.boardState[row][col].player1Score = score;
    } else {
      game.boardState[row][col].player2Score = score;
    }
    return new Some({game: game, board: board});
  }

  export function timeOut(gameId: string, tileId: string): {status: string, message: string} {


    if (gameId == null || tileId == null) {
      return {
        status: 'error',
        message: `Missing arguments for AnswerService.timeOut`
      };
    }

    const result = _setCurrentPlayerScore(gameId, tileId, 0);

    if (result.isNone) {
      return {
        status: 'error',
        message: ``
      };
    }

    let {game, board} = result.unwrap();

    GameBoardRepository.save(board);
    const currentPlayer = game.playerTurn;
    const boardService = new BoardStateService(game.boardState, currentPlayer);
    const winningTiles: number[] = boardService.playerWins();
    const draw = boardService.isDraw(game);

    if (!_.isEmpty(winningTiles)) {
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

  // TODO: Refactor this mess
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
    const currentPlayerFbId = currentPlayer == 1? game.player1: game.player2;
    const opponentFbId = currentPlayer == 1? game.player2: game.player1;
    const boardService = new BoardStateService(boardState, currentPlayer);

    const typedAnswers = this.typeAnswers(tile, answers);

    const result = AnswerVerificationService.verifyTile(tile, typedAnswers);
    const questions = tile.questions;

    const scores = questions.map((q: Question, i: number) => {
      return {
        questionId: <string>q._id.valueOf(),
        score: result[i]
      };
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
      game.setCurrentPlayerTileScores(tileId, scores);

      boardState[row][col].player = currentPlayer;
      boardState[row][col].score = newScore;
    }

    if (currentPlayer == 1) {
      boardState[row][col].player1Score = newScore;
    } else {
      boardState[row][col].player2Score = newScore;
    }

    tile.disabled = true;
    tile.answered = true;

    const filterMoves = m => m.row !== row || m.column !== col;

    this.updateMoves(game, newScore, currentPlayer, filterMoves);

    const {win, draw} = resolveGameEnded(currentPlayer, boardService, game);
    game.nextTurn();
    Games.update(game._id, game);
    GameBoardRepository.save(board);

    const returnValue = {
      status: 'success',
      win: win,
      draw: draw,
      correct: correctAnswersNum,
      wrong: wrongAnswersNum,
      tile: tile
    };

    logger.debug(`Result of player ${currentPlayer} row: ${row}, column: ${col}`, _.omit(returnValue, 'tile'));

    const opponent = FacebookService.getUserFromFacebookId(opponentFbId);
    const opponentId = opponent? opponent._id: BotService.bot()._id;
    const currentUser= FacebookService.getUserFromFacebookId(currentPlayerFbId);
    const currentUserName = currentUser? currentUser.services.facebook.name: "Bot";
    const notification = new Notification(new Mongo.ObjectID(), opponentId, `${currentUserName} just played their turn`);

    NotificationRepository.save(notification);

    return returnValue;
  }

  function resolveGameEnded(currentPlayer: number, boardService: BoardStateService, game: Game): {win: boolean, draw: boolean} {
    const winningTiles: number[] = boardService.playerWins();
    const draw = boardService.isDraw(game);

    winningTiles.map(i => {
      const row = Math.floor(i / 3);
      const col = i % 3;
        game.boardState[row][col].winningTile = true;
    });


    if (!_.isEmpty(winningTiles)) {
      game.wonBy = currentPlayer;
      game.status = GAME_STATUS.Ended;
    } else if (draw) {
      game.wonBy = 0;
      game.status = GAME_STATUS.Ended;
    }

    return {win: !_.isEmpty(winningTiles), draw: draw};
}

  export function typeAnswers(tile: Tile, answers: Answer[]) {
    const questions: Question[] = tile.questions;
    let questionAnswer: QuestionAnswer[] = [];


    for (let i: number = 0; i < questions.length; i++) {
      questionAnswer[i] = {question: QuestionFactory.questionFromRaw(questions[i]), answer: answers[i]};

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
        return new GeoAnswer(data);

      case KIND.Order:
        const items = data.items.map(i => new OrderItem(i.id, i.text));
        const order = new OrderData(items);

        return new OrderAnswer(answer.timespent, order);
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

