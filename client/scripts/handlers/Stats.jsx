'use strict';

var React = require('react'),
    debug = require('debug')('Stats'),
    Modal = require('react-bootstrap').Modal;

var Stats = React.createClass({

    mixins: [ReactMeteorData],

    startMeteorSubscriptions() {
        Meteor.subscribe('gameStats');
    },

    getMeteorData() {
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
        if (!this.data.loaded) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h1>Statistics</h1>
                <R.GameStatChart gameStats={this.state.gameStats}/>
                <R.GameStatQuestions gameStats={this.state.gameStats}/>
            </div>
        );

    }


});

Reminisce.Stats = Stats;
