export type GameStatus = "playing" | "waiting" | "creating" | "failed" | "declined" | "ended";


export const GAME_STATUS = {
  Playing: "playing" as GameStatus,
  Waiting: "waiting" as GameStatus,
  Creating: "creating" as GameStatus,
  Failed: "failed" as GameStatus,
  Declined: "declined" as GameStatus,
  Ended: "ended" as GameStatus
};
