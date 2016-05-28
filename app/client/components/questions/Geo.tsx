import {getConfig} from "../../helpers/getConfig";
import {Post} from "../facebook/Post";
import {getQuestionTitleByType} from "../../helpers/getQuestionTitleByType";
import * as Model from "../../../common/models/questions/geolocation/Marker";
import {Button} from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";
import {ReminisceMap} from "../ReminisceMap";
import Autosuggest from 'react-autosuggest';
import * as _ from "lodash";
import {Location} from "../../../common/models/questions/geolocation/Location";
import {GeoAnswer} from "../../../common/models/questions/answers/GeoAnswer";
import Loader from 'react-loader';
import {Col} from 'react-bootstrap';
import {GeoNameEntity} from "../../../common/models/GeoNameEntity";
import GoogleMap from 'google-map-react'
import {GeoMarker} from "./GeoMarker";
import {Marker} from "../../../common/models/questions/geolocation/Marker";
import {Map} from 'google.maps'

const theme = require('./GeoSuggestionBox.css');


interface Configuration {
  zoom: number;
  apiKey: string;
  sensor: boolean;
  marker: any;

}


interface GeoProps extends QuestionProps {
  defaultLocation: Model.Marker;
  userAnswer?: GeoAnswer;
  answer?: GeoAnswer;
  correct?: boolean;
}

interface GeoState {
  value?: string;
  place?: string;
  countryCode?: string;
  conf?: Configuration;
  suggestions?: GeoNameEntity[];
  isLoading?: boolean;
  latitude?: number;
  longitude?: number;
  selectedSuggestion?: GeoNameEntity;
  locationText?: string;
  zoom?: number;
  markers?: Model.Marker[];
  map?: Map;
}

const selectedZoomlevel = 12;
const fullyZoomedOut = 3;
export class Geo extends React.Component<GeoProps, GeoState> {
  private userMarker: Model.Marker;
  private conf: Configuration;

  constructor(props: GeoProps) {
    super(props);
    this.state = {
      value: '',
      place: '',
      countryCode: null,
      suggestions: [],
      isLoading: false,
      latitude: 0,
      longitude: 0,
      selectedSuggestion: null,
      zoom: fullyZoomedOut,
      markers: []
    };
    this.conf = getConfig('gmaps');
  }

  componentWillReceiveProps(props: GeoProps) {
    this.setState({
      latitude: 0,
      longitude: 0,
      place: '',
      suggestions: [],
      isLoading: false,
      selectedSuggestion: null,
      zoom: fullyZoomedOut,
      markers: []
    });
  }

  componentDidMount() {
    // this.conf = getConfig('gmaps');
    console.log("we mounted, ", this.conf);

  }

  loadSuggestions(place: string, countryCode?: string) {
    this.setState({
      isLoading: true
    });
    Meteor.call('Geolocation.getSuggestions', place, countryCode, function (error: Meteor.Error, result: GeoNameEntity[]) {
      if (place === this.state.place && countryCode === this.state.countryCode) {
        this.setState({
          isLoading: false,
          suggestions: result
        });
      }
    }.bind(this));
  }

  onChange(event, {newValue}) {
    const {place, countryCode} = this.decomposeEntry(newValue);
    this.setState({
      value: newValue,
      place: place,
      countryCode: countryCode
    });
  }

  onSuggestionsUpdateRequested({value}) {
    const {place, countryCode} = this.decomposeEntry(value);

    this.loadSuggestions(place, countryCode);

  }

  decomposeEntry(entry: string): {place: string, countryCode: string} {
    const entries: string[] = entry.split(',');
    const place = entries[0].trim();
    const countryCode = entries.length > 1 ? entries[1].trim() : null;
    return {place: place, countryCode: countryCode};
  }


  getSuggestionValue(suggestion: GeoNameEntity) {
    return `${suggestion.name}, ${suggestion.countryCode}`;
  }

  renderSuggestion(suggestion: GeoNameEntity) {
    return (
        <span className="location-suggestion">{suggestion.name}, <span className="admin">{suggestion.countryCode}</span></span>
    );
  }


  onSuggestionSelected(event, {suggestion, suggestionValue, sectionIndex, method}) {
    const entity: GeoNameEntity = suggestion;
    this.setState({
      selectedSuggestion: entity,
      latitude: suggestion.latitude,
      longitude: suggestion.longitude
    });

    this.getLocationText(entity.latitude, entity.longitude).then((text) => this.setState({locationText: text}));
  }

  render() {

    if (this.props.userAnswer) {
      return this.renderAnswer();
    } else {
      return this.renderQuestions();
    }
  }

  renderQuestions() {
    console.log("we need to render stuff:", this.state.latitude);
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Type a location',
      value,
      onChange: this.onChange.bind(this)
    };
    const suggested = this.state.selectedSuggestion;
    const marker = this.state.selectedSuggestion ? new L.LatLng(suggested.latitude, suggested.longitude) : null;

    const lat = this.state.latitude ? this.state.latitude : 0;
    const long = this.state.longitude ? this.state.longitude : 0;
    const mapOptions = {
      // minZoomOverride: true,
      // minZoom: 1
    };
    console.log("lat lng rnder", lat, long);
    const center = {lat: lat, lng: long};
    const bootstrap = {
      key: this.conf.apiKey,
      language: 'en'
    };
    return (
        <div className="question question-geo">
          <h4>{getQuestionTitleByType(this.props.type.toString()) }</h4>
          <Col sm={12}>
            <Post post={this.props.subject}/>
          </Col>
          <Col sm={12}>
            <Autosuggest suggestions={suggestions}
                         onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                         getSuggestionValue={this.getSuggestionValue.bind(this)}
                         renderSuggestion={this.renderSuggestion.bind(this)}
                         onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                         inputProps={inputProps}
                         theme={theme}
            />
            <Loader loaded={!this.state.isLoading} scale={0.5} left="93%"/>
          </Col>

          <Col sm={12}>
            <div className="map">
              <GoogleMap
                  bootstrapURLKeys={bootstrap}
                  center={center}
                  zoom={this.state.zoom}
                  onClick={this.onMapClick.bind(this)}
                  yesIWantToUseGoogleMapApiInternals={true}
                  options={mapOptions}
                  onZoomAnimationEnd={this.onZoomEnded.bind(this)}
                  onGoogleApiLoaded={({map, maps}) => {
                  map.minZoom = 1;
                  this.setState({
                  map: map
                  });
                  }}
               
              >
                {this.state.markers.map(m => {
                  return <GeoMarker key={_.uniqueId()} lat={m.latitude} lng={m.longitude} color={m.color} text={this.state.locationText} visible={m.visible}/>
                })}
          
              </GoogleMap>

            </div>
            <Button onClick={this.onDone.bind(this) }>Done</Button>
          </Col>
        </div>
    );
  }

  renderAnswer() {
    const marker = new L.LatLng(this.props.answer.data.latitude, this.props.answer.data.longitude);
    const lat = this.state.latitude ? this.state.latitude : 0;
    const long = this.state.longitude ? this.state.longitude : 0;
    if (this.props.correct) {
      return (
          <div className="question question-geo">
            <h4>{getQuestionTitleByType(this.props.type.toString()) }</h4>
            <div className="question-subject grid-100">
              <Post post={this.props.subject}/>
            </div>
            <div className="grid-100 correct-geo">
              <ReminisceMap
                  longitude={long}
                  latitude={lat}
                  zoomLevel={this.state.zoom}
                  solutionMarker={marker}
              />
            </div>
          </div>
      );
    } else {
      const userMarker = new L.LatLng(this.props.userAnswer.data.latitude, this.props.userAnswer.data.longitude);
      return (
          <div className="question question-geo">
            <h4>{getQuestionTitleByType(this.props.type.toString()) }</h4>
            <div className="question-subject grid-100">
              <Post post={this.props.subject}/>
            </div>
            <div className="grid-100 wrong-geo">
              <ReminisceMap
                  longitude={long}
                  latitude={lat}
                  zoomLevel={fullyZoomedOut}
                  solutionMarker={marker}
                  userMarker={userMarker}
              />
            </div>
          </div>
      );
    }


  }

  getLocationText(lat: number, lng: number) {
    return new Promise<string>((resolve, reject) =>
        Meteor.call('Geolocation.getLocationName', new Marker(lat, lng), (error: Meteor.Error, result: string) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }));
  }

  onMarkerMove(position: Model.Marker): void {
    this.userMarker = position;
  }

  onDone(e) {
    this.props.onDone(new Location(this.userMarker.latitude, this.userMarker.longitude));
  }
  
  onMapClick({event, x, y, lat, lng}) {
    console.log("we have the current state", this.state);
    let zoom = this.state.map.getZoom();
    let center = {lat: this.state.map.getCenter().lat(), lng: this.state.map.getCenter().lng()};
    const markers = this.state.markers;
    if (markers.length == 0) {
      markers.push(new Marker(lat, lng));
    } else {
      markers[0].latitude = lat;
      markers[0].longitude = lng;
    }
    if (zoom < 3) {
      zoom = 5;
      center = {lat: lat, lng: lng};
    } else {
      zoom = this.state.zoom;
    }
    this.setState({
      latitude: center.lat,
      longitude: center.lng,
      markers: markers,
      zoom: zoom
    });
    console.log("zoom", this.state.zoom);

  }

  creatMapOptions(maps) {
    return {
      minZoomOverride: true,
      minZoom: 0
    };
  }
  
  onZoomEnded() {
    // if (this.state.map.getZoom() < 3) {
    //   this.state.markers.forEach(m => m.visible = false);
    // } else {
    //   this.state.markers.forEach(m => m.visible = true);
    //
    // }
    if (this.state.map.getZoom() != this.state.zoom) {
      let center = {lat: this.state.map.getCenter().lat(), lng: this.state.map.getCenter().lng()};

      this.setState({
        latitude: center.lat,
        longitude: center.lng,
        zoom: this.state.map.getZoom()
      });
    }

  }
}

