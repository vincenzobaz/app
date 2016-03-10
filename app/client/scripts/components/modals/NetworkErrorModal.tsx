
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
        //FIXME: Rework all modals due to api change
      <Modal backdrop={true} animation={true} dialogClassName='error' onHide={onRequestHide}>
        <div className='modal-header'>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <h3>Oh snap! An error occured!</h3>
        </div>
        <div className="modal-body">
          <p>An network error just occurred. While this is most likely our fault, please make sure to check your internet connection before reloading the page.</p>
          <p style={lastPStyle}>If the issue persists, drop us a line at <a href="mailto:bugs@reminisce.me">bugs@reminisce.me</a>.</p>
        </div>
        <div className="modal-footer">
          <Button onClick={this.reload} bsStyle="primary">Reload the page</Button>
        </div>
      </Modal>
    );
  }

}
