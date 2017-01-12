
import { Row, Button, Glyphicon } from 'react-bootstrap';
import { Link }                   from 'react-router';

import { GameToolbar } from './GameToolbar';
import { Routes }      from '../../common/Routes';
import { Game }        from '../models/Game';
import { User }        from '../models/User';
import { Games }       from '../collections/Games';
import { GameStore }   from '../stores/GameStore';

import { responsiveComponent } from '../helpers/responsive';

interface FooterProps {
  user: User;
  currentGame?: Game;
  location: HistoryModule.Location;
}

interface NavLinkProps {
  url: string;
  title: string;
  glyph: string;
  activeOn?: (url: string) => boolean;
}

interface NavLinkPropsFull extends NavLinkProps {
  location: HistoryModule.Location;
}

class NavLink extends React.Component<NavLinkPropsFull, void> {

  context: {
    router: {
      isActive: Function
    }
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const { router } = this.context;
    const { url, title, glyph, location, activeOn } = this.props;

    let isActive = router.isActive(url, true);

    if (!isActive && activeOn != null) {
      isActive = activeOn(location.pathname);
    }

    const className = isActive ? 'active' : '';

    return (
      <li className={className}>
        <Link to={url}>
          <Glyphicon glyph={glyph} />
          <span className="tab-title">{title}</span>
        </Link>
      </li>
    );
  }

}

export class MobileFooter extends React.Component<FooterProps, void> {

  links: NavLinkProps[] = [
    {
      url: Routes.Page.home(),
      activeOn: url => url === '/' || url.indexOf('/play') === 0,
      glyph: 'play-circle',
      title: 'Play'
    },
    {
      url: Routes.Page.games(),
      glyph: 'king',
      title: 'Games'
    },
    {
      url: Routes.Page.joinRequests(),
      glyph: 'inbox',
      title: 'Join Requests'
    },
    {
      url: Routes.Page.stats(),
      glyph: 'stats',
      title: 'Statistics'
    },
    {
      url: Routes.Page.account(),
      glyph: 'user',
      title: 'Account'
    }
  ];

  render() {
    return (
      <footer id="footer" className="navbar-default navbar-fixed-bottom">
        <div className="container">
          <div className="row">
            <ul className="nav navbar-nav">
              {this.renderLinks()}
            </ul>
          </div>
        </div>
      </footer>
    );
  }

  renderLinks() {
    return this.links.map(link =>
      <NavLink key={link.title} location={this.props.location} {...link} />
    );
  }

}

export class DesktopFooter extends React.Component<FooterProps, void> {

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
      <div className='branding col-sm-2'>
        <Link to={Routes.Page.home()}>
          <img src={Routes.Assets.at('images/reminisce-logo-ios.png')} alt='Reminisce' width='48' height='48' />
        </Link>
      </div>
    );
  }

  renderGameToolbar() {
    return (
      <div className='col-sm-14 pull-right text-right'>
        <GameToolbar game={this.props.currentGame} user={this.props.user} />
      </div>
    );
  }

}

export const Footer = responsiveComponent(MobileFooter, DesktopFooter);

