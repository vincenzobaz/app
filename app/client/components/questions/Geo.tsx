
import {getConfig} from '../../helpers/getConfig';
import {Post} from '../facebook/Post';
import {GoogleMap} from '../GoogleMap';
import {getQuestionTitleByType} from "../../helpers/getQuestionTitleByType";
import {SubjectType} from "../../../common/models/questions/common/SubjectType";
import {Subject} from "../../../common/models/questions/common/Subject";
import {Marker} from "../../../common/models/questions/geolocation/Marker";
import * as Model from "../../../common/models/questions/geolocation/Marker";
import {QuestionProps} from "./QuestionProps";
import {ReminisceMap} from "./../ReminisceMap";
import {GeoData} from "../../../common/models/questions/answers/GeoData";
import {Address} from "../../../common/external_services/OpenStreetMapsHelper";
import * as _ from "lodash";
import {Button} from "react-bootstrap";
// import * as L from 'leaflet';
// import { render } from 'react-dom';


interface Configuration {
    zoom: number;
    apiKey: string;
    sensor: boolean;
    marker: any;

}

interface GeoProps extends QuestionProps {
    defaultLocation: Model.Marker;
}

interface GeoState {
    marker: Model.Marker;
    place?: string;
    conf?: Configuration;
}



export class Geo extends React.Component<GeoProps, GeoState> {
    private conf: any;
    private place: Address;
    private userMarker: Model.Marker;
    constructor(props: GeoProps) {
        super(props);
        this.state = {
            marker: props.defaultLocation
        };
        this.conf = getConfig('gmaps');

        console.log("We received geo props: ", props);
    }

    componentWillReceiveProps(props: GeoProps) {
        this.setState({
            marker: { latitude: props.defaultLocation.latitude, longitude: props.defaultLocation.longitude }
        });
    }
    render() {
        if (!this.state.marker) {
            return (<div>Loading...</div>);
        }
        const position = new Marker(_.random(0, 100), _.random(0, 100));
        return (
            <div className="question question-geo">
                <h4>{getQuestionTitleByType(this.props.type.toString()) }</h4>
                <div className="question-subject grid-100">
                    <Post post={this.props.subject} />
                </div>
                <div className="grid-100">
                    <ReminisceMap position={this.state.marker} onSelectedPosition={this.onMarkerMove.bind(this)} />
                    <Button onClick={this.onDone.bind(this) }>Done</Button>
                </div>
            </div>
        );
    }

    onMarkerMove(position: Model.Marker, place: Address): void {
        this.place = place;
        this.userMarker = position;
    }

    onDone(e) {
        this.props.onDone(new GeoData(this.userMarker, this.place));
    }

}

