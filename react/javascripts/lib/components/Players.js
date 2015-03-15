/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Player = require('./Player'),
    shapes = require('./shapes');

var Players = React.createClass({

  propTypes: {
    game: shapes.game,
    user: shapes.user.isRequired
  },

  render() {
    return (
      <div className="players">
        {this._renderPlayers()}
      </div>
    );
  },

  _renderPlayers() {
    if (this.props.children) {
      return this.props.children;
    }

    if (!this.props.game) {
      return <Players.None />;
    }

    var game = this.props.game;

    return (
      <div>
        <Player player={this.props.user} isTurn={game.canPlay()} score={game.getScore().me} />
        <Player player={game.getOpponent()} isTurn={!game.canPlay()} isOpponent={true} score={game.getScore().them} />
      </div>
    );
  }
});

Players.None = React.createClass({

  render() {
    return <noscript />;
  }
});

module.exports = Players;
