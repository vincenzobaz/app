
'use strict';

import {Shapes} from './../../boot/helpers/shapes.jsx';

var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Modal = Bootstrap.Modal,
    Button = Bootstrap.Button;

export const StartGameModal = React.createClass({

  propTypes: {
    onOk: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    friend: Shapes.Friend.isRequired
  },

  render() {
    const friend = this.props.friend;

    return (
      <Modal backdrop={true} animation={true} className='error' onRequestHide={this.onCancel}>
        <div className='modal-header'>
          <h3 id='confirm'>Do you want to play with {friend.name}?</h3>
        </div>
        <div className='modal-body'>
          <p>
            That will send <em>{friend.name}</em> a join request, and you will be able to play together once they accept it.
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
    this.props.onOk();
  },

  onCancel() {
    this.props.onCancel();
  }

});

