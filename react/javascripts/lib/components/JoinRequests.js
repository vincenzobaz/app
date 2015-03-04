/** @jsx React.DOM */

'use strict';

var React = require('react'),
    JoinRequest = require('./JoinRequest'),
    joinRequestShape = require('./shapes').joinRequest;

var JoinRequests = React.createClass({

  propTypes: {
    requests: React.PropTypes.arrayOf(joinRequestShape)
  },

  render() {
    return (
      <div className='well'>
        <h4 className='h5'>Join requests</h4>
        <ul className='games'>
        {this._renderRequests()}
        </ul>
      </div>
    );
  },

  _renderRequests() {
    if (this.props.children) {
      return this.props.children;
    }

    if (this.props.requests) {
      return this.props.requests.map(req =>
        <JoinRequest key={'joinrequest-' + req.getId()} request={req} />
      );
    }

    return JoinRequest.None();
  }

});

module.exports = JoinRequests;
