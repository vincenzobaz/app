import {RawTile, Tile} from "./Tile";

export interface RawGameBoard {
  _id: string;
  userId; String;
  tiles: RawTile[]
}

export const GameBoardProps = ['_id', 'userId', 'tiles'];

export class GameBoard {

  constructor(public _id: string, public userId: string,public  tiles: Tile[]) {
  }

  getTileById(tileId: string): Tile {
    return _.find(this.tiles, tile => tile._id === tileId);
  }

  static fromRaw(data: RawGameBoard) {
    const tiles: Tile[] = _.map(data.tiles, (t: Tile) => Tile.fromRaw(t));

    return new GameBoard(data._id, data.userId, tiles);
  };


}

