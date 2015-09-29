
'use strict';

var React = require('react'),
    Modal = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button;

function nop() {}

var TurnErrorModal = React.createClass({

  propTypes: {
    onRequestHide: React.PropTypes.func
  },

  render() {
    var onRequestHide = this.props.onRequestHide || nop;
    var lastPStyle = { marginBottom: 0 };

    return (
      <Modal backdrop={true} animation={true} className='error turn-error' onRequestHide={onRequestHide}>
        <div className='modal-header'>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <h3>Sorry, you cannot play at this time.</h3>
        </div>
        <div className="modal-body">
          <p>Please wait until the other player has completed their turn before playing again.</p>
          <p style={lastPStyle}>If you think this is an error, drop us a line at <a href="mailto:bugs@reminisce.me">bugs@reminisce.me</a>.</p>
        </div>
        <div className="modal-footer">
          <Button onClick={onRequestHide} bsStyle="primary">Close</Button>
        </div>
      </Modal>
    );
  }

});

Reminisce.TurnErrorModal = TurnErrorModal;
