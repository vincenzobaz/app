
import {Events, EventTypes} from "../events"
import {EventBus} from "../events/EventBus";
import {Game} from "../collections/Game";
import {HTTPHelper} from "../helpers/http";
import GameEnded = Events.GameEnded;
import {GameBoard} from "../../common/models/GameBoard";
import {Kind} from "../../common/models/questions/common/Kind";
import {QuestionType} from "../../common/models/questions/common/QuestionType";
import Question from "../../common/models/Question";
import {Tile} from "../../common/models/Tile";

/**
 * This class defines the StatsFeederService, the service responsible for
 * recuperating Game objects at the end of each game, transforming it into a format accepted
 * by the Stats project and sending the data to the stats module.
 */
export class StatsFeederService {
    private stats_url: string;

    /**
     * Constructor
     * @param stats_url the url of the insertion service of the stats module
     */
    public constructor(stats_url: string) {
        this.stats_url = stats_url;
    }

    /**
     * The service subscribes to the event bus in order to know when a game
     * finishes and therefore to retrieve the game object.
     * @param eventBus
     */
    public subscribeTo(eventBus: EventBus): void {
        eventBus.on(EventTypes.GameEnded, this.onGameEnded.bind(this));
    }

    /**
     * When the game is ended, the data is formatted and sent to the stats module.
     * @param event
     */
    public onGameEnded(event: Events.GameEnded): void {
        logger.debug("onGameEnded triggered in StatsFeeder");
        let statsGame: StatsGame = StatsGame.fromGame(event.getData());
        this.postToStats(statsGame);
    }

    /**
     * Private method taking care of the logistics of sending data to the stats server
     * @param statsGame
     */
    private postToStats(statsGame: StatsGame) {
        let headers: {[id: string] : string} = {
            'Content-Type' : 'application/json'
        };
        let req = {
            headers: headers,
            data: statsGame
        };
        HTTPHelper.post(this.stats_url, req, x => logger.debug("Game sent to stats server", {gameId: statsGame._id}));
    }
}

/**
 * Utiliy function to convert an id (stored as a union type of string and ObjectID)
 * to a plain string.
 */
function idToString(id: Mongo.ObjectID | string): string {
    if (typeof id === "string") {
        return <string>id;
    } else {
        return (<string> (<any>id)._str);
    }
}

/*
The hierarchy of classes used in the application is redefined to be compatible with the stats
server.
 */

class StatsGame {
    constructor(public _id: string,
                public player1: string,
                public player2: string,
                public player1Board: StatsBoard,
                public player2Board: StatsBoard,
                public status: string,
                public player1Score: number,
                public player2Score: number,
                public wonBy: number,
                public creationTime: number) { }

    static fromGame(game: Game): StatsGame {
        return new StatsGame(
            idToString(game._id),
            game.player1,
            game.player2,
            StatsBoard.fromGameBoard(game.player1Board),
            StatsBoard.fromGameBoard(game.player2Board),
            game.status,
            game.player1Score,
            game.player2Score,
            game.wonBy,
            game.creationTime.getTime())
    }
}

class StatsBoard {
    constructor(public userId: string,
                public tiles: StatsTile[],
                public _id: string) {}

    static fromGameBoard(b: GameBoard): StatsBoard {
        return new StatsBoard(
            idToString(b.userId),
            b.tiles.map(tile => StatsTile.fromTile(tile)),
            idToString(b._id)
        )
    }
}

class StatsTile {
    constructor(public type: string,
                public _id: string,
                public question1: StatsQuestion,
                public question2: StatsQuestion,
                public question3: StatsQuestion,
                public score: number,
                public answered: boolean,
                public disabled: boolean
                ) {}

    static fromTile(t: Tile): StatsTile {
        return new StatsTile(
            t.type,
            idToString(t._id),
            StatsQuestion.fromQuestion(t.question1),
            StatsQuestion.fromQuestion(t.question2),
            StatsQuestion.fromQuestion(t.question3),
            t.score.me,
            t.answered,
            t.disabled
        )
    }
}

class StatsQuestion {
    constructor(public kind: Kind,
                public type: QuestionType,
                public correct: boolean) {}

    static fromQuestion(q: Question): StatsQuestion {
        return new StatsQuestion(q.kind, q.type, q.correct);
    }
}
