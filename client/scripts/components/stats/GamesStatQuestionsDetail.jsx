var React = require('react'),
    ReactMeteor = require('../../third-party/react-meteor'),
    ReactD3Components = require('react-d3-components'),
    debug = require('debug')('Stats');

var BarChart = ReactD3Components.BarChart;


var GamesStatQuestionsDetail = React.createClass({

    mixins: [ReactMeteor.Mixin],

    startMeteorSubscriptions: function() {
        Meteor.subscribe('gameStats');
    },

    getMeteorState: function() {
        var gameStat = Gamestats.findOne({userId: this.props.userId});

        var mcWhichPageT = gameStat.getMCWhichPageDidYouLikeQuestionsTried();
        var mcWhoLikedPostT = gameStat.getMCWhoLikedYourPostQuestionsTried();
        var mcWhoMadeT = gameStat.getMCWhoMadeThisCommentOnYourPostQuestionsTried();
        var tlSharedT = gameStat.getTLWhenDidYouShareThisPostQuestionsTried();
        var geoT = gameStat.getGeoWhatCoordinatesWereYouAtQuestionsTried();

        var mcWhichPageC = gameStat.getMCWhichPageDidYouLikeCorrect();
        var mcWhoLikedPostC = gameStat.getMCWhoLikedYourPostCorrect();
        var mcWhoMadeC = gameStat.getMCWhoMadeThisCommentOnYourPostCorrect();
        var tlSharedC = gameStat.getTLWhenDidYouShareThisPostCorrect();
        var geoC = gameStat.getGeoWhatCoordinatesWereYouAtCorrect();



        var mcWhichPage = mcWhichPageT === 0 ? 0 : mcWhichPageC / mcWhichPageT;
        var mcWhoLikedPost = mcWhoLikedPostT === 0 ? 0 : mcWhoLikedPostC / mcWhoLikedPostT;
        var mcWhoMade = mcWhoMadeT === 0 ? 0 : mcWhoMadeC / mcWhoMadeT;
        var tlShared = tlSharedT === 0 ? 0 : tlSharedC / tlSharedT;
        var geo = geoT === 0 ? 0 : geoC / geoT;
        var data = {
            label: 'Game Stats',
            //values: [
            //    {x: "Which Page Did You Like", y: mcWhichPage},
            //    {x: 'Who Liked Your Post', y: mcWhoLikedPost},
            //    {x: 'Who Made This Comment', y: mcWhoMade},
            //    {x: 'When Did You Share This Post', y: tlShared},
            //    {x: 'At What Corrdinates Did You Share This Post', y: geo}
            //]
            values: [
                {x: "WPDYL", y: mcWhichPage},
                {x: 'WLYP', y: mcWhoLikedPost},
                {x: 'WMTC', y: mcWhoMade},
                {x: 'WDYSTP', y: tlShared},
                {x: 'AWCDYSTP', y: geo}
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
        var height = 300;
        var width = 600;
        var margins = {top: 10, bottom: 50, left: 50, right: 10};
        var color = d3.scale.ordinal()
            .domain([
                `Multiple Choice`,
                'Timeline',
                'Geo'
            ])
            .range(["#1E5C82", "#271533" , "#BE2032"]);
        var y = d3.scale.linear().domain([0, 1]).range([height - margins.top - margins.bottom, 0]);
        if (this.state.gameStat == null) { return <div>Loading...</div>; }
        return (
            <div>
                <h2>Success Per Question</h2>
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

Reminisce.GamesStatQuestionsDetail = GamesStatQuestionsDetail;
