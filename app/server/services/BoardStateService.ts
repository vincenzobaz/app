
import { RawTileState } from "app/server/collections/TileState";
import { Game } from "app/server/collections/Game";
import * as _ from 'lodash';

export class BoardStateService
{
  
  constructor(public board: RawTileState[][], public playerNum: number)
  {
  }

  playerWins(player = this.playerNum): number[]
  {
    
    return _.uniq(_.concat(
      this.verifyWonDiagonal(player),
      this.verifyWonAntiDiagonal(player),
      _.flatMap(_.range(0,3), i => this.verifyWonRow(i, player).concat(this.verifyWonColumn(i, player)))
    ));
  }

  playerWinsForRowAndColumn(player, row, column): number[]
  {
    return _.uniq(
    this.verifyWonRow(row, player).concat(
        this.verifyWonColumn(column, player),
        this.verifyWonDiagonal(player),
        this.verifyWonAntiDiagonal(player)
      ));
    
  }

  verifyWonRow(row, player = this.playerNum): number[]
  {
    for (let i = 0; i < 3; i += 1) {
      if (this.board[row][i].player != player || this.board[row][i].score == 0) {
        return [];
      }
    }
    const base = row * 3;
    return [base, base + 1, base + 2];
  }

  verifyWonColumn(column, player = this.playerNum): number[]
  {
    for (let j = 0; j < 3; j += 1) {
      if (this.board[j][column].player != player || this.board[j][column].score == 0) {
        return [];
      }
    }

    return [column, column + 3, column + 6];
  }

  verifyWonDiagonal(player = this.playerNum): number[]
  {
    for (let i = 0; i < 3; i += 1) {
      const cell = this.board[i][i];

      if (cell.player != player || cell.score == 0) {
        return [];
      }
    }
    
    

    return [0, 4, 8];
  }

  verifyWonAntiDiagonal(player = this.playerNum): number[]
  {
    var y = 2;

    for (let x = 0; x < 3; x += 1) {
      const cell = this.board[y][x];

      if (cell.player != player || cell.score == 0) {
        return [];
      }

      y -= 1;
    }

    return [2, 4, 6];
  }

  isDraw(game: Game)
  {
    if (game.playerTurn == 1) {
      return _.isEmpty(game.player1AvailableMoves);
    }

    return _.isEmpty(game.player2AvailableMoves)
  }

  checkRows()
  {
    var player     = 0;
    var impossible = 0;

    for (var x = 0; x < this.board.length; x += 1) {
      for (var y = 0; y < this.board.length; y += 1) {
        if (this.board[x][y].player != player){
          impossible += 1;
          break;
        }
        _.extend(player, this.board[x][y].player);
      }

    }
    return impossible;
  }

  checkColumns()
  {
    var player     = 0;
    var impossible = 0;

    for (var x = 0; x < 3; x += 1) {
      for (var y = 0; y < 3; y += 1) {
        const cell = this.board[y][x];

        if (cell.player != player){
          impossible += 1;
          break;
        }

        _.extend(player, cell.player);
      }

    }

    return impossible;
  }

  checkDiagonal()
  {
    var player     = 0;
    var impossible = 0;

    for (var x = 0; x < 3; x += 1) {
      const cell = this.board[x][x];

      if (player == 0 && cell.player != player) {
        impossible += 1;
        break;
      }

      _.extend(player, cell.player);

    }

    return impossible;
  }

  checkAntiDiagonal()
  {
    var player     = 0;
    var impossible = 0;
    var y          = 2;

    for (var x = 0; x < 3; x += 1) {
      const cell = this.board[y][x];

      if (player == 0 && cell.player != player) {
        impossible += 1;
        break;
      }

      _.extend(player, cell.player);

      y -= 1;
    }

    return impossible;
  }


}

