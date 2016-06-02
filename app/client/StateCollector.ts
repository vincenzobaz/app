import {Game} from "./models/Game";
import Question from "../common/models/Question";
import {Tile} from "../common/models/Tile";

export class StateCollector {
    static _currentGame: Game;
    static _currentTile: Tile;
    static _currentQuestion: Question;

    static setGame(game: Game) {
        console.log("current game ", game);
        StateCollector._currentGame = game;
    }
    
    static setTile(tile: Tile) {
        console.log("current Tile", tile);
        StateCollector._currentTile = tile;
    }
    
    static setQuestion(question: Question) {
        console.log("current Question", question);
        StateCollector._currentQuestion = question;
    }
    
    static getState(): {game: Game, tile: Tile, question: Question} {
        return {game: StateCollector._currentGame, tile: StateCollector._currentTile, question: StateCollector._currentQuestion};
    }
    
    
}
