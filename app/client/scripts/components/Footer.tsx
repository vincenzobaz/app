
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

  showPage(page) {
    return (e) => {
      e.preventDefault();
      GameStore.pause();
      Session.set('page', page);
    };
  }

  render() {
    return (
      <div id='footer' className='container-fluid'>
      {this.renderBranding()}
      {this.renderGameToolbar()}
      </div>
    );
  }

  renderBranding() {
    return (
      <div className='branding grid-10'>
        <a href="#" onClick={this.showPage('home')}>
          <img src={Routes.Assets.at('images/reminisce-logo-ios.png')} alt='Reminisce' width='48' height='48' />
        </a>
      </div>
    );
  }

  renderGameToolbar() {
    return (
      <div className='grid-50 pull-right text-right'>
        <GameToolbar game={this.props.currentGame} />
      </div>
    );
  }

}

