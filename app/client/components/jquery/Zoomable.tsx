
'use strict';

// Requires jQuery.fn.zoom() to be loaded.
// http://www.jacklmoore.com/zoom/

interface ZoomableProps {
  url: string;
  on?: string;
  duration?: number;
  target?: string;
  touch?: boolean;
  magnify?: number;
  callback?: Function;
  onZommIn?: Function;
  onZoomOut?: Function;
  children?: any;
}

export class Zoomable extends React.Component<ZoomableProps, {}> {


  setState(state: any) {
    
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.url !== nextProps.url;
  }
  
  enableZoom() {
    //FIXME: Zoom function isnt' available currently as we try to move away from rock-hammer
    // $(this.getDOMNode()).zoom(this.props);
    // $(ReactDOM.findDOMNode(this))
  }
  
  destroyZoom() {
    // $(this.getDOMNode()).trigger('zoom.destroy');
    $(ReactDOM.findDOMNode(this)).trigger('zoom.destroy');
  }
  
  componentWillUpdate() {
    this.destroyZoom();
  }
  
  componentDidUpdate() {
    this.enableZoom();
  }
  
  componentDidMount() {
    this.enableZoom();
  }
  
  componentWillUnmount() {
    this.destroyZoom();
  }
  
  forceUpdate() {
    
  }
  
  render() {
    return this.props.children;
  }
}
