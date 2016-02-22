
'use strict';

import {Shapes} from './../boot/helpers/shapes.jsx';
import {JoinRequest, None} from './JoinRequest.jsx';

var React = require('react');

export const JoinRequests = React.createClass({

  propTypes: {
    requests: React.PropTypes.arrayOf(Shapes.JoinRequest).isRequired
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
        <JoinRequest key={'joinrequest-' + req.getId()} request={req} />
      );
    }

    return <None />;
  }

});

