
'use strict';

var React = require('react'),
    shapes = require('./shapes'),
    JoinRequestStore = require('../stores/JoinRequestStore');

var JoinRequest = React.createClass({

  propTypes: {
    request: shapes.JoinRequest
  },

  render() {
    var from = this.props.request.getFrom();

    return (
      <li className='waiting'>
        <div className='media'>
          <a className='pull-left' title='Switch to this game' onClick={this._accept}>
            <img className='media-object img-circle' width='40' src={from.getAvatarUrl()} alt='' />
          </a>
          <div className='media-body'>
            <h5 className='media-heading'>
              {from.getFullName()}
            </h5>
            <div className="waiting-actions">
              <button className='btn btn-mini btn-success' onClick={this._accept}>ACCEPT</button>
              <small> or <a href='' onClick={this._decline}>decline</a></small>
            </div>
          </div>
        </div>
      </li>
    );
  },

  _accept(e) {
    e.preventDefault();
    JoinRequestStore.accept(this.props.request.getId());
  },

  _decline(e) {
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
