//
// /**
//  * Adapted from react-maps (https://github.com/matnel/react-maps/)
//  * by Matti Nelimarkka (matti.nelimarkka@alumni.helsinki.fi)
//  */
//
// import {randomStr} from '../helpers/randomStr';
// import {Marker} from 'google.maps'
// import {encode} from "querystring";
//
//
// interface GoogleMapProps {
//   latitude: number;
//   longitude: number;
//   zoom: number;
//   width: number;
//   height: number;
//   apiKey: string;
//   sensor: boolean;
//   onMarkerMove: Function;
//  
// }
//
// interface GoogleMapState {
//   map: any;
//   marker: Marker;
// }
// export class GoogleMap extends React.Component<GoogleMapProps, GoogleMapState> {
//
//   constructor(props: GoogleMapProps) {
//     super(props);
//     console.log("creating maps", props);
//     this.state = {
//       map: null,
//       marker: null
//     }
//    
//   }
//
//  
//   static defaultProps() {
//     console.log("we called this default method");
//     return {
//       latitude: 0,
//       longitude: 0,
//       zoom: 4,
//       width: 500,
//       height: 500,
//       apiKey: 'NO_API_KEY_SET',
//       sensor: false,
//       onMarkerMove: () => {}
//     };
//   }
//  
//   render() {
//     var style = {
//       width: this.props.width,
//       height: this.props.height
//     };
//  
//     return (
//       <div style={style}></div>
//     );
//   }
//  
//   componentDidMount() {
//     // if (window['google'] == null) {
//       this.loadGoogleMapsAPI();
//     // }
//     // else {
//     //   this.showMap();
//     // }
//   }
//  
//   showMap() {
//     console.log("maps props", this.props);
//     var center = new google.maps.LatLng(this.props.latitude, this.props.longitude);
//  
//     var options = {
//       zoom: this.props.zoom,
//       center: center,
//       panControl: true,
//       zoomControl: true,
//       mapTypeControl: true,
//       scaleControl: true,
//       streetViewControl: false,
//       overviewMapControl: false,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//  
//     var map = new google.maps.Map(ReactDOM.findDOMNode(this), options);
//  
//     var marker = new google.maps.Marker({
//       position: center,
//       map: map,
//       draggable: true,
//       animation: google.maps.Animation.DROP,
//       title: "Drag this marker to the correct location",
//       icon: "//maps.google.com/mapfiles/ms/micons/blue.png"
//     });
//  
//     google.maps.event.addListener(marker, 'dragend', this.onMarkerDragEnd);
//  
//     this.setState({
//       map: map,
//       marker: marker
//     });
//   }
//  
//   loadGoogleMapsAPI() {
//     console.log("loading api");
//     if (window['google'] != null) {
//       return;
//     }
//  
//     var callbackName = `gmap_cb_${randomStr(10)}`;
//     window[callbackName] = this.showMap.bind(this);
//  
//     var params = {
//       key: this.props.apiKey,
//       callback: callbackName
//     };
//  
//     var query = encode(params);
//     var script = document.createElement('script');
//     script.src = 'https://maps.googleapis.com/maps/api/js?' + query;
//     document.body.appendChild(script);
//   }
//  
//   onMarkerDragEnd(e) {
//     this.props.onMarkerMove(this.state.marker);
//   }
//
// }
//
