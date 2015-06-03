
'use strict';

var React = require('react'),
    GameToolbar = require('./GameToolbar'),
    Routes = require('../Routes'),
    shapes = require('./shapes');

var Footer = React.createClass({

  propTypes: {
    currentGame: shapes.Game
  },

  render() {
    return (
      <ul className='menu'>
        <li className='branding'>
            <a href="#" onClick={this.showHome}>
              <img src={Routes.Assets.at('images/reminisce-logo-ios.png').url} alt='Reminisce' width='48' height='48' />
            </a>
        </li>
        <li className=''>
          <a href="#" onClick={this.showAbout}>About</a>
        </li>
        <li className=''>
          <a href="#" onClick={this.showStats}>Stats</a>
        </li>
        <GameToolbar game={this.props.currentGame} />
      </ul>
    );
  },

  showHome(e) {
    e.preventDefault();
    Session.set('page', 'home');
  },

  showAbout(e) {
    e.preventDefault();
    Session.set('page', 'about');
  },

  showStats(e) {
    e.preventDefault();
    Session.set('page', 'stats');
  }

});

module.exports = Footer;
