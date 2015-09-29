
'use strict';

var React = require('react'),
    debug = require('debug')('Board');

var Board = React.createClass({

  propTypes: {
    game: R.Shapes.Game.isRequired
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
    return R.createTiles(this.props.game);
  }

});

Reminisce.Board = Board;

