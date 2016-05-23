declare module 'react-loader' {


  export interface LoaderOptions {
    lines?: number;
    length?: number;
    width?: number;
    radius?: number,
    corners?: number,
    rotate?: number,
    direction?: number,
    color?: string,
    speed?: number,
    trail?: number,
    shadow?: boolean,
    hwaccel?: boolean,
    zIndex?: number,
    top?: string,
    left?: string,
    scale?: number
  }
  export interface LoaderProps extends LoaderOptions {
    loaded: boolean
  }

  export default class Loader extends React.Component<LoaderProps, {}> {

  }

}

