
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    GameToolbar = require('./GameToolbar'),
    Routes = require('../Routes');

var Footer = React.createClass({

  render() {
    return (
      <ul className='menu'>
        <li className='branding'>
            <a href="#">
              <img src={Routes.Assets.at('images/reminisce-logo-ios.png').url} alt='Reminisce' width='48' height='48' />
            </a>
        </li>
        <li className=''>
          <a href="#">About</a>
        </li>
        <GameToolbar />
      </ul>
    );
  }

});

module.exports = Footer;
