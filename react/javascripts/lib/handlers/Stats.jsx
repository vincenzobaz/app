'use strict';

var React = require('react'),
    shapes = require('../components/shapes'),
    ReactMeteor = require('../third-party/react-meteor'),
    ReactD3Components = require('react-d3-components'),
    GameStatChart = require('../components/GamesStatChart.jsx'),
    GameStatQuestions = require('../components/GamesStatQuestions.jsx'),
    GameStatQuestionsDetail = require('../components/GamesStatQuestionsDetail.jsx'),
    debug = require('debug')('Stats');


var Stats = React.createClass({
    mixins: [ReactMeteor.Mixin],

    startMeteorSubscriptions: function () {
        Meteor.subscribe('gameStats');
    },

    getMeteorState: function () {
        var gameStat = Gamestats.findOne();
        return {
          userId: "tFNJJGLnd9p2CQgXc",
          loaded: Session.get('googleChartsLoaded')
        }
    },

    render() {
        if (!this.state.loaded) {
          return <div>Loading...</div>;
        }

        return (
            <div>
                <h1>Welcome To Your Stats</h1>
                <table>
                    <td>
                        <GameStatChart userId={this.state.userId}/>
                    </td>
                    <td>
                        <GameStatQuestions userId={this.state.userId}/>
                    </td>
                </table>
                <GameStatQuestionsDetail userId={this.state.userId}/>

            </div>
        );
    }


});

module.exports = Stats;
