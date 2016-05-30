
/**
 * Adapted from react-maps (https://github.com/matnel/react-maps/)
 * by Matti Nelimarkka (matti.nelimarkka@alumni.helsinki.fi)
 */

import {randomStr} from '../helpers/randomStr';
import {encode} from "querystring";
import * as GeoMarker from '../../common/models/questions/geolocation/Marker';
import InfoWindow = google.maps.InfoWindow;

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  width?: number | string;
  height?: number | string;
  apiKey?: string;
  markers?: GeoMarker.Marker[];
  onMarkerMove?: Function;
  onClick?: (lat: number, lng: number, zoom: number, center: google.maps.LatLng) => void;

}

interface GoogleMapState {
  map?: google.maps.Map;
  markers?: google.maps.Marker[];
}

export class GoogleMap extends React.Component<GoogleMapProps, GoogleMapState> {
  private divElement: Element;
  private infoWinows: google.maps.InfoWindow[];
  
  constructor(props: GoogleMapProps) {
    super(props);
    this.infoWinows = [];
    this.state = {
      map: null,
      markers: []
    };

  }


  static defaultProps =  {
    latitude: 0,
    longitude: 0,
    zoom: 4,
    width: 500,
    height: 500,
    apiKey: 'NO_API_KEY_SET',
    markers: [],
    onMarkerMove: () => {}
  };

  render() {
    var style = {
      width: this.props.width,
      height: this.props.height
    };

    return (
        <div ref={(e) => this.divElement = e} style={style}></div>
    );
  }

  componentWillReceiveProps(props: GoogleMapProps) {
    this.props = props;
    var center = new google.maps.LatLng(this.props.latitude, this.props.longitude);

    this.state.map.setCenter(center);
    this.state.map.setZoom(props.zoom);
    this.setupMarkers();
  }

  componentDidMount() {
    if (window['google'] == null) {
      this.loadGoogleMapsAPI();
    }
    else {
      this.showMap();
    }
  }
  
  setupMarkers() {
    this.state.markers.forEach(m => m.setMap(null));
    this.infoWinows.forEach(i => i.close());
    this.infoWinows = [];
    const markers = this.props.markers.map((m, index) => {
      this.infoWinows.push(new google.maps.InfoWindow());
      const marker = this.createMarker(m, this.state.map);
      this.getInfo(m).then(result => {
        this.infoWinows[index].setContent(
          `<div>${result}</div>`
        );
        this.infoWinows[index].open(this.state.map, marker);
      });
    
        return marker;
    });
    this.setState({
      markers: markers
    })
  }

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

    let map: google.maps.Map;
    let timeout = 0;
    if (!this.state.map) {
      map = new google.maps.Map(this.divElement, options);
      timeout = 500;
    } else {
      map = this.state.map;
    }
    
    map.addListener('click', this.onClick.bind(this));

    this.setState({
      map: map,
    });
    //We need to wait for the maps to be loaded before we show the markers
    setTimeout(this.setupMarkers.bind(this), timeout);
  }
  
  createMarker(m: GeoMarker.Marker, map: google.maps.Map) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(m.latitude, m.longitude),
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: `//maps.google.com/mapfiles/ms/micons/${m.color}.png`,
      });
  }

  loadGoogleMapsAPI() {
    if (window['google'] != null) {
      return;
    }

    var callbackName = `gmap_cb_${randomStr(10)}`;
    window[callbackName] = this.showMap.bind(this);

    var params = {
      key: this.props.apiKey,
      callback: callbackName
    };

    var query = encode(params);
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false' + query;
    document.body.appendChild(script);
  }
  

  onClick(e){
    let latLng: google.maps.LatLng = e.latLng;
    this.props.onClick(latLng.lat(), latLng.lng(), this.state.map.getZoom(), this.state.map.getCenter());
  }


  getInfo(m: GeoMarker.Marker): Promise<string> {

    return new Promise<string>((resolve, reject) =>
        Meteor.call('Geolocation.getLocationName', new GeoMarker.Marker(m.latitude, m.longitude), (error: Meteor.Error, result: string) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }));
  }
  
}

