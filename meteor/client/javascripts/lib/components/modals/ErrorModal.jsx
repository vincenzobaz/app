
'use strict';

var React = require('react'),
    Modal = require('react-bootstrap').Modal;

var nop = function() {};

var ErrorModal = React.createClass({

  propTypes: {
    error: React.PropTypes.object.isRequired,
    onRequestHide: React.PropTypes.func
  },

  render() {
    var onRequestHide = this.props.onRequestHide || nop;

    return (
      <Modal backdrop={true} animation={true} className='error' onRequestHide={onRequestHide}>
        <div className='modal-header'>
          <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={onRequestHide}>
            <i className='icon-remove-sign icon-2x'></i>
          </span>
          <h3>{this.props.error.title}</h3>
        </div>
        <div className='modal-body'>
          {this.props.error.body}
        </div>
      </Modal>
    );
  }

});

module.exports = ErrorModal;
