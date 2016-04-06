
'use strict';

import {createTiles} from './../boot/helpers/createTiles';
import {Game} from "../models/Game";

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
    return createTiles(this.props.game);
  }

}

