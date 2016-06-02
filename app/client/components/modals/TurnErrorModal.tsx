import {Modal, Button} from "react-bootstrap";

interface TurnErrorModalProps {
  onRequestHide: React.MouseEventHandler;
}

export class TurnErrorModal extends React.Component<TurnErrorModalProps, {}> {

  render() {
    const onRequestHide = this.props.onRequestHide || (() => {});
    const lastPStyle = {marginBottom: 0};

    return (
        <Modal enforceFocus={false} backdrop={true} animation={true} onHide={onRequestHide}>
          <Modal.Header>
            <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide}>
              <i className='icon-remove-sign icon-2x'></i>
            </span>
            <Modal.Title>Sorry, you cannot play at this time.</Modal.Title>
          </Modal.Header>
          <Modal.Body className='error turn-error'>
            <p>Please wait until the other player has completed their turn before playing again.</p>
            <p style={lastPStyle}>If you think this is an error, drop us a line at
              <a href="mailto:bugs@reminisce.me">bugs@reminisce.me</a>.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onRequestHide} bsStyle="primary">Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }

}

