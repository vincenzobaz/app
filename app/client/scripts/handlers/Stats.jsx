'use strict';

import {Gamestats} from './../../../common/collections/Gamestats';
import {GameStats} from './../components/stats/GameStats';
import {TileStats} from './../components/stats/TileStats';
import {QuestionStats} from './../components/stats/QuestionStats';


var React = require('react'),
    debug = require('debug')('Stats'),
    Modal = require('react-bootstrap').Modal;

export const Stats = React.createClass({

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
        <GameStats     gameStats={this.data.gameStats} />
        <TileStats     gameStats={this.data.gameStats} />
        <QuestionStats gameStats={this.data.gameStats} />
      </div>
    );

  }

});

