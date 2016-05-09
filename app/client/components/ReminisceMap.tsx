import * as L from 'leaflet';
import {Button} from "react-bootstrap";
import {Routes} from "../../common/Routes";
import * as Model from "../../common/models/questions/geolocation/Marker";
import {reverseGeocodingUrl, extractLocation, Address} from "../../common/external_services/OpenStreetMapsHelper";
import {MeteorPromise} from "../helpers/meteor";
import {Marker} from "../../common/models/questions/geolocation/Marker";
import {GeoNameEntity} from "../../common/models/GeoNameEntity";


interface ReminisceMapProps {
    position: Model.Marker;
    onSelectedPosition: (position: Model.Marker, place: string) => void;
}


const standard = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const toner = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
const watercolor = 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
const wiki = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const wikimedia = ' https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
export class ReminisceMap extends React.Component<ReminisceMapProps, {}> {
    private map: L.Map;
    private marker: L.Marker;


    constructor(props: ReminisceMapProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="mapid"></div>
            </div>
        );

    }

    componentWillReceiveProps(props: ReminisceMapProps) {
        this.props = props;
        if (this.marker) {
            this.marker.setOpacity(0);
        }
        this.map.setView(L.latLng(this.props.position.latitude, this.props.position.longitude));
    }

    componentDidMount() {
        L.Icon.Default.imagePath = '/images';
        const position = L.latLng(this.props.position.latitude, this.props.position.longitude);
        this.map = L.map('mapid').setView(position, 13).on('click', this.onMapClick.bind(this));
        this.createMapLayer(wiki).addTo(this.map);

    }

    onMapClick(e: L.LeafletLocationEvent) {
        this.marker = this.marker ? this.marker.setLatLng(e.latlng) : L.marker(e.latlng).addTo(this.map);;
        this.marker.setOpacity(1);
        console.log(`latlong: ${e.latlng.lat}, ${e.latlng.lng}`);
        this.showPopup(e.latlng).then(place => {
            this.props.onSelectedPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng }, place);
        });

    }

    createMapLayer(url: string): L.TileLayer {
        return L.tileLayer(
            url, {
                maxZoom: 18,
            });
    }



    showPopup(latlng: L.LatLng): Promise<string> {
        const url = reverseGeocodingUrl(latlng.lat, latlng.lng);

        return new Promise<string>((resolve, reject) =>
            // HTTP.get(url, null, (error: Meteor.Error, res: HTTP.HTTPResponse) => {
            //     if (!error) {
            //         const place = res.data.address;
            //         const popup = L.popup({ closeButton: false }).setContent(extractLocation(place));
            //         this.marker.bindPopup(popup).openPopup();
            //         resolve(place);
            //     } else {
            //         reject(error);
            //     }
            //
            // }));
            Meteor.call('Geolocation.getLocationName', new Marker(latlng.lat, latlng.lng), (error: Meteor.Error, result: string) => {
              if (!error) {
                console.log("result location: ", result);
                const popup = L.popup({ closeButton: false }).setContent(`<center><b>${result}</b></center`);
                this.marker.bindPopup(popup).openPopup();
                resolve(result)
              } else {
                reject(error)
              }
            }));
    }
}
