
import { Button }      from 'react-bootstrap';
import { Link }        from 'react-router';

import { GameToolbar } from './GameToolbar';
import { Routes }      from '../../common/Routes';
import { Game }        from '../models/Game';
import { Games }       from '../collections/Games';
import { GameStore }   from '../stores/GameStore';

interface FooterProps {
  currentGame?: Game;
}

export class Footer extends React.Component<FooterProps, {}> {

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
        <Link to={Routes.Page.home()}>
          <img src={Routes.Assets.at('images/reminisce-logo-ios.png')} alt='Reminisce' width='48' height='48' />
        </Link>
      </div>
    );
  }

  renderGameToolbar() {
    return (
      <div className='col-xs-8 col-sm-6 pull-right text-right'>
        <GameToolbar game={this.props.currentGame} />
      </div>
    );
  }

}

