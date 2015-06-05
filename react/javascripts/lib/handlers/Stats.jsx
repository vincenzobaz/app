'use strict';

var React = require('react'),
    shapes = require('../components/shapes'),
    ReactMeteor = require('../third-party/react-meteor'),
    ReactD3Components = require('react-d3-components'),
    GameStatChart = require('../components/GamesStatChart.jsx'),
    GameStatQuestions = require('../components/GamesStatQuestions.jsx'),
    GameStatQuestionsDetail = require('../components/GamesStatQuestionsDetail.jsx'),
    debug = require('debug')('Stats'),
    Modal = require('react-bootstrap').Modal,
    Geo = require('../components/questions/Geo.jsx');


var Stats = React.createClass({
    mixins: [ReactMeteor.Mixin],



startMeteorSubscriptions: function () {
        Meteor.subscribe('gameStats');
    },

    getInitialState: () => {

        return {loaded: false}
    },

    getMeteorState: function () {
        var gameStat = Gamestats.findOne({userId: Meteor.userId()});

        console.log("Gamestats loaded? ", gameStat);
        if (gameStat) {
            return {
                userId: Meteor.userId,
                gameStats: gameStat,
                loaded: true
            }
        } else {
            return {
                loaded: false
            }
        }

        //return {
        //  userId: "tFNJJGLnd9p2CQgXc",
        //  loaded: Session.get('googleChartsLoaded')
        //}
    },

    render() {
        if (!this.state.loaded) {
            return <div>Loading...</div>;
        }

        const subject = new Subject({
            type: 'Text',
            text: 'Chilling at my favorite restaurant'
        });

        return (
            <div>
                <h1>Welcome To Your Stats</h1>
                <GameStatChart gameStats={this.state.gameStats}/>

                <GameStatQuestions gameStats={this.state.gameStats}/>

            </div>
        );

    }


});




//<Modal backdrop={true} animation={true} className='question fullscreen'>
//    <div className='modal-header'>
//        <h3>
//            Question 2 of 3
//        </h3>
//    </div>
//    <div className='modal-body'>
//        <Geo type="GeoWhatCoordinatesWereYouAt"
//             subject={subject}
//             onDone={() => {}}/>
//    </div>
//    <div className='modal-footer'></div>
//</Modal>



module.exports = Stats;
