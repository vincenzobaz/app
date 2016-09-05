
interface ResponsiveComponentState {
  isMobile: boolean;
}

export function responsiveComponent<P>(Mobile: React.ComponentClass<P>, Desktop: React.ComponentClass<P>, breakpoint: number = 768): React.ComponentClass<P> {
  return class extends React.Component<P, ResponsiveComponentState> {

    constructor(props: P) {
      super(props);

      this.state = {
        isMobile: this.isMobile()
      };

      this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
      const isMobile = this.isMobile();

      if (isMobile !== this.state.isMobile) {
        this.setState({ isMobile });
      }
    }

    isMobile() {
      return document.body.clientWidth < breakpoint;
    }

    render() {
      const Component = this.state.isMobile ? Mobile : Desktop;

      return <Component {...this.props} />;
    }
  }
}

