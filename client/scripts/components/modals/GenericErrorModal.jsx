
'use strict';

var React = require('react'),
    Modal = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button;

function nop() {}

var GenericErrorModal = React.createClass({

  propTypes: {
    onRequestHide: React.PropTypes.func
  },

  reload() {
    window.location.reload(false);
  },

  render() {
    var onRequestHide = this.props.onRequestHide || nop;
    var lastPStyle = { marginBottom: 0 };

    return (
      <Modal backdrop={true} animation={true} className='error' onRequestHide={onRequestHide}>
        <div className='modal-header'>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <h3>Oh snap! An error occured!</h3>
        </div>
        <div className="modal-body">
          <p>An error just occurred. Please reload the page.</p>
          <p style={lastPStyle}>If the issue persists, drop us a line at <a href="mailto:bugs@reminisce.me">bugs@reminisce.me</a>.</p>
        </div>
        <div className="modal-footer">
          <Button onClick={this.reload} bsStyle="primary">Reload the page</Button>
        </div>
      </Modal>
    );
  }

});

Reminisce.GenericErrorModal = GenericErrorModal;
