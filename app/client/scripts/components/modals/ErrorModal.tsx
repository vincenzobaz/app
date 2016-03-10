
'use strict';
import {Modal} from "react-bootstrap";

var nop = function() {};

interface ErrorModalProps {
  error: {title: string, body: JSX.Element};
  onRequestHide: React.MouseEventHandler | Function;
}

export class ErrorModal extends React.Component<ErrorModalProps, {}> {

  render() {
    var onRequestHide = this.props.onRequestHide || nop;
    Modal.Body 

    return (
      <Modal backdrop={true} animation={true}  onHide={onRequestHide as Function}>
        <Modal.Body className='error'>
        <div className='modal-header'>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide as React.MouseEventHandler}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <h3>{this.props.error.title}</h3>
        </div>
        <div className='modal-body'>
          {this.props.error.body}
        </div>
        </Modal.Body>
      </Modal>
    );
  }

}

