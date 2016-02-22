

export type GameStatus = "playing" | "waiting" | "creating" | "failed" | "declined" | "ended";

export const GameStatus = Object.freeze({
    Playing  : 'playing' as GameStatus,
    Waiting  : 'waiting' as GameStatus,
    Creating : 'creating' as GameStatus,
    Failed   : 'failed' as GameStatus,
    Declined : 'declined' as GameStatus,
    Ended    : 'ended' as GameStatus,
});

