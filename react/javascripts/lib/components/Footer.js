
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    GameToolbar = require('./GameToolbar'),
    Routes = require('../Routes'),
    Link = require('react-router').Link;

var Footer = React.createClass({

  render() {
    return (
      <ul className='menu'>
        <li className='branding'>
            <Link to={Routes.Home.index().url}>
              <img src={Routes.Assets.at('images/reminisce-logo-ios.png').url} alt='Reminisce' width='48' height='48' />
            </Link>
        </li>
        <li className=''>
          <Link to={Routes.About.index().url}>About</Link>
        </li>
        <GameToolbar />
      </ul>
    );
  }

});

module.exports = Footer;
