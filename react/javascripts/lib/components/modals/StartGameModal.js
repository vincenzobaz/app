
'use strict';

var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Modal = Bootstrap.Modal,
    Button = Bootstrap.Button,
    shapes = require('../shapes');

var StartGameModal = React.createClass({

  propTypes: {
    onOk: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onRequestHide: React.PropTypes.func.isRequired,
    opponent: shapes.User.isRequired
  },

  render() {
    const opponent = this.props.opponent;
    const name = opponent && opponent.getFullName() || 'them';

    return (
      <Modal backdrop={true} animation={true} className='error' onRequestHide={this.onCancel}>
        <div className='modal-header'>
          <h3 id='confirm'>Do you want to play with {name}?</h3>
        </div>
        <div className='modal-body'>
          <p>
            That will send <em>{name}</em> a join request, and you will be able to play together once they accept it.
          </p>
        </div>
        <div className='modal-footer'>
          <Button bsStyle="primary" onClick={this.onOk}>Send request</Button>
          <Button bsStyle="danger" onClick={this.onCancel}>Cancel</Button>
        </div>
      </Modal>
    );
  },

  onOk() {
    this.props.onRequestHide();
    this.props.onOk();
  },

  onCancel() {
    this.props.onRequestHide();
    this.props.onCancel();
  }

});

module.exports = StartGameModal;
