
'use strict';

import {QuestionsModal} from './../../components/modals/QuestionsModal.jsx';
import {Tile} from './../../components/Tile.jsx';

const React = require('react');

export const createTiles = (game) =>
  game.getBoard().getTiles().map((tile, n) =>
    createTile(game, tile, n + 1));

const createTile = (game, tile, tileNum) => {
  const boardState = game.getBoardState();

  const modal     = getModalDesc(game, tile);
  const placement = placementForTileAt(tileNum);
  const type      = tile.getType();

  const row       = Math.floor((tileNum - 1) / 3);
  const col       = tileNum - 1 - (row * 3);
  const tileState = boardState[row][col];
  const playerNum = game.getMyPlayerNumber();

  const score = {
    me:   playerNum === tileState.player ? tileState.score : 0,
    them: playerNum !== tileState.player ? tileState.score : 0
  };

  const disabled = tile.isDisabled() ||
                   score.me >= 3 || score.them >= 3 ||
                   game.hasEnded() ||
                   !game.isMyTurnToPlay();

  return (
    <Tile key={'tile-' + tile.getId()}
          title={''}
          type={type}
          placement={placement}
          number={tileNum}
          score={score}
          questionModal={modal}
          disabled={disabled} />
  );
};

const getModalDesc = (game, tile) => {
  return {
    element: QuestionsModal,
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


