
'use strict';

const React = require('react'),
      Tile = require('../components/Tile'),
      debug = require('debug')('TileFactory');

// TODO: Refactor this mess.
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
    const disabled   = tile.disabled || this.game.hasEnded() || !this.game.isMyTurnToPlay();

    const row = Math.floor((tileNum - 1) / 3);
    const col = tileNum - 1 - (row * 3);
    const tileState = this.boardState[row][col];
    const playerNum = this.game.getMyPlayerNumber();

    const score = {
      me:   playerNum === tileState.player ? tileState.score : 0,
      them: playerNum !== tileState.player ? tileState.score : 0
    };

    return (
      <Tile key={'tile-' + tile.getId()}
            title={''}
            type={type}
            icon={icon}
            placement={placement}
            number={tileNum}
            score={score || tile.getScore()}
            questionModal={modal}
            opponentId={opponentId}
            disabled={disabled} />
    );
  }

  placeTileAt(n) {
    const p = ['left', 'top', 'right'];
    return p[(n - 1) % p.length];
  }

}

module.exports = TileFactory;

