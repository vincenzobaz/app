
'use strict';

var React = require('react'),
    CurrentGame = require('./CurrentGame'),
    gameShape = require('./shapes').game,
    sortBy = require('lodash.sortby');

var CurrentGames = React.createClass({

  propTypes: {
    games: React.PropTypes.arrayOf(gameShape).isRequired
  },

  render() {
    return (
      <div className='well'>
        <h4 className='h5'>Current games</h4>
        <ul className='games'>
          {this.renderGames()}
        </ul>
      </div>
    );
  },

  renderGames() {
    if (this.props.games.length <= 0) {
      return <CurrentGame.None />;
    }

    var games = this.sortGamesByIdDesc(this.props.games);

    return games.map(game =>
      <CurrentGame key={game.getId()} game={game} />
    );
  },

  sortGamesByIdDesc(games) {
    return sortBy(games, (g) => g.getId()).reverse();
  }
});

module.exports = CurrentGames;
