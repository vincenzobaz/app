import {RawTileState} from "../../server/collections/TileState";
export type ConquererType = "me" |
    "them" |
    "none"

export const CONQUERER_TYPE = {
  ME: 'me' as ConquererType,
  THEM: 'them' as ConquererType,
  NONE: 'none' as ConquererType
};


export interface ScoreInterface {
    me: number;
    them: number;
    conqueredBy: ConquererType;
}

export class Score implements ScoreInterface {
    constructor(public me: number, public them: number,public  conqueredBy: ConquererType = CONQUERER_TYPE.NONE){
    }
}

export const getConquerorType = (playerNumber: number, tileState: RawTileState): ConquererType => {
  if (tileState.player1Score == -1 && tileState.player2Score == -1) {
    return CONQUERER_TYPE.NONE;
  }
  else if (playerNumber == tileState.player) {
    return CONQUERER_TYPE.ME;
  }
  else {
    return CONQUERER_TYPE.THEM;
  }
};
