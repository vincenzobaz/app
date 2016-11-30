import {Kind} from "./questions/common/Kind";
import {Statistics} from "../../server/collections/Statistics";

/**
 * Interface describing the Javascript object before transforming it
 */
export interface RawStats {
    userId: string;
    date: Date;
    amount: number;
    win: number;
    loss: number;
    tie: number;
    rivals: RawRivalCounter[];
    questionsByType: {[key: string]: RawCounter};
}

/**
 * The statistics object
 */
export class Stats {
    constructor(public userId: string,
                public date: Date,
                public amount: number,
                public win: number,
                public loss: number,
                public tie: number,
                public rivals: RivalCounter[],
                public counters: {[key: string]: Counter}) {
    }

    /**
     * Utilitary method to compensate with the lack of Map objects is es5.
     * Retrieves a counter object using an object of type Kind.
     * @param kind
     * @returns {Counter}
     */
    statsByKind(kind: Kind): Counter {
        return this.counters[<string> kind];
    }

    /**
     * Static factory method creating a Stats from a RawStats
     */
    static fromRaw(data: RawStats): Stats {
        if (!data) {
            return null;
        }
        let counters: {[key: string]: Counter} = {
            'MultipleChoice': Counter.fromRaw(data.questionsByType['multipleChoice']),
            'Timeline': Counter.fromRaw(data.questionsByType['timeline']),
            'Geolocation': Counter.fromRaw(data.questionsByType['geolocation']),
            'Order': Counter.fromRaw(data.questionsByType['order'])
        };
        return new Stats(
            data.userId,
            data.date,
            data.amount,
            data.win,
            data.loss,
            data.tie,
            data.rivals.map(ob => RivalCounter.fromRaw(ob)),
            counters
        );
    }
}

/**
 * Interface describing the Javascript object before transformation
 */
export interface RawCounter {
    amount: number,
    correct: number,
    wrong: number,
    avoid: number
}

/**
 * The counter object containing the number of played, won, lost,
 * finished in tie and avoided per tile.
 */
export class Counter {
    constructor(public amount: number,
                public correct: number,
                public wrong: number,
                public avoid: number) {
    }

    /**
     * Static factory method creating a Counter from its raw version
     */
    static fromRaw(rawCounter: RawCounter): Counter {
        return new Counter(
            rawCounter.amount,
            rawCounter.correct,
            rawCounter.wrong,
            rawCounter.avoid
        );
    }
}

export interface RawRivalCounter {
    rivalId: string;
    number: number;
}

export class RivalCounter {
    constructor(public rivalId: string, public number: number) {}
    static fromRaw(raw: RawRivalCounter) {
        return new RivalCounter(raw.rivalId, raw.number);
    }
}

/**
 * Callback to be executed when the list of of RawStats object is received
 * from the stats server.
 * Data are transformed and stored into a mongo collection.
 */
export function fetchStatsCallback(error, result) {
    if (error) {
        logger.error("Could not fetch stats", {error: error});
    }
    // TODO: Restore commented log event
    result.data.stats.forEach(rawStat => {
            Statistics.insert(Stats.fromRaw(rawStat),
                () => logger.debug("Stat retrieved and cached",
                    {userId: rawStat.userId, date: rawStat.date}))
        }
    );
}
