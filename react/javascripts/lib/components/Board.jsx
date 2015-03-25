
'use strict';

var React = require('react'),
    ModalFactory = require('../helpers/ModalFactory'),
    TileFactory = require('../helpers/TileFactory'),
    shapes = require('./shapes'),
    debug = require('debug')('Board');

var Board = React.createClass({

  propTypes: {
    game: shapes.Game
  },

  getDefaultProps() {
  },

  render() {
    return (
      <div className='board'>
        {this.renderTiles()}
      </div>
    );
  },

  renderTiles() {
    var modalFactory = new ModalFactory(this.props.game.getId(), this.onModalRequestHide);
    var tileFactory = new TileFactory(this.props.game, modalFactory);

    return tileFactory.getTiles();
  },

  onModalRequestHide(modal) {
    debug(modal, 'requested hide');
  },

});

module.exports = Board;

