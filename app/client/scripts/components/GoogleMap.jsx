
/**
 * Adapted from react-maps (https://github.com/matnel/react-maps/)
 * by Matti Nelimarkka (matti.nelimarkka@alumni.helsinki.fi)
 */

'use strict';

import {randomStr} from './../boot/helpers/randomStr.jsx';

var React = require('react'),
    queryString = require('querystring');

export const GoogleMap = React.createClass({

  propTypes: {
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    apiKey: React.PropTypes.string.isRequired,
    sensor: React.PropTypes.bool,
    onMarkerMove: React.PropTypes.func
  },

  getInitialState() {
    return {
      map: null,
      marker: null
    };
  },

  getDefaultProps() {
    return {
      latitude: 0,
      longitude: 0,
      zoom: 4,
      width: 500,
      height: 500,
      apiKey: 'NO_API_KEY_SET',
      sensor: false,
      onMarkerMove: () => {}
    };
  },

  render() {
    var style = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div style={style}></div>
    );
  },

  componentDidMount() {
    if (window.google == null) {
      this.loadGoogleMapsAPI();
    }
    else {
      this.showMap();
    }
  },

  showMap() {
    var center = new google.maps.LatLng(this.props.latitude, this.props.longitude);

    var options = {
      zoom: this.props.zoom,
      center: center,
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      overviewMapControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(this.getDOMNode(), options);

    var marker = new google.maps.Marker({
      position: center,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: "Drag this marker to the correct location",
      icon: "//maps.google.com/mapfiles/ms/micons/blue.png"
    });

    google.maps.event.addListener(marker, 'dragend', this.onMarkerDragEnd);

    this.setState({
      map: map,
      marker: marker
    });
  },

  loadGoogleMapsAPI() {
    if (window.google != null) {
      return;
    }

    var callbackName = `gmap_cb_${randomStr(10)}`;
    window[callbackName] = this.showMap;

    var params = {
      key: this.props.apiKey,
      sensor: this.props.sensor,
      callback: callbackName
    };

    var query = queryString.encode(params);
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?' + query;
    document.body.appendChild(script);
  },

  onMarkerDragEnd(e) {
    this.props.onMarkerMove(this.state.marker);
  }

});

