
'use strict';

var React = require('react');

var JoinRequests = React.createClass({

  propTypes: {
    requests: React.PropTypes.arrayOf(R.Shapes.JoinRequest).isRequired
  },

  render() {
    return (
      <div className='well'>
        <h4 className='h5'>Join requests</h4>
        <ul className='join-requests'>
          {this.renderRequests()}
        </ul>
      </div>
    );
  },

  renderRequests() {
    if (this.props.requests.length > 0) {
      return this.props.requests.map(req =>
        <R.JoinRequest key={'joinrequest-' + req.getId()} request={req} />
      );
    }

    return <R.JoinRequest.None />;
  }

});

Reminisce.JoinRequests = JoinRequests;
