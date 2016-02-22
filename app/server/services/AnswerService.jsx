import {Kind} from './../../common/models/questions/Kind';
import {Games} from './../collections/Games';
import {Marker} from './../../common/models/questions/Marker';
import {GameStatus} from './../../common/models/GameStatus';
import {GameBoardRepository} from './../repositories/GameBoardRepository';
import {GameRepository} from './../repositories/GameRepository';
import {AnswerVerificationService} from './verification/AnswerVerificationService';
import {BoardStateService} from './BoardStateService';
import {GamestatsService} from './GamestatsService';
import {findIndex} from './../../common/helpers/findIndex';
import {MultipleChoiceAnswer, MultipleChoiceData, MultipleChoiceVerificationService} from './verification/MultipleChoiceVerificationService';
import {TimelineAnswer, TimelineData, TimelineVerificationService} from './verification/TimelineVerificationService';
import {GeoAnswer, GeoData, GeoVerificationService} from './verification/GeoVerificationService';
import {OrderAnswer, OrderItem, OrderData} from './verification/ReorderVerificationService';


class AnswerService {

    timeOut(currentUser, gameId, tileId) {
      if (gameId == null || tileId == null) {
        return {
          status: 'error',
          message: `Missing arguments for AnswerService.timeOut`
        };
      }

      const game = Games.findOne(gameId);

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

      const tile  = board.getTileById(tileId);

      if (!tile) {
        return {
          status: 'error',
          message: `Cannot find tile with id ${tileId}`
        };
      }

      tile.setDisabled(true);
      GameBoardRepository.save(board);

      const currentPlayer = game.getPlayerTurn();
      const boardState    = game.getBoardState();
      const boardService  = new BoardStateService(boardState, currentPlayer);
      const wins          = boardService.playerWins();
      const draw          = boardService.isDraw(game);

      this.updateStats(game, wins, draw, currentUser, currentPlayer);

      if (wins) {
        game.setWonBy(currentPlayer);
        game.setStatus(GameStatus.Ended);
      }
      else if (draw) {
        game.setWonBy(0);
        game.setStatus(GameStatus.Ended);
      }

      game.nextTurn();
      GameRepository.save(game);

      return {
        status: 'success'
      };
    }

    post(currentUser, gameId, tileId, answers)
    {
        const game = Games.findOne(gameId);

        if (!game) {
          throw new Meteor.Error(500, `Cannot find game with id ${gameId}`);
        }

        const board = game.getCurrentBoard();
        const tiles = board.getTiles();
        const tile  = board.getTileById(tileId);

        if (!tile) {
            throw new Meteor.Error(500, `Cannot find tile with id ${tileId}`);
        }

        const boardState    = game.getBoardState();
        const currentPlayer = game.getPlayerTurn();
        const boardService  = new BoardStateService(boardState, currentPlayer);

        const typedAnswers = this.typeAnswers(tile, answers);

        const result    = AnswerVerificationService.verifyTile(tile, typedAnswers);
        const questions = tile.getQuestions();

        GamestatsService.updateStatsForQuestions(questions, currentUser, result);

        const scores = _.zip(questions, result).map(([question, score]) => ({
            questionId: question._id,
            score: score
        }));
      
        const index = findIndex(tiles, t => t.getId() === tileId);
        const row   = Math.floor(index / 3);
        const col   = index % 3;

        const correctAnswersNum = scores.reduce((acc, s) => acc + s.score, 0);
        const wrongAnswersNum   = questions.length - correctAnswersNum;
        const otherScore        = boardState[row][col].player !== currentPlayer ? boardState[row][col].score : 0;

        const newScore = correctAnswersNum;
        game.incrementCurrentPlayerScore(newScore);

        if (newScore > otherScore || otherScore === 0) {
            const scoreKey = `player${currentPlayer}Scores`;
            game[scoreKey][tileId] = scores;

            boardState[row][col].player = currentPlayer;
            boardState[row][col].score  = newScore;
        }

        tile.setDisabled(true);

        const filterMoves = m => m.row !== row || m.column !== col;

        this.updateMoves(game, newScore, currentPlayer, filterMoves);

        const wins = boardService.playerWinsForRowAndColumn(currentPlayer, row, col);
        const draw = boardService.isDraw(game);

        this.updateStats(game, wins, draw, currentUser, currentPlayer);

        if (wins) {
          game.setWonBy(currentPlayer);
          game.setStatus(GameStatus.Ended);
        }
        else if (draw) {
          game.setWonBy(0);
          game.setStatus(GameStatus.Ended);
        }

        game.nextTurn();

        GameRepository.save(game);
        GameBoardRepository.save(board);

        const returnValue = {
            status  : 'success',
            win     : wins,
            draw    : draw,
            correct : correctAnswersNum,
            wrong   : wrongAnswersNum
        };

        console.log(`Result of player ${currentPlayer} turn:`, returnValue);

        return returnValue;
    }

    typeAnswers(tile, answers)
    {
      const questions = tile.getQuestions();

      return _.zip(questions, answers).map(([q, a]) => this.typeAnswer(q, a));
    }

    typeAnswer(question, answer) {
        const kind = question.getKind();
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
            throw Meteor.Error(500, `Unsupported question type ${kind}`);
        }
    }

    updateMoves(game, score, player, filterMoves)
    {
        const player1AvailableMoves = game.getPlayer1AvailableMoves();
        const player2AvailableMoves = game.getPlayer2AvailableMoves();

        const player1NewMoves = player1AvailableMoves.filter(filterMoves);
        const player2NewMoves = player2AvailableMoves.filter(filterMoves);

        if (score === 3) {
            game.setPlayer1AvailableMoves(player1NewMoves);
            game.setPlayer2AvailableMoves(player2NewMoves);
        }
        else {
            if (player === 1) {
                game.setPlayer1AvailableMoves(player1NewMoves);
            } else {
                game.setPlayer2AvailableMoves(player2NewMoves);
            }
        }
    }

    updateStats(game, wins, draw, user, player)
    {
        if (!wins || !draw) {
          return;
        }

        if (game.status === GameStatus.Ended) {
          return;
        }

        if (wins) {
            GamestatsService.updateStatsGameWon(user);
            GamestatsService.updateStatsGameLost(game.getOpponentForUser(user));
            game.setWonBy(player);
        }
        else if (draw) {
            GamestatsService.updateStatsGameDraw(user);
            GamestatsService.updateStatsGameDraw(game.getOpponentForUser(user));
            game.setWonBy(0);
        }

        game.setStatus(GameStatus.Ended);
    }

}

module.exports = {
  AnswerService: new AnswerService()
};
