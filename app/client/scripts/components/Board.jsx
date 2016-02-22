
'use strict';

import {Shapes} from './../boot/helpers/shapes';
import {createTiles} from './../boot/helpers/createTiles';

var React = require('react'),
    debug = require('debug')('Board');

export const Board = React.createClass({

  propTypes: {
    game: Shapes.Game.isRequired
  },

  render() {
    debug('Rendering game', this.props.game);
    return (
      <div className='board'>
        {this.renderTiles()}
      </div>
    );
  },

  renderTiles() {
    return createTiles(this.props.game);
  }

});

