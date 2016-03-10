
'use strict';

import {QuestionsModal} from './../../components/modals/QuestionsModal';
import {Game} from "../../models/Game";
import {Tile} from "../../../../common/models/Tile";
import * as Component from "./../../components/Tile";
import {SubjectType} from "../../../../common/models/questions/SubjectType";
import {RawTileState} from "../../../../server/collections/TileState";
import {Kind} from "../../../../common/models/questions/Kind";


export const createTiles = (game: Game) =>
  game.board.tiles.map((tile, n) =>
    createTile(game, tile, n + 1));

const createTile = (game: Game, tile: Tile, tileNum: number) => {
  const boardState = game.boardState;

  const modal     = getModalDesc(game, tile);
  const placement = placementForTileAt(tileNum);
  const type: Kind = tile.type;

  const row       = Math.floor((tileNum - 1) / 3);
  const col       = tileNum - 1 - (row * 3);
  const tileState: RawTileState = boardState[row][col];
  const playerNum = game.myPlayerNumber;

  const score = {
    me:   playerNum == tileState.player && tileState.player != 0 ? tileState.score : 0,
    them: playerNum != tileState.player && tileState.player != 0 ? tileState.score : 0
  };

  const disabled = tile.isDisabled ||
                   score.me >= 3 || score.them >= 3 ||
                   game.hasEnded ||
                   !game.isMyTurnToPlay;

  return (
    <Component.Tile key={'tile-' + tile._id}
          title={''}
          type={type}
          placement={placement}
          number={tileNum}
          score={score}
          questionModal={modal}
          disabled={disabled} />
  );
};

const getModalDesc = (game: Game, tile: Tile) => {
  return {
    element: QuestionsModal,
    props: {
      game: game,
      tile: tile,
      questions: tile.questions || []
    },
    onDismiss: () => {}
  };
};

const p = ['left', 'top', 'right'];
const placementForTileAt = (n) =>
  p[(n - 1) % p.length];


