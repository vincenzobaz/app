declare module 'react-leaflet' {

    interface Position {
        [index: number]: number;
    }
    interface MapProps {
        center: Position;
        zoom: number;
    }


    interface TileLayerProps {
        url: string;
        attribution?: string;
    }

    interface MarkerProps {
        position: Position;
    }

    export class Map extends React.Component<MapProps, {}> {}

    export class TileLayer extends React.Component<TileLayerProps, {}> {}

    export class Marker extends React.Component<MarkerProps, {}> {}

    export class Popup extends React.Component<{}, {}> {}
}