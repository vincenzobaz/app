
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    GoogleMap = require('../GoogleMap'),
    shapes = require('../shapes'),
    conf = require('../../helpers/getConfig')('gmaps'),
    Post = require('../Post');
    // debug = require('debug')('Geo');

var Geo = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    post: shapes.post.isRequired,
    // map: shapes.map.isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      marker: conf.marker.initialPosition
    }
  },

  render() {
    return (
      <div className="question-geo">
        <h4>{this.props.title}</h4>
        <Post post={this.props.post} />
        <div className="map">
          <GoogleMap latitude={this.state.marker.latitude} longitude={this.state.marker.longitude} zoom={conf.zoom}
                     width={510} height={250}
                     apiKey={conf.apiKey} sensor={conf.sensor}
                     onMarkerMove={this._onMarkerMove} />
        </div>
        <Button onClick={this._onDone}>Done</Button>
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
