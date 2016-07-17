
'use strict';

import {createTiles} from '../helpers/createTiles';
import {Game} from "../models/Game";
import {StateCollector} from "../StateCollector";

interface BoardProps {
  game: Game;
}

export class Board extends React.Component<BoardProps,{}>{

  render() {
    return (
      <div className='board'>
        {this.renderTiles()}
      </div>
    );
  }

  renderTiles() {
      StateCollector.setGame(this.props.game);
    return createTiles(this.props.game);
  }

}

