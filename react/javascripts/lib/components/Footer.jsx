
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
            <a href="#" onClick={this.showPage('home')}>
              <img src={Routes.Assets.at('images/reminisce-logo-ios.png').url} alt='Reminisce' width='48' height='48' />
            </a>
        </li>
        <li className=''>
          <a href="#" onClick={this.showPage('about')}>About</a>
        </li>
        <li className=''>
          <a href="#" onClick={this.showPage('stats')}>Stats</a>
        </li>
        <li className='right'>
          <a href="#" onClick={this.showPage('account')}>Account</a>
        </li>
        <li className='manage-game right'>
          <GameToolbar game={this.props.currentGame} />
        </li>
      </ul>
    );
  },

  showPage(page) {
    return (e) => {
      e.preventDefault();
      Session.set('page', page);
    };
  }

});

module.exports = Footer;
