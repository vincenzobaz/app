

export interface RawTileState {
  player: number;
  score: number;
  //- 1 indicated the tile hasn't been tried yet
  player1Score?: number;
  //- 1 indicated the tile hasn't been tried yet
  player2Score?: number;
}
