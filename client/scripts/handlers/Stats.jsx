'use strict';

var React = require('react'),
    debug = require('debug')('Stats'),
    Modal = require('react-bootstrap').Modal;

var Stats = React.createClass({

  mixins: [ ReactMeteorData ],

  startMeteorSubscriptions() {
    Meteor.subscribe('gameStats');
  },

  getMeteorData() {
    const gameStats = Gamestats.findOne({userId: Meteor.userId()});

    debug('Game stats', gameStats);

    if (!gameStats) {
      return {
        loaded: false
      };
    }

    return {
      userId: Meteor.userId(),
      gameStats: gameStats,
      loaded: true
    };
  },

  render() {
    if (!this.data.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Statistics</h1>
        <R.GameStats     gameStats={this.data.gameStats} />
        <R.TileStats     gameStats={this.data.gameStats} />
        <R.QuestionStats gameStats={this.data.gameStats} />
      </div>
    );

  }

});

Reminisce.Stats = Stats;

