import { Game } from './models/Game';
import { Tile } from '../common/models/Tile';
import Question from '../common/models/Question';

export interface CollectedState {
  game: Game;
  tile: Tile;
  question: Question;
}

export class StateCollector {
  static _currentGame: Game;
  static _currentTile: Tile;
  static _currentQuestion: Question;

  static setGame(game: Game): void {
    StateCollector._currentGame = game;
  }

  static setTile(tile: Tile): void {
    StateCollector._currentTile = tile;
  }

  static setQuestion(question: Question): void {
    StateCollector._currentQuestion = question;
  }

  static getState(): CollectedState {
    return {
      game: StateCollector._currentGame,
      tile: StateCollector._currentTile,
      question: StateCollector._currentQuestion
    };
  }

}

