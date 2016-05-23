import * as L from "leaflet";
import * as Model from "../../common/models/questions/geolocation/Marker";
import {Marker} from "../../common/models/questions/geolocation/Marker";
import {Routes} from "../../common/Routes";


interface ReminisceMapProps {
  longitude: number;
  latitude: number;
  zoomLevel: number;
  onSelectedPosition?: (position: Model.Marker) => void;
  marker?: L.LatLng
  solutionMarker?: L.LatLng;
  userMarker?: L.LatLng;
}


const standard = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const toner = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
const watercolor = 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
const wiki = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const wikimedia = ' https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
export class ReminisceMap extends React.Component<ReminisceMapProps, {}> {
  private map: L.Map;
  private marker: L.Marker;
  private solutionMarker: L.Marker;
  private userMarker: L.Marker;

  private greenIcon: L.Icon;
  private redIcon: L.Icon;
  private blueIcon: L.Icon;


  constructor(props: ReminisceMapProps) {
    super(props);
    this.greenIcon = this.createIcon('green');
    this.redIcon = this.createIcon('red');
    this.blueIcon = this.createIcon('blue');

  }

  createIcon(color: string) {
    return L.icon({
      iconUrl: Routes.Assets.at(`images/marker-icon-2x-${color}.png`),
      shadowUrl: Routes.Assets.at('images/marker-shadow.png'),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  render() {
    return (
        <div>
          <div id="mapid"></div>
        </div>
    );

  }

  prepareMap() {
    this.map.setView(L.latLng(this.props.latitude, this.props.longitude), this.props.zoomLevel);
    this.map.options.closePopupOnClick = false;

    if (this.props.solutionMarker) {
      this.configureMarker(this.solutionMarker, this.greenIcon, this.props.solutionMarker, true)
    } else {
      this.makeMarkerInvisible(this.solutionMarker)
    }

    if (this.props.userMarker) {
      this.configureMarker(this.userMarker, this.redIcon, this.props.userMarker);
    } else {
      this.makeMarkerInvisible(this.userMarker)

    }

    if (this.props.marker) {
      this.configureMarker(this.marker, this.blueIcon, this.props.marker, true);
      if (this.props.onSelectedPosition) {
        this.props.onSelectedPosition({latitude: this.props.latitude, longitude: this.props.longitude});
      }
    } else {
      this.makeMarkerInvisible(this.marker);
    }
  }

  configureMarker(marker: L.Marker, icon: L.Icon, latLng: L.LatLng, showPopup: boolean = false) {
    marker.setLatLng(latLng);
    marker.setOpacity(1);
    marker.setIcon(icon);
    marker.setLatLng(latLng);
    if (showPopup) {
      this.showPopup(marker, latLng);
    }
  }

  makeMarkerInvisible(marker: L.Marker) {
    marker.setOpacity(0);
    marker.closePopup();
  }


  componentWillReceiveProps(props: ReminisceMapProps) {
    this.props = props;
    this.prepareMap();
  }

  componentDidMount() {
    L.Icon.Default.imagePath = '/images';
    const position = L.latLng(this.props.latitude, this.props.longitude);
    this.map = L.map('mapid').setView(position, this.props.zoomLevel).on('click', this.onMapClick.bind(this));
    this.createMapLayer(wiki).addTo(this.map);
    this.marker = L.marker(new L.LatLng(0, 0)).addTo(this.map);
    this.solutionMarker = L.marker(new L.LatLng(0, 0)).addTo(this.map);
    this.userMarker = L.marker(new L.LatLng(0, 0)).addTo(this.map);

    this.prepareMap();


  }

  onMapClick(e: L.LeafletLocationEvent) {
    if (this.props.solutionMarker) {
      if (this.props.userMarker) {
        if (this.solutionMarker.getPopup()['_isOpen']){
          this.showPopup(this.userMarker, this.props.userMarker);
        } else {
          this.showPopup(this.solutionMarker, this.props.solutionMarker);
        }
      }
      return;
    }
    this.marker = this.marker ? this.marker.setLatLng(e.latlng) : L.marker(e.latlng).addTo(this.map);
    this.marker.setOpacity(1);
    this.showPopup(this.marker, e.latlng).then(place => {
      if (this.props.onSelectedPosition) {
        this.props.onSelectedPosition({latitude: e.latlng.lat, longitude: e.latlng.lng});

      }
    });

  }

  createMapLayer(url: string): L.TileLayer {
    return L.tileLayer(
        url, {
          maxZoom: 18,
        });
  }


  showPopup(marker: L.Marker, latlng: L.LatLng): Promise<string> {

    return new Promise<string>((resolve, reject) =>
        Meteor.call('Geolocation.getLocationName', new Marker(latlng.lat, latlng.lng), (error: Meteor.Error, result: string) => {
          if (!error) {
            const popup = L.popup({closeButton: false}).setContent(`<center>${result}</center>`);
            marker.bindPopup(popup).openPopup();
            resolve(result)
          } else {
            reject(error)
          }
        }));
  }
}
