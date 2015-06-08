'use strict';

var React = require('react'),
    shapes = require('../components/shapes'),
    ReactMeteor = require('../third-party/react-meteor'),
    GameStatChart = require('../components/stats/GamesStatChart.jsx'),
    GameStatQuestions = require('../components/stats/GamesStatQuestions.jsx'),
    GameStatQuestionsDetail = require('../components/stats/GamesStatQuestionsDetail.jsx'),
    debug = require('debug')('Stats'),
    Modal = require('react-bootstrap').Modal,
    Geo = require('../components/questions/Geo.jsx');


var Stats = React.createClass({

    mixins: [ReactMeteor.Mixin],

    startMeteorSubscriptions() {
        Meteor.subscribe('gameStats');
    },

    getInitialState() {
        return {
          loaded: false
        };
    },

    getMeteorState() {
        var gameStat = Gamestats.findOne({userId: Meteor.userId()});

        console.log("Gamestats loaded? ", gameStat);

        if (!gameStat) {
            return {
                loaded: false
            };
        }

        return {
            userId: Meteor.userId(),
            gameStats: gameStat,
            loaded: true
        };
    },

    render() {
        if (!this.state.loaded) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h1>Statistics</h1>
                <GameStatChart gameStats={this.state.gameStats}/>
                <GameStatQuestions gameStats={this.state.gameStats}/>
            </div>
        );

    }


});

module.exports = Stats;
