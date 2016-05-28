import {Routes} from "../../../common/Routes";
import {Overlay, Tooltip} from 'react-bootstrap';


const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH/2,
  top: -K_HEIGHT,

  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

const markerStyle = {
  height: 40,
};


export interface GeoMarkerProps {
  lat: number;
  lng: number;
  color?: string;
  text?: string;
  showTooltip?: boolean;
  visible?: boolean;

}

export interface GeoMarkerState {
}

export class GeoMarker extends React.Component<GeoMarkerProps, GeoMarkerState> {
  
  private marker: any;
  static defaultProps = {
      lat: 0,
      lng: 0,
      color: "blue",
      showTooltip: true,
      visible: true
  };
  
  constructor(props: GeoMarkerProps) {
    super(props);
  }
  
  render() {
      if (this.props.visible) {
        return (
            <div style={greatPlaceStyle}>
              <div className="geo-tooltip">
                <img ref={(c) => this.marker = c} style={markerStyle} src={ Routes.Assets.at(`images/marker-icon-2x-${this.props.color}.png`)} />
                {this.renderTooltip(this.props.text)}
              </div>
            </div>
        );

      } else {
        return <noscript />
      }

  }
  
  renderTooltip(text: string) {
    if (this.props.showTooltip && this.props.text && this.props.text.length) {
      return <span className="tooltiptext"> {this.props.text} </span>
    }
  }
  
    
  
  
}
