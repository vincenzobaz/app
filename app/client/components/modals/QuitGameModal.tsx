
import {Game} from "../../models/Game";
import {Modal, Button} from "react-bootstrap";

interface QuitGameModalProps {
  game: Game;
  onResume: Function;
  onQuit: Function;
  onRequestHide: Function;
}

// FIXME: Write proper QuitGame modal body.
export class QuitGameModal extends React.Component<QuitGameModalProps, {}> {

  render() {
    return (
        <Modal backdrop={true} animation={true} dialogClassName='error' onHide={this.onResume.bind(this)}>
          <Modal.Header>
            <Modal.Title id='confirm'>Quitting will make you to lose this game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Donec ullamcorper nulla non metus auctor fringilla.
              Cras justo odio, dapibus ac facilisis in, egestas eget quam.
              Cras mattis consectetur purus sit amet fermentum.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="default" onClick={this.onResume.bind(this)}>Resume Game</Button>
            <Button bsStyle="primary" onClick={this.onQuit.bind(this)}>Quit Game</Button>
          </Modal.Footer>
        </Modal>
    );
  }

  onResume() {
    this.props.onRequestHide();
    this.props.onResume();
  }

  onQuit() {
    this.props.onRequestHide();
    this.props.onQuit();
  }
}

