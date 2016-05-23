
import {getConfig} from "../../helpers/getConfig";
import {Post} from "../facebook/Post";
import {getQuestionTitleByType} from "../../helpers/getQuestionTitleByType";
import * as Model from "../../common/models/questions/geolocation/Marker";
import {Marker} from "../../common/models/questions/geolocation/Marker";
import {Button} from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";
import {ReminisceMap} from "../ReminisceMap";
import Autosuggest from 'react-autosuggest';
import * as _ from "lodash";
import {GeoNameEntity} from "../../common/models/GeoNameEntity";
import {Location} from "../../../common/models/questions/geolocation/Location";
import {GeoAnswer} from "../../../common/models/questions/answers/GeoAnswer";

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
  marker?: Model.Marker
  value?: string;
  place?: string;
  countryCode?: string;
  conf?: Configuration;
  suggestions?: GeoNameEntity[];
  isLoading?: boolean;
  latitude?: number;
  longitude?: number;
  selectedSuggestion?: GeoNameEntity;
}

const selectedZoomlevel = 12;
const fullyZoomedOut = 1;
export class Geo extends React.Component<GeoProps, GeoState> {
  private userMarker: Model.Marker;
  constructor(props: GeoProps) {
    super(props);
    this.state = {
      marker: props.defaultLocation,
      value: '',
      place: '',
      countryCode: null,
      suggestions: [],
      isLoading: false,
      latitude: 0,
      longitude: 0,
      selectedSuggestion: null
    };
  }

  componentWillReceiveProps(props: GeoProps) {
    this.setState({
      marker: {latitude: props.defaultLocation.latitude, longitude: props.defaultLocation.longitude},
      latitude: 0,
      longitude: 0,
      place: '',
      suggestions: [],
      isLoading: false,
      selectedSuggestion: null
    });
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
      } else { // Ignore suggestions if input value changed
        this.setState({
          isLoading: false
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
    this.setState({
      selectedSuggestion: suggestion,
      latitude: suggestion.latitude,
      longitude: suggestion.longitude
    })
  }

  render() {
    if (this.props.userAnswer){
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
    const suggested = this.state.selectedSuggestion;
    const marker = this.state.selectedSuggestion ? new L.LatLng(suggested.latitude, suggested.longitude) : null;
    if (!this.state.marker) {
      return (<div>Loading...</div>);
    }
    const zoomLevel = this.state.selectedSuggestion ? selectedZoomlevel : fullyZoomedOut;
    const lat = this.state.latitude ? this.state.latitude : 0;
    const long = this.state.longitude ? this.state.longitude : 0;
    return (
        <div className="question question-geo">
          <h4>{getQuestionTitleByType(this.props.type.toString()) }</h4>
          <div className="question-subject grid-100">
            <Post post={this.props.subject}/>
          </div>
          <div className="grid-100">
            <Autosuggest suggestions={suggestions}
                         onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                         getSuggestionValue={this.getSuggestionValue.bind(this)}
                         renderSuggestion={this.renderSuggestion.bind(this)}
                         onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                         inputProps={inputProps}
                         theme={theme}
            />
          </div>
          <div className="grid-100">
            <ReminisceMap
                longitude={long}
                latitude={lat}
                zoomLevel={zoomLevel}
                onSelectedPosition={this.onMarkerMove.bind(this)}
                marker={marker}
            />
            <Button onClick={this.onDone.bind(this) }>Done</Button>
          </div>
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
                zoomLevel={fullyZoomedOut}
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

  onMarkerMove(position: Model.Marker): void {
    this.userMarker = position;
  }

  onDone(e) {
    this.props.onDone(new Location(this.userMarker.latitude, this.userMarker.longitude));
  }

}

