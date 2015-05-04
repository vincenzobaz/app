
'use strict';

const React = require('react'),
      Tile = require('../components/Tile'),
      debug = require('debug')('TileFactory');

class TileFactory {

  constructor(game, modalFactory) {
    this.game = game;
    this.board = game.getBoard();
    this.modalFactory = modalFactory;
  }

  getTiles(tiles) {
    return this.board.getTiles().map(
      (tile, n) => this.makeTile(tile, n + 1)
    );
  }

  makeTile(tile, tileNum) {
    const modal      = this.modalFactory.makeModal(tile);
    const placement  = this.placeTileAt(tileNum);
    const opponentId = null;

    const icon       = tile.getIcon();
    const category   = tile.getCategory();

    const type       = icon;
    const answered   = (tile.getScore().them >= 3) ? true : tile.isAnswered();

    return (
      <Tile key={'tile-' + tileNum}
            title={category}
            answered={answered}
            type={type}
            icon={icon}
            placement={placement}
            number={tileNum}
            score={tile.getScore()}
            questionModal={modal}
            opponentId={opponentId}
            disabled={this.game.hasEnded()} />
    );
  }

  placeTileAt(n) {
    const p = ['left', 'top', 'right'];
    return p[(n - 1) % p.length];
  }

}

module.exports = TileFactory;

