
import { RawTileState } from "app/server/collections/TileState";
import { Game } from "app/server/collections/Game";

export class BoardStateService
{
  
  constructor(public board: RawTileState[][], public playerNum: number)
  {
  }

  playerWins(player = this.playerNum)
  {
    if (this.verifyWonDiagonal(player) || this.verifyWonAntiDiagonal(player)) {
      return true;
    }

    for (let i = 0; i < 3; i += 1) {
      if (this.verifyWonRow(i, player) || this.verifyWonColumn(i, player)) {
        return true;
      }
    }

    return false;
  }

  playerWinsForRowAndColumn(player, row, column)
  {
    return (
      this.verifyWonRow(row, player) ||
      this.verifyWonColumn(column, player) ||
      this.verifyWonDiagonal(player) ||
      this.verifyWonAntiDiagonal(player)
    );
  }

  verifyWonRow(row, player = this.playerNum)
  {
    for (let i = 0; i < 3; i += 1) {
      if (this.board[row][i].player != player || this.board[row][i].score === 0) {
        return false;
      }
    }

    return true;
  }

  verifyWonColumn(column, player = this.playerNum)
  {
    for (let j = 0; j < 3; j += 1) {
      if (this.board[j][column].player != player || this.board[j][column].score === 0) {
        return false;
      }
    }

    return true;
  }

  verifyWonDiagonal(player = this.playerNum)
  {
    for (let i = 0; i < 3; i += 1) {
      const cell = this.board[i][i];

      if (cell.player != player || cell.score === 0) {
        return false;
      }
    }

    return true;
  }

  verifyWonAntiDiagonal(player = this.playerNum)
  {
    var y = 2;

    for (let x = 0; x < 3; x += 1) {
      const cell = this.board[y][x];

      if (cell.player != player || cell.score === 0) {
        return false;
      }

      y -= 1;
    }

    return true;
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

      if (player !== 0 && cell.player != player) {
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

      if (player !== 0 && cell.player != player) {
        impossible += 1;
        break;
      }

      _.extend(player, cell.player);

      y -= 1;
    }

    return impossible;
  }


}

