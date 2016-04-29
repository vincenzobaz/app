
import {GameToolbar} from "./GameToolbar";
import {Routes} from "../../../common/Routes";
import {Game} from "../models/Game";
import {Games} from "../collections/Games";
import {GameStore} from "../stores/GameStore";

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
      <footer id="footer" className="navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          <div className="row">
            {this.renderBranding()}
            {this.renderGameToolbar()}
          </div>
        </div>
      </footer>
    );
  }

  renderBranding() {
    return (
      <div className='branding col-sm-4 col-xs-2'>
        <a href="#" onClick={this.showPage('home')}>
          <img src={Routes.Assets.at('images/reminisce-logo-ios.png')} alt='Reminisce' width='48' height='48' />
        </a>
      </div>
    );
  }

  renderGameToolbar() {
    return (
      <div className='col-xs-10 col-sm-8 pull-right text-right'>
        <GameToolbar game={this.props.currentGame} />
      </div>
    );
  }

}

