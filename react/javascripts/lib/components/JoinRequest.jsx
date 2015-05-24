
'use strict';

var React = require('react'),
    shapes = require('./shapes'),
    JoinRequestStore = require('../stores/JoinRequestStore');

var JoinRequest = React.createClass({

  propTypes: {
    request: shapes.JoinRequest
  },

  render() {
    const from      = this.props.request.getFrom();
    const avatarUrl = from != null ? from.getAvatarUrl() : '';
    const name      = from != null ? from.getName() : 'Loading...';

    return (
      <li className='waiting'>
        <div className='media'>
          <a className='pull-left' title='Switch to this game' onClick={this.accept}>
            <img className='media-object img-circle' width='40' src={avatarUrl} alt='' />
          </a>
          <div className='media-body'>
            <h5 className='media-heading'>
              {name}
            </h5>
            <div className="waiting-actions">
              <button className='btn btn-mini btn-success' onClick={this.accept}>ACCEPT</button>
              <small> or <a href='' onClick={this.decline}>decline</a></small>
            </div>
          </div>
        </div>
      </li>
    );
  },

  accept(e) {
    e.preventDefault();
    JoinRequestStore.accept(this.props.request.getId());
  },

  decline(e) {
    e.preventDefault();
    JoinRequestStore.decline(this.props.request.getId());
  }

});

JoinRequest.None = React.createClass({
  render() {
    var center = {textAlign: 'center'};
    return (
      <li>
        <div className='media'>
          <p style={center}>You have no join requests</p>
        </div>
      </li>
    );
  }
});

module.exports = JoinRequest;
