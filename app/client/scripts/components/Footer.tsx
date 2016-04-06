
import {GameToolbar} from "./GameToolbar";
import {Routes} from "../../../common/Routes";
import {Game} from "../models/Game";
import {Games} from "../collections/Games";
import {GameStore} from "../stores/GameStore";
import {ModalManager} from "../ModalManager";

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
        {/*<li className=''>
          <a href="#" onClick={this.showPage('about')}>About</a>
        </li>*/}
        {/*<li className='right'>
          <a href="#" onClick={this.showPage('account')}>Account</a>
        </li>*/}
        <li className='manage-game right'>
          <GameToolbar game={this.props.currentGame} />
        </li>
      </ul>
    );
  }

  showPage(page) {
    return (e) => {
      e.preventDefault();
      GameStore.pause();
      Session.set('page', page);
    };
  }

}

