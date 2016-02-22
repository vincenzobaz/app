
import {Games, GameProps} from './../collections/Games.jsx';


export const GameRepository = {


  save(game) {
    const doc = _.pick(game, ...GameProps);
    if (game._id) {
      Games.update(game._id, doc);
    } else {
      game._id = Games.insert(doc);
    }

    return game._id;
  }

};

