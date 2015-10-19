
BoardStateService = class BoardStateService
{

  constructor(board, playerNum)
  {
    this.board  = board;
    this.player = playerNum;
  }

  playerWins()
  {
    if (this.verifyWonDiagonal() || this.verifyWonAntiDiagonal()) {
      return true;
    }

    for (let i = 0; i < 3; i += 1) {
      if (this.verifyWonRow(i) || this.verifyWonColumn(i)) {
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

  verifyWonRow(row, player = this.player)
  {
    for (let i = 0; i < 3; i += 1) {
      if (this.board[row][i].player !== player || this.board[row][i].score === 0) {
        return false;
      }
    }

    return true;
  }

  verifyWonColumn(column, player = this.player)
  {
    for (let j = 0; j < 3; j += 1) {
      if (this.board[j][column].player !== player || this.board[j][column].score === 0) {
        return false;
      }
    }

    return true;
  }

  verifyWonDiagonal(player = this.player)
  {
    for (let i = 0; i < 3; i += 1) {
      const cell = this.board[i][i];

      if (cell.player !== player || cell.score === 0) {
        return false;
      }
    }

    return true;
  }

  verifyWonAntiDiagonal(player = this.player)
  {
    var y = 2;

    for (let x = 0; x < 3; x += 1) {
      const cell = this.board[y][x];

      if (cell.player !== player || cell.score === 0) {
        return false;
      }

      y -= 1;
    }

    return true;
  }

  isDraw(game)
  {
    if (game.getPlayerTurn() == 1) {
      return _.isEmpty(game.getPlayer1AvailableMoves());
    }

    return _.isEmpty(game.getPlayer2AvailableMoves())
  }

  checkRows()
  {
    var player     = 0;
    var impossible = 0;

    for (var x = 0; x < this.board.length; x += 1) {
      for (var y = 0; y < this.board.length; y += 1) {
        if (this.board[x][y].player !== player){
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

        if (cell.player !== player){
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

      if (player !== 0 && cell.player !== player) {
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

      if (player !== 0 && cell.player !== player) {
        impossible += 1;
        break;
      }

      _.extend(player, cell.player);

      y -= 1;
    }

    return impossible;
  }


}

