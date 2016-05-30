
import {Game} from "../../models/Game";
import {Modal, Button} from "react-bootstrap";

interface QuitGameModalProps {
  game: Game;
  onResume: Function;
  onQuit: Function;
  onRequestHide: Function;
  show: boolean;
}

// FIXME: Write proper QuitGame modal body.
export class QuitGameModal extends React.Component<QuitGameModalProps, {}> {

  render() {
    return (
        <Modal show={this.props.show} backdrop={true} animation={true} dialogClassName='error' onHide={this.onResume.bind(this)}>
          <Modal.Header>
            <Modal.Title>Quitting will make you to lose this game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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

