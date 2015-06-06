
'use strict';

var React = require('react'),
    createTiles = require('../helpers/createTiles'),
    shapes = require('./shapes'),
    debug = require('debug')('Board');

var Board = React.createClass({

  propTypes: {
    game: shapes.Game.isRequired
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

module.exports = Board;

