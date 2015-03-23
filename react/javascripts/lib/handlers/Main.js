/** @jsx React.DOM */

'use strict';

/*jshint -W079 */
var React = require('react'),
    AppState = require('../AppState'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Home = require('./Home'),
    Dashboard = require('./Dashboard'),
    debug = require('debug')('Main');

var Main = React.createClass({

  mixins: [ReactMeteor.Mixin],

  getMeteorState() {
    return AppState();
  },

  render() {
    if (!this.state.isLoggedIn) {
      return <Home />;
    }

    return (
      <Dashboard {...this.state}>
        <RouteHandler {...this.state} />
      </Dashboard>
    );
  }

});

module.exports = Main;
