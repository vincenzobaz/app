
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

    return (
      <Modal enforceFocus={false} backdrop={true} animation={true}  onHide={onRequestHide as Function}>
        <Modal.Header className='error'>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide as React.MouseEventHandler}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <Modal.Title>{this.props.error.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-body'>
            {this.props.error.body}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

}

