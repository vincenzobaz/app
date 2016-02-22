import ObjectID = Mongo.ObjectID;
import {RawTile, Tile} from "./Tile";

export interface RawGameBoard {
  _id: ObjectID;
  userId; String;
  tiles: RawTile[]
}

export const GameBoardProps = ['_id', 'userId', 'tiles'];

export class GameBoard {
  
  private _id: ObjectID;
  private _userId: string;
  private _tiles: Tile[];

  constructor(userId: string, tiles: Tile[]);
  constructor(_id: ObjectID, userId: string, tiles: Tile[]);
  constructor(userIdOrId: any, tilesOrUserID: any, tiles?: Tile[]){
    if (userIdOrId instanceof ObjectID) {
      this._id = userIdOrId;
      this._userId = tilesOrUserID;
      this._tiles = tiles;
    } else {
      this._id = new ObjectID();
      this._userId = userIdOrId;
      this._tiles = tilesOrUserID;
    }
  }

  get Id() {
    return this._id;
  }

  get userId() {
    return this.userId;
  }

  get tiles() {
    return this._tiles;
  }

  getTileById(tileId: string) {
    return _.find(this._tiles, tile => tile._id === tileId);
  }

  static fromRaw(data: RawGameBoard) {
  

    const tiles: Tile[] = _.map(data.tiles, (t: Tile) => Tile.fromRaw(t));

    return new GameBoard(data.userId, tiles);
  };


}

