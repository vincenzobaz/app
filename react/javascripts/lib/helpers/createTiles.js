
'use strict';

const React = require('react'),
      Tile = require('../components/Tile');

const createTiles = (game) =>
  game.getBoard().getTiles().map((tile, n) =>
    createTile(game, tile, n + 1));

const crateTile = (game, tile, tileNum) => {
  const boardState = game.getBoardState();

  const modal     = getModalDesc(tile);
  const placement = placementForTileAt(tileNum);
  const icon      = tile.getIcon();
  const type      = icon;
  const disabled  = tile.isDisabled() || game.hasEnded() || !game.isMyTurnToPlay();

  const row       = Math.floor((tileNum - 1) / 3);
  const col       = tileNum - 1 - (row * 3);
  const tileState = boardState[row][col];
  const playerNum = game.getMyPlayerNumber();

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
          answered={answered}
          disabled={disabled} />
  );
};

const getModalDesc = (game, tile) => {
  return {
    modal: QuestionsModal,
    props: {
      game: game,
      tile: tile,
      questions: tile.getQuestions() || []
    },
    onDismiss: () => {}
  };
};

const p = ['left', 'top', 'right'];
const placementForTileAt = (n) =>
  p[(n - 1) % p.length];

module.exports = createTiles;

