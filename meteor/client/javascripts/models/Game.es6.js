
Reminisce.Collection.Games = new Mongo.Collection('games', {
    transform(doc) {
        const isPlayer1 = this.player1 === Meteor.userId();

        const game = {
            _id     : doc._id,
            player1 : doc.player1,
            player2 : doc.player2,
            status  : doc.status,
            score   : {
                me   : (isPlayer1  ? doc.player1Scores : doc.player2Scores)|0,
                them : (!isPlayer1 ? doc.player1Scores : doc.player2Scores)|0
            },
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
    return this.getStatus() === 'ended';
  }

  isPlaying() {
    return this.getStatus() === 'playing';
  }

  isWaiting() {
    return this.getStatus() === 'waiting';
  }

  isCreating() {
    return ['creating', 'init'].indexOf(this.getStatus()) > -1;
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
    })
  }

}

