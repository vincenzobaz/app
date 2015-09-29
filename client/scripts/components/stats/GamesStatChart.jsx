var React = require('react'),
    ReactMeteor = require('../../third-party/react-meteor'),
    ReactD3Components = require('react-d3-components'),
    debug = require('debug')('Stats');

var PieChart = ReactD3Components.PieChart;


var GamesStatChart = React.createClass({

    mixins: [ReactMeteor.Mixin],



    startMeteorSubscriptions: function() {
        Meteor.subscribe('gameStats');
    },

    getMeteorState: function() {
        var gameStat = this.props.gameStats;

        if (gameStat){
            const gamesDraw = gameStat.getGamesPlayed() - gameStat.getGamesWon() - gameStat.getGamesLost();
            var data = {
                label: 'Game Stats',
                values: [
                    {x: 'Games Won', y: gameStat.getGamesWon()},
                    {x: "Draw", y: gamesDraw},
                    {x: 'Games Lost', y: gameStat.getGamesLost()}
                ]
            };
            return {
                gamesPlayed: gameStat.getGamesPlayed(),
                gamesWon: gameStat.getGamesWon(),
                pieData: data
            };
        } else {
            var data = {
                label: 'Game Stats',
                values: [
                    {x: 'Games Won', y: 3},
                    {x: "Draw", y: 2},
                    {x: 'Games Lost', y: 1}
                ]
            };
            return {
                gamesPlayed: 6,
                gamesWon: 3,
                pieData: data
            };
        }

    },

    render() {
        var color = d3.scale.ordinal()
            .domain([
                `Games Won ${this.state.gamesWon/this.state.gamesPlayed}5%`,
                "Draw",
                "Games Lost"
            ])
            .range(["#1E5C82", "#271533" , "#BE2032"]);

        return (
            <div>
                <h2>Total Games Played: {this.state.gamesPlayed}</h2>
                <PieChart
                    data={this.state.pieData}
                    colorScale={color}
                    width={600}
                    height={400}
                    margin={{top: 10, bottom: 10, left: 100, right: 100}}
                    sort={null}
                    />
            </div>
        );
    }


});

Reminisce.GamesStatChart = GamesStatChart;
