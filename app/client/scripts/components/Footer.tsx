
'use strict';

import {GameToolbar} from './GameToolbar';
import {Routes} from './../../../common/Routes';
import {Game} from "../models/Game";
import {ModalManager} from "../ModalManager";
import {getEndGameDesc} from "./EndGame";
import {Games} from "../collections/Games";

interface FooterProps {
  currentGame?: Game;
}

export class Footer extends React.Component<FooterProps, {}> {
  
  render() {
    return (
      <ul className='menu'>
        <li className='branding'>
            <a href="#" onClick={this.showPage('home')}>
              <img src={Routes.Assets.at('images/reminisce-logo-ios.png')} alt='Reminisce' width='48' height='48' />
            </a>
        </li>
        <li className=''>
          <a href="#" onClick={this.showPage('about')}>About</a>
        </li>
        <li className=''>
          <a href="#" onClick={this.executeTest()}>Test</a>
        </li>
        <li className='right'>
          <a href="#" onClick={this.showPage('account')}>Account</a>
        </li>
        <li className='manage-game right'>
          <GameToolbar game={this.props.currentGame} />
        </li>
      </ul>
    );
  }

  showPage(page) {
    return (e) => {
      e.preventDefault();
      Session.set('page', page);
    };
  }
  
  executeTest() {
    return (e: React.MouseEvent) => {
      const game = Games.findOne();
      const endGame = getEndGameDesc(game);
      ModalManager.showModal(endGame);
    }

  }

}

