
import {Tile} from "../../../common/models/Tile";
import {MeteorPromise} from "./../helpers/meteor";
import {Game} from "../models/Game";
import {Answer} from "../models/Answer";


export module AnswerStore {
  /**
   * Sends the answer to the server. The id's will need to be converted from Mongo.ObjectID's
   * to strings to pass teh sanity check on the server side.
   * @param game
   * @param tile
   * @param answers
   * @returns {Promise<T>|any}
   */

  export function send(game: Game, tile: Tile, answers: Answer[]) {
    return MeteorPromise.call('Answer.post',
      game._id,
      tile._id,
      answers
    );
  }

  export function timeOut(game: Game, tile: Tile) {
    return MeteorPromise.call('Answer.timeOut',
      game._id,
      tile._id
    );
  }

}

