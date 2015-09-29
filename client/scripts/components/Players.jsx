
'use strict';

var React = require('react');

var Players = React.createClass({

  propTypes: {
    game: R.Shapes.Game,
    user: R.Shapes.User.isRequired
  },

  render() {
    return (
      <div className="players">
        {this.renderPlayers()}
      </div>
    );
  },

  renderPlayers() {
    if (this.props.children) {
      return this.props.children;
    }

    if (!this.props.game) {
      return <Players.None />;
    }

    const game = this.props.game;
    const opponent = game.getOpponent();

    if (opponent == null) {
      return <Players.None />;
    }

    return (
      <div>
        <R.Player player={this.props.user} isTurn={game.isMyTurnToPlay()} score={game.getScore().me} waiting={game.isWaiting()} />
        <R.Player player={opponent} isTurn={!game.isMyTurnToPlay()} isOpponent={true} score={game.getScore().them} waiting={game.isWaiting()} />
      </div>
    );
  }
});

Players.None = React.createClass({

  render() {
    return <noscript />;
  }
});

Reminisce.Players = Players;
