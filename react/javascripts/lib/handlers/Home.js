/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Welcome = require('../components/Welcome');

var Home = React.createClass({

  render() {
    return (
      <Welcome user={this.props.user}
               joinRequests={this.props.joinRequests}
               games={this.props.games} />
    );
  }

});

module.exports = Home;
