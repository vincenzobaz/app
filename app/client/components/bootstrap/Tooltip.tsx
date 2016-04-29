// FIXME: Use react-bootstrap's Tooltip component instead.


interface TooltipProps {
  title?: string;
  animation?: boolean;
  html?: boolean;
  placement?: string;
  selector?: string;
  trigger?: string;
  container?: string;
  delay?: number | {show: number, hide: number};
  children?: any;

}

export class Tooltip extends React.Component<TooltipProps, {}> {

  constructor(props: TooltipProps) {
    super(props);
    this.props = {delay: 500}
  }


  componentDidMount() {
    //$(this.getDOMNode()).tooltip(this.props);
  }

  componentWillUnmount() {
    //$(this.getDOMNode()).tooltip('destroy');
  }

  render() {
    return this.props.children;
  }
}
