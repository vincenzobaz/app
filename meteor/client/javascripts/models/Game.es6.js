

const reduceScore = (scores) =>
    scores.reduce((acc, x) => acc + x.score, 0);

const computeScoreForPlayer = (boardState, player) => {
    var score = 0;
    for (let i = 0; i < 3; i += 1) {
        for (let j = 0; i < 3; i += 1) {
            const state = boardState[i][j];
            if (state.player === player) {
                score += state.score|0;
            }
        }
    }
    return score;
};

Reminisce.Collection.Games = new Mongo.Collection('games', {
    transform(doc) {
        const isPlayer1 = this.player1 === Meteor.userId();
        const game = {
            _id     : doc._id,
            player1 : doc.player1,
            player2 : doc.player2,
            status  : doc.status,
            score   : {
                me   : computeScoreForPlayer(doc.boardState, isPlayer1 ? 1 : 2),
                them : computeScoreForPlayer(doc.boardState, isPlayer1 ? 2 : 1)
            },
            boardState : doc.boardState,
            board      : (isPlayer1) ? doc.player1Board : doc.player2Board,
            opponentId : (isPlayer1) ? doc.player2      : doc.player1
        };

        return new Reminisce.Model.Game(game);
    }
});

Reminisce.Model.Game = class Game {

  constructor(props) {
    Object.assign(this, props);
  }

  getId() {
    return this._id;
  }

  getStatus() {
    return this.status;
  }

  getOpponentId() {
    return this.opponentId;
  }

  getOpponent() {
    return Reminisce.Store.UserStore.byId(this.getOpponentId());
  }

  getScore() {
    return this.score;
  }

  getCurrentPlayerId() {
    return (this.playerTurn === 1) ? this.player1 : this.player2;
  }

  getCurrentPlayer() {
    return Reminisce.Store.UserStore.byId(this.getCurrentPlayerId());
  }

  isMyTurnToPlay() {
    return this.getCurrentPlayerId() === Meteor.userId();
  }

  hasEnded() {
    return (
        this.getStatus() === GameStatus.Ended ||
        this.getStatus() === GameStatus.Finished
    );
  }

  isPlaying() {
    return this.getStatus() === GameStatus.Playing;
  }

  isWaiting() {
    return this.getStatus() === GameStatus.Waiting;
  }

  isCreating() {
    return this.getStatus() === GameStatus.Creating;
  }

  isWon() {
    var winData = this.getWinData();
    return winData != null && winData.wonBy != null;
  }

  getWinData() {
    return this.winData;
  }

  getBoard() {
    return lazy(this.getId(), this, 'board', boardId => {
      return Reminisce.Collection.GameBoards.findOne(boardId);
    });
  }

  getBoardState() {
    return this.boardState;
  }

};

Reminisce.Model.Game.Status = GameStatus;
