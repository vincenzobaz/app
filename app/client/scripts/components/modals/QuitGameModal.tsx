
import {Game} from "../../models/Game";
import * as Boots from "react-bootstrap";

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
        <Boots.Modal backdrop={true} animation={true} className='error' onRequestHide={this.onResume}>
          <div className='modal-header'>
              <h3 id='confirm'>Quitting will make you to lose this game</h3>
              </div>
          <div className='modal-body'>
              <p>
                Donec ullamcorper nulla non metus auctor fringilla.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Cras mattis consectetur purus sit amet fermentum.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              </p>
              </div>
          <div className='modal-footer'>
              <Boots.Button bsStyle="default" onClick={this.onResume}>Resume Game</Boots.Button>
              <Boots.Button bsStyle="primary" onClick={this.onQuit}>Quit Game</Boots.Button>
              </div>
        </Boots.Modal>
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
