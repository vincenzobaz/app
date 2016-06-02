
'use strict';
import {Modal, Button} from "react-bootstrap";

function nop() {}

interface NetworkErrorModalProps {
  onRequestHide: React.ReactEventHandler;
}

export class  NetworkErrorModal extends React.Component<NetworkErrorModalProps, {}> {



  reload() {
    window.location.reload(false);
  }

  render() {
    var onRequestHide = this.props.onRequestHide || nop;
    var lastPStyle = { marginBottom: 0 };

    return (
      <Modal enforceFocus={false} backdrop={true} animation={true} dialogClassName='error' onHide={onRequestHide}>
        <Modal.Header>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <h3>Oh snap! An error occured!</h3>
        </Modal.Header>
        <Modal.Body>
          <p>An network error just occurred. While this is most likely our fault, please make sure to check your internet connection before reloading the page.</p>
          <p style={lastPStyle}>If the issue persists, drop us a line at <a href="mailto:bugs@reminisce.me">bugs@reminisce.me</a>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.reload} bsStyle="primary">Reload the page</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}
