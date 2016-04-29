import {Tile} from "../../common/models/Tile";

export interface Result {
  correct: number;
  wrong: number;
  status?: string;
  tile?: Tile
}
