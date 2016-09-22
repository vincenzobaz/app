

import {Alert} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {AlertProps} from "react-bootstrap";
interface DismissableAlertProps extends React.HTMLProps<any> {
  onDismiss?: Function;
  style?: React.CSSProperties;
  bsStyle: string;
}


interface DismissableAlertState {
  visible: boolean;

}

export class DismissableAlert extends React.Component<DismissableAlertProps, DismissableAlertState> {

  /**
   * All properties are passed down to the inner Alert.
   * See https://react-bootstrap.github.io/components.html#alerts
   * for the full documentation.
   */

  constructor(props: DismissableAlertProps) {
    super(props);
    this.state = {
      visible: true
    };
    this.props.onDismiss = this.onDismiss;
  }



  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <Alert {...this.props}>
        {this.props.children}
        <p style={{marginBottom: 0}}>
          <Button onClick={this.onDismiss}>Dismiss</Button>
        </p>
      </Alert>
    );
  }

  onDismiss() {
    this.setState({visible: false});
  }

}

