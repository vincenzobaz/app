
'use strict';

import {Shapes} from '../boot/helpers/shapes.jsx';
import {GameToolbar} from './GameToolbar.jsx';
import {Routes} from './../Routes.jsx';
var React = require('react');

export const Footer = React.createClass({

  propTypes: {
    currentGame: Shapes.Game
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

