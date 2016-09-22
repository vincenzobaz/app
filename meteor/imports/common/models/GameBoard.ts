import * as _ from 'lodash';
import {RawTile, Tile} from "./Tile";

export interface RawGameBoard {
  _id: string | Mongo.ObjectID;
  userId: string | Mongo.ObjectID;
  tiles: RawTile[];
}

export const GameBoardProps = ['_id', 'userId', 'tiles'];

export class GameBoard {

  constructor(
    public _id: string | Mongo.ObjectID,
    public userId: string | Mongo.ObjectID,
    public  tiles: Tile[]
  ) {}

  getTileById(tileId: Mongo.ObjectID): Tile {
    return _.find(this.tiles, (tile: Tile) => tile._id.toString() == tileId.toString());
  }

  static fromRaw(data: RawGameBoard): GameBoard {
    if (!data) {
      return null;
    }

    const tiles: Tile[] = data.tiles.map((t: RawTile) => Tile.fromRaw(t));

    if (!data._id) {
      data._id =  new Mongo.ObjectID();
    }

    return new GameBoard(data._id, data.userId, tiles);
  };

}

