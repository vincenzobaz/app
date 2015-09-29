var React = require('react'),
    ReactD3Components = require('react-d3-components'),
    debug = require('debug')('Stats');

var BarChart = ReactD3Components.BarChart;


var GamesStatQuestions = React.createClass({

    mixins: [ReactMeteorData],

    startMeteorSubscriptions: function() {
        Meteor.subscribe('gameStats');
    },

    getMeteorData: function() {
        var gameStat = this.props.gameStats;
        var mcStat = gameStat.getMCTried() === 0 ? 0: gameStat.getMCCorrect() / gameStat.getMCTried();
        var tlStat = gameStat.getTLTried() === 0 ? 0: gameStat.getTLCorrect() / gameStat.getTLTried();
        var geoStat = gameStat.getGeoTried() === 0 ? 0: gameStat.getGeoCorrect() / gameStat.getGeoTried();
        var orderStat = gameStat.getOrderTried() === 0 ? 0: gameStat.getOrderCorrect() / gameStat.getOrderTried();

        var data = {
            label: 'Game Stats',
            values: [
                {x: 'Multiple Choice', y: mcStat},
                {x: 'Timeline', y: tlStat},
                {x: 'Geo', y: geoStat},
                {x: 'Ordering', y:orderStat}
            ]
        };

        return {
            barData: data
        }
    },

    render() {
        var height = 400;
        var width = 600;
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
        if (this.data.barData == null) { return <div>Loading...</div>; }
        return (
            <div>
                <h2>Success Per Question Type</h2>
                <BarChart
                    data = {this.data.barData}
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

Reminisce.GamesStatQuestions = GamesStatQuestions;
