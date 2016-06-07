import {Game} from "./models/Game";
import Question from "../common/models/Question";
import {Tile} from "../common/models/Tile";

export class StateCollector {
    static _currentGame: Game;
    static _currentTile: Tile;
    static _currentQuestion: Question;

    static setGame(game: Game) {
        StateCollector._currentGame = game;
    }
    
    static setTile(tile: Tile) {
        StateCollector._currentTile = tile;
    }
    
    static setQuestion(question: Question) {
        StateCollector._currentQuestion = question;
    }
    
    static getState(): {game: Game, tile: Tile, question: Question} {
        return {game: StateCollector._currentGame, tile: StateCollector._currentTile, question: StateCollector._currentQuestion};
    }
    
    
}
