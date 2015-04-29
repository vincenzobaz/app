
'use strict';

var React = require('react'),
    Tile = require('../components/Tile'),
    debug = require('debug')('TileFactory');

class TileFactory {

  constructor(game, modalFactory) {
    this.curTileNum = 1;
    this.game = game;
    this.board = game.getBoard();
    console.log(window.board = this.board);
    this.modalFactory = modalFactory;
  }

  // TODO: Replace this.curTileNum with a fold.
  // TODO: Refactor makeTiles().
  getTiles(tiles) {
    this.curTileNum = 1;
    return this.board.getTiles().map(this.makeTile.bind(this));
  }

  makeTile(tile) {
    var modal     = this.modalFactory.makeModal(tile);
    var tileNum   = this.curTileNum;
    var placement = this.getPlacementForTileAt(tileNum);

    this.curTileNum += 1;

    var opponentId;

    var icon = tile.getIcon();
    var category = tile.getCategory();

    if (tileNum === 5) {
      var op = this.game.getOpponent();

      opponentId = op.getFacebookId();
      icon = 'opponent';
      category = `Questions about ${op.getFirstName()}`;
    }

    var type     = icon;
    var answered = (tile.getScore().them >= 3) ? true : tile.isAnswered();
    var wonBy    = this.computeWin(tileNum - 1);

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
            wonBy={wonBy}
            disabled={this.game.hasEnded()} />
    );
  }

  getPlacementForTileAt(n) {
    var p = ['left', 'top', 'right'];
    return p[(n - 1) % p.length];
  }

  computeWin(tileNum) {
    if (!this.game.isWon()) {
      return null;
    }

    var winData = this.game.getWinData();
    var winningMoves = JSON.parse(winData.winningMove);
    var won = winningMoves.indexOf(tileNum) > -1;

    if (!won) {
      return null;
    }

    return (winData.wonBy !== this.game.getOpponent().getFacebookId()) ?
      'me' :
      'opponent';
  }

}

module.exports = TileFactory;

