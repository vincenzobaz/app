
'use strict';

const React = require('react'),
      Tile = require('../components/Tile'),
      debug = require('debug')('TileFactory');

class TileFactory {

  constructor(game, modalFactory) {
    this.game = game;
    this.board = game.getBoard();
    this.boardState = game.getBoardState();
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
    const type       = icon;
    const answered   = (tile.getScore().them >= 3) ? true : tile.isAnswered();

    // FIXME: This is wrong.
    const row = Math.floor((tileNum - 1) / 3);
    const col = tileNum - 1 - (row * 3);
    const tileState = this.boardState[row][col];
    debug(`State for tile ${tileNum}`, tileState);
    const score = {
      me: tileState.score,
      them: 0
    };

    return (
      <Tile key={'tile-' + tile.getId()}
            title={''}
            answered={answered}
            type={type}
            icon={icon}
            placement={placement}
            number={tileNum}
            score={score || tile.getScore()}
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

