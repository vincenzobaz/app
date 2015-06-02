
'use strict';

var React = require('react'),
    shapes = require('../components/shapes'),
    debug = require('debug')('Stats');

var Stats = React.createClass({

    startMeteorSubscriptions: function() {
        Meteor.subscribe('gameStats');
    },

    getMeteorState: function() {
        return {
            statCount: Gamestats.find().count()
        }
    },

    render() {
        return (
            <div>
                <h1>Welcome To Your Stats {this.state.statCount}</h1>
            </div>
        );
    }


});

module.exports = Stats;
