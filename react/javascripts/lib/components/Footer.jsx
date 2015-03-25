
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
            <a href="#">
              <img src={Routes.Assets.at('images/reminisce-logo-ios.png').url} alt='Reminisce' width='48' height='48' />
            </a>
        </li>
        <li className=''>
          <a href="#">About</a>
        </li>
        <GameToolbar game={this.props.currentGame} />
      </ul>
    );
  }

});

module.exports = Footer;
