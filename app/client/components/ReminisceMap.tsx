import * as L from "leaflet";
import * as Model from "../../common/models/questions/geolocation/Marker";
import {Marker} from "../../common/models/questions/geolocation/Marker";


interface ReminisceMapProps {
    longitude: number;
    latitude: number;
    zoomLevel: number;
    onSelectedPosition: (position: Model.Marker) => void;
    marker?: L.LatLng
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
      this.map.setView(L.latLng(this.props.latitude, this.props.longitude), this.props.zoomLevel);
      if (props.marker) {
        this.marker = this.marker ? this.marker.setLatLng(props.marker) : L.marker(props.marker).addTo(this.map);
        this.marker.setOpacity(1);
        this.marker.setLatLng(props.marker);
        this.showPopup(props.marker);
        this.props.onSelectedPosition({ latitude: props.latitude, longitude: props.longitude });

      } else if (this.marker) {
        this.marker.setOpacity(0);
        this.marker.closePopup();

      }
    }

    componentDidMount() {
        L.Icon.Default.imagePath = '/images';
        const position = L.latLng(this.props.latitude, this.props.longitude);
        this.map = L.map('mapid').setView(position, this.props.zoomLevel).on('click', this.onMapClick.bind(this));
        this.createMapLayer(wiki).addTo(this.map);

    }

    onMapClick(e: L.LeafletLocationEvent) {
      this.marker = this.marker ? this.marker.setLatLng(e.latlng) : L.marker(e.latlng).addTo(this.map);
        this.marker.setOpacity(1);
        this.showPopup(e.latlng).then(place => {
            this.props.onSelectedPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng });
        });

    }

    createMapLayer(url: string): L.TileLayer {
        return L.tileLayer(
            url, {
                maxZoom: 18,
            });
    }



    showPopup(latlng: L.LatLng): Promise<string> {
        return new Promise<string>((resolve, reject) =>
            Meteor.call('Geolocation.getLocationName', new Marker(latlng.lat, latlng.lng), (error: Meteor.Error, result: string) => {
              if (!error) {
                const popup = L.popup({ closeButton: false }).setContent(`<center>${result}</center>`);
                this.marker.bindPopup(popup).openPopup();
                resolve(result)
              } else {
                reject(error)
              }
            }));
    }
}
