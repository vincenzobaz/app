'use strict';

import {QuestionsModal} from "../components/modals/QuestionsModal";
import {Game} from "../models/Game";
import {Tile} from "../../common/models/Tile";
import {Tile as TileComponent } from "../components/Tile";
import {RawTileState} from "../../server/collections/TileState";
import {Kind} from "../../common/models/questions/common/Kind";
import {Score, CONQUERER_TYPE, ConquererType, getConquerorType} from "../../common/models/Score";

export const createTiles = (game: Game) =>
  game.board.tiles.map((tile, n) =>
    createTile(game, tile, n + 1));

const createTile = (game: Game, tile: Tile, tileNum: number) => {
  const boardState = game.boardState;

  const modal = getModalDesc(game, tile);
  const placement = placementForTileAt(tileNum);
  const type: Kind = tile.type;

  const row = Math.floor((tileNum - 1) / 3);
  const col = tileNum - 1 - (row * 3);
  const tileState: RawTileState = boardState[row][col];
  const playerNum = game.myPlayerNumber;

  const score: Score = {
    me: playerNum == 1 ? tileState.player1Score : tileState.player2Score,
    them: playerNum == 1 ? tileState.player2Score : tileState.player1Score,
    conqueredBy: getConquerorType(playerNum, tileState)
  };

  const disabled = tile.isDisabled ||
    score.me >= 3 || score.them >= 3 ||
    game.hasEnded || !game.isMyTurnToPlay;

  return (
    <TileComponent
      key={'tile-' + tile._id}
      title={''}
      type={type}
      placement={placement}
      number={tileNum}
      score={score}
      questionModal={modal}
      disabled={disabled}
      answered={tile.answered}
      winningTile={tileState.winningTile} />

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
    onDismiss: () => {
    }
  };
};


const p = ['left', 'top', 'right'];
const placementForTileAt = (n) =>
  p[(n - 1) % p.length];


