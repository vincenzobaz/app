import {Friend} from "../../../common/models/Friend";
import {Modal, Button} from 'react-bootstrap';

interface StartGameModalProps {
  onOk: Function;
  onCancel: Function;
  friend: Friend;
  show: boolean;
}

export class StartGameModal extends React.Component<StartGameModalProps, {}> {


  render() {
    const friend = this.props.friend;

    return (
        <Modal enforceFocus={false} show={this.props.show} onHide={this.onCancel} className="fullscreen">
          <Modal.Header>
            <Modal.Title>Do you want to play with {friend.name}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              That will send <em>{friend.name}</em> a join request,
              and you will be able to play together once they accept it.
            </p>
          </Modal.Body>
          <Modal.Footer>
              <Button bsStyle="primary" onClick={this.onOk.bind(this)}>Send request</Button>
              <Button bsStyle="danger" onClick={this.onCancel.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
    );
  }

  onOk() {
    this.props.onOk();
  };

  onCancel() {
    this.props.onCancel();
  }

}


