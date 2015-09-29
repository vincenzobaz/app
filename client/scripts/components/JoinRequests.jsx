
'use strict';

var React = require('react');

var JoinRequests = React.createClass({

  propTypes: {
    requests: React.PropTypes.arrayOf(R.Shapes.JoinRequest)
  },

  render() {
    return (
      <div className='well'>
        <h4 className='h5'>Join requests</h4>
        <ul className='games'>
        {this.renderRequests()}
        </ul>
      </div>
    );
  },

  renderRequests() {
    if (this.props.children) {
      return this.props.children;
    }

    if (this.props.requests) {
      return this.props.requests.map(req =>
        <R.JoinRequest key={'joinrequest-' + req.getId()} request={req} />
      );
    }

    return <R.JoinRequest.None />;
  }

});

Reminisce.JoinRequests = JoinRequests;
