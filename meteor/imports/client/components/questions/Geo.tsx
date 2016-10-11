import {getConfig} from "../../helpers/getConfig";
import {Post} from "../facebook/Post";
import {getQuestionTitleByType} from "../../helpers/getQuestionTitleByType";
import * as Model from "../../../common/models/questions/geolocation/Marker";
import {Button} from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";
import * as _ from "lodash";
import {Location} from "../../../common/models/questions/geolocation/Location";
import {GeoAnswer} from "../../../common/models/questions/answers/GeoAnswer";
import {Col} from 'react-bootstrap';
import {GeoNameEntity} from "../../../common/models/GeoNameEntity";

import {GeoMarker} from "./GeoMarker";
import {Marker} from "../../../common/models/questions/geolocation/Marker";
import {GoogleMap} from "../GoogleMap";

const Loader = require('react-loader');
const Autosuggest = require('react-autosuggest');

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
  map?: google.maps.Map;
}

const selectedZoomlevel = 12;
const fullyZoomedOut = 1;
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
      longitude: suggestion.longitude,
      zoom: selectedZoomlevel,
      markers: [new Marker(suggestion.latitude, suggestion.longitude)]
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
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Type a location',
      value,
      onChange: this.onChange.bind(this)
    };

    const lat = this.state.latitude ? this.state.latitude : 0;
    const long = this.state.longitude ? this.state.longitude : 0;
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
            />
            <Loader loaded={!this.state.isLoading} scale={0.5} left="93%"/>
          </Col>

          <Col sm={12}>
            <div className="map">
              <GoogleMap latitude={lat} longitude={long}
                         zoom={this.state.zoom}
                         width={"auto"} height={250}
                         apiKey={this.conf.apiKey}
                         onClick={this.onMapClick.bind(this)}
                         markers={this.state.markers}
              />
            </div>
            <Button onClick={this.onDone.bind(this) }>Done</Button>
          </Col>
        </div>
    );
  }

  renderAnswer() {
    const markers = [new Marker(this.props.answer.data.latitude, this.props.answer.data.longitude, "green")];
    const lat = this.state.latitude ? this.state.latitude : 0;
    const long = this.state.longitude ? this.state.longitude : 0;
    let styleName = "correct-geo";
    if (!this.props.correct) {
      markers.push(new Marker(this.props.userAnswer.data.latitude, this.props.userAnswer.data.longitude, "red"))
      styleName = "wrong-geo";
    }
    return (
        <div className="question question-geo">
          <h4>{getQuestionTitleByType(this.props.type.toString()) }</h4>
          <Col sm={12}>
            <Post post={this.props.subject}/>
          </Col>

          <Col sm={12}>
            <div className={`map ${styleName}`}>
              <GoogleMap latitude={lat} longitude={long}
                         zoom={this.state.zoom}
                         width={"auto"} height={250}
                         apiKey={this.conf.apiKey}
                         onClick={this.onMapClick.bind(this)}
                         markers={markers}
              />
            </div>
          </Col>
        </div>
    );
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


  onDone(e) {
    if (this.state.markers.length > 0) {
      const marker = this.state.markers[0];
      this.props.onDone(new Location(marker.latitude, marker.longitude));
      this.setState({
        markers: [],
        value: ''
      });
    }

  }

  onMapClick(lat: number, lng: number, zoom: number, center: google.maps.LatLng) {
    //if the user hasn't answered the question yet we create or move the marker on the map
    if (!this.props.userAnswer) {
      const markers = this.state.markers;
      if (markers.length == 0) {
        markers.push(new Marker(lat, lng));
      } else {
        markers[0].latitude = lat;
        markers[0].longitude = lng;
      }

      this.setState({
        latitude: center.lat(),
        longitude: center.lng(),
        markers: markers,
        zoom: zoom
      });
    }


  }

}

