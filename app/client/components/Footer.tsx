
import { Button }      from 'react-bootstrap';
import { Link }        from 'react-router';

import { GameToolbar } from './GameToolbar';
import { Routes }      from '../../common/Routes';
import { Game }        from '../models/Game';
import { Games }       from '../collections/Games';
import { GameStore }   from '../stores/GameStore';
import { responsiveComponent }  from '../helpers/responsive';

interface FooterProps {
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
          <i className={`glyphicon glyphicon-${glyph}`}></i>
          <span>{title}</span>
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

export const Footer = responsiveComponent(MobileFooter, DesktopFooter);

