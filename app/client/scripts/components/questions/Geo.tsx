
'use strict';

import {getConfig} from './../../boot/helpers/getConfig';
import {Post} from './../facebook/Post';
import {GoogleMap} from './../GoogleMap';
import {getQuestionTitleByType} from "../../boot/helpers/getQuestionTitleByType";
import {SubjectType} from "../../../../common/models/questions/common/SubjectType";
import {Subject} from "../../../../common/models/questions/common/Subject";
import {Marker} from "../../../../common/models/questions/geolocation/Marker";
import * as Boots from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";


let conf = getConfig('gmaps');

interface GeoProps extends QuestionProps{
  defaultLocation: Marker;
}

interface GeoState {
  marker: Marker;
}



export class Geo extends React.Component<GeoProps, GeoState> {
  
    getMeteorState(): {marker: Marker} {
        if (conf){
            return {
                marker: conf.marker.initialPosition
            }
        } else {
            throw new Meteor.Error("No Marker", "Geo compontent has no marker assigned + " + conf);
        }
    }

    getInitialState() {
        conf = {
            "zoom": 9,
            "apiKey": "AIzaSyBGVhKl-Aqh5hSTCaCPLIY93dUSqWG1XhE",
            "sensor": false,
            "marker": {"initialPosition": this.props.defaultLocation}
        };
        return {
            marker: conf.marker.initialPosition
        }

    }

    componentWillReceiveProps(props) {
        this.setState({
            marker: {latitude: 0, longitude: 0}
        });
    }

    render() {
        if (!this.state.marker){
            return (<div>Loading...</div>);
        }
        return (
            <div className="question question-geo">
                <h4>{getQuestionTitleByType(this.props.type.toString())}</h4>
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
                    <Boots.Button onClick={this._onDone}>Done</Boots.Button>
                </div>
            </div>
        );
    }

    _onMarkerMove(marker) {
        var pos = marker.getPosition();

        this.setState({
            marker: {
                latitude: pos.lat(),
                longitude: pos.lng()
            }
        });
    }
  
    _onDone(e) {
        this.props.onDone(this.state);
    }

}

