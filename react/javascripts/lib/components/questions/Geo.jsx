
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    GoogleMap = require('../GoogleMap'),
    getQuestionTitleByType = require('./getQuestionTitleByType'),
    shapes = require('../shapes'),
    conf = require('../../helpers/getConfig')('gmaps'),
    Post = require('../Post');
// debug = require('debug')('Geo');

var Geo = React.createClass({

    propTypes: {
        type: React.PropTypes.string.isRequired,
        subject: shapes.subject.isRequired,
        // map: shapes.map.isRequired,
        onDone: React.PropTypes.func.isRequired
    },

    getMeteorState() {
        if (conf){
            return {
                marker: conf.marker.initialPosition
            }
        } else {
            return {}
        }
    },

    getInitialState() {
        console.log('geo props', this.props);
        conf = {
            "zoom": 9,
            "apiKey": "AIzaSyBGVhKl-Aqh5hSTCaCPLIY93dUSqWG1XhE",
            "sensor": false,
            "marker": {"initialPosition": this.props.defaultLocation}
        };
        return {
            marker: conf.marker.initialPosition
        }

    },

    componentWillReceiveProps(props) {
        console.log('Geo just received new props', props.defaultLocation);
        this.setState({
            marker: {latitude: 0, longitude: 0}
        });
    },

    render() {
        console.log('rerendering the geo part',  this.state.marker);

        if (!this.state.marker){
            return (<div>Loading...</div>);
        }
        return (
            <div className="question question-geo">
                <h4>{getQuestionTitleByType(this.props.type)}</h4>
                <div className="question-subject grid-50">
                    <Post post={this.props.subject} />
                </div>
                <div className="question-input grid-50">
                    <div className="map">
                        <GoogleMap latitude={this.state.marker.latitude} longitude={this.state.marker.longitude} zoom={conf.zoom}
                                   width={510} height={250}
                                   apiKey={conf.apiKey} sensor={conf.sensor}
                                   onMarkerMove={this._onMarkerMove} />

                    </div>
                    <Button onClick={this._onDone}>Done</Button>
                </div>
            </div>
        );
    },

    _onMarkerMove(marker) {
        var pos = marker.getPosition();

        this.setState({
            marker: {
                latitude: pos.lat(),
                longitude: pos.lng()
            }
        });
    },

    _onDone(e) {
        this.props.onDone(this.state);
    }

});

module.exports = Geo;
