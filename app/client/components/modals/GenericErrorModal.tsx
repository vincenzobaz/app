
'use strict';
import EventHandler = React.ReactEventHandler;
import {Button, Modal} from "react-bootstrap";

interface GenericErrorModalProps {
  onRequestHide: EventHandler;
}

export class GenericErrorModal extends React.Component<GenericErrorModalProps, {}>{

  reload() {
    window.location.reload(false);
  }

  render() {
    const onRequestHide = this.props.onRequestHide || (() => {});
    const lastPStyle = { marginBottom: 0 };

    return (
      <Modal enforceFocus={false} backdrop={true} animation={true} dialogClassName='error' onHide={onRequestHide}>
        <Modal.Header>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <Modal.Title>Oh snap! An error occured!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>An error just occurred. Please reload the page.</p>
          <p style={lastPStyle}>If the issue persists, drop us a line at <a href="mailto:bugs@reminisce.me">bugs@reminisce.me</a>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.reload.bind(this)} bsStyle="primary">Reload the page</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}


