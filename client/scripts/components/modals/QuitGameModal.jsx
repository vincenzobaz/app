
'use strict';

var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Modal = Bootstrap.Modal,
    Button = Bootstrap.Button;

// FIXME: Write proper QuitGame modal body.
var QuitGameModal = React.createClass({

  propTypes: {
    game: R.Shapes.Game.isRequired,
    onResume: React.PropTypes.func.isRequired,
    onQuit: React.PropTypes.func.isRequired,
    onRequestHide: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Modal backdrop={true} animation={true} className='error' onRequestHide={this.onResume}>
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
          <Button bsStyle="default" onClick={this.onResume}>Resume Game</Button>
          <Button bsStyle="primary" onClick={this.onQuit}>Quit Game</Button>
        </div>
      </Modal>
    );
  },

  onResume() {
    this.props.onRequestHide();
    this.props.onResume();
  },

  onQuit() {
    this.props.onRequestHide();
    this.props.onQuit();
  }

});

Reminisce.QuitGameModal = QuitGameModal;
