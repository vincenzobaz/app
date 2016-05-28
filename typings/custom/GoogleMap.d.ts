declare module 'google-map-react' {

  interface  BootstrapUrlKeys {
    key: string;
    language: string;
  }

  interface LatLng {
    lat: number;
    lng: number;
  }
  export interface MapOptions {
    panControl?: boolean;
    mapTypeControl?: boolean;
    scrollwheel?: boolean;
    styles?: any[];
    minZoomOverride?: boolean;
    minZoom?: number;


  }
  export interface GoogleMapProps {
    bootstrapURLKeys?: BootstrapUrlKeys
    defaultCenter?: LatLng;
    defaultZoom?: number;
    center?: LatLng;
    zoom?: number;
    hoverDistance?: number;
    margin?: any[];
    debounce?: boolean;
    onClick?: (x: number, y: number, lat: number, lng: number, event: Event) => void;
    onZoomAnimationEnd?: () => void;
    options?: MapOptions;
    onGoogleApiLoaded?: (map: any, maps: any) => void;
    yesIWantToUseGoogleMapApiInternals?: boolean

  }

  export default class GooogleMap extends React.Component<GoogleMapProps, {}> {

  }
}
