
import {Events, EventTypes} from "../events"
import {EventBus} from "../events/EventBus";
import {Game} from "../collections/Game";
import {GameBoard} from "../../common/models/GameBoard";
import {HTTPHelper} from "../helpers/http";

export class StatsFeeder {

    public subscribeTo(eventBus: EventBus): void {
        eventBus.on(EventTypes.GameEnded, this.onGameEnded.bind(this));
    }

    public onGameEnded(event: Events.GameEnded): void {
        logger.info("onGameEnded triggered in StatsFeeder")
        let game: Game = event.getData();
        let payload: StatsGame = StatsGame.fromGame(game);
        let req = {data: payload};
        HTTPHelper.post("http://stats", req, x => logger.info("Data sent to stats"));
        logger.info("Data sent to stats")
    }
}

class StatsGame {
    constructor(_id: String,
                player1: String,
                player2: String,
                player1Board ,
                player2Board ,
                status: String,
                player1Score: number,
                player2Score: number,
                wonBy: number,
                creationTime: number) { }

    static fromGame(game: Game): StatsGame {
        return new StatsGame(
            game._id.toString(), // TEST
            game.player1,
            game.player2,
            game.player1Board,
            game.player2Board,
            game.status,
            game.player1Score,
            game.player2Score,
            game.wonBy,
            game.creationTime.getTime())
    }
}
