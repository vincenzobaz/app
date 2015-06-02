var React = require('react'),
    shapes = require('../components/shapes'),
    ReactMeteor = require('../third-party/react-meteor'),
    ReactD3Components = require('react-d3-components'),
    debug = require('debug')('Stats');

var BarChart = ReactD3Components.BarChart;


var GamesStatQuestions = React.createClass({

    mixins: [ReactMeteor.Mixin],



    startMeteorSubscriptions: function() {
        Meteor.subscribe('gameStats');
    },

    getMeteorState: function() {
        var gameStat = Gamestats.findOne({userId: this.props.userId});
        var mcStat = gameStat.getMCTried() === 0 ? 0: gameStat.getMCCorrect() / gameStat.getMCTried();
        var tlStat = gameStat.getTLTried() === 0 ? 0: gameStat.getTLCorrect() / gameStat.getTLTried()
        var geoStat = gameStat.getGeoTried() === 0 ? 0: gameStat.getGeoCorrect() / gameStat.getGeoTried()
        var data = {
            label: 'Game Stats',
            values: [
                {x: 'Multiple Choice', y: mcStat},
                {x: 'Timeline', y: tlStat},
                {x: 'Geo', y: geoStat}
            ]
        };

        return {

            statCount: Gamestats.find().count(),
            gameStat: Gamestats.findOne(),
            gamesPlayed: gameStat.getGamesPlayed(),
            gamesWon: Gamestats.findOne().getGamesWon(),
            barData: data
        }
    },

    render() {
        var height = 400;
        var width = 400;
        var margins = {top: 10, bottom: 50, left: 50, right: 10};
        var color = d3.scale.ordinal()
            .domain([
                `Multiple Choice`,
                'Timeline',
                'Geo'
            ])
            .range(["#1E5C82", "#271533" , "#BE2032"]);
        var colorScale = d3.scale.category20();
        var y = d3.scale.linear().domain([0, 1]).range([height - margins.top - margins.bottom, 0]);
        if (this.state.gameStat == null) { return <div>Loading...</div>; }
        return (
            <div>
                <h2>Success Per Question Type</h2>
                <BarChart
                    data = {this.state.barData}
                    width = {width}
                    height = {height}
                    margin = {{top: margins.top, bottom: margins.bottom, left: margins.left, right: margins.right}}
                    yScale = {y}
                    colorScale={color}
                    />
            </div>
        );
    }


});

module.exports = GamesStatQuestions;
