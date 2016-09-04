
import { decorate }           from 'react-mixin';
import { Option, Some, None } from 'option-t';

import { PlayGame }         from './PlayGame';
import { Home }             from './Home';
import { GamesList }        from '../components/GamesList';
import { JoinRequestsList } from '../components/JoinRequestsList';
import { Players }          from '../components/Players';
import { Footer }           from '../components/Footer';
import { Game }             from '../models/Game';
import { User }             from '../models/User';
import { JoinRequest }      from '../models/JoinRequest';
import { GameStore }        from '../stores/GameStore';
import { GAME_STATUS }      from '../../common/models/GameStatus';

import { getAppState, AppState } from '../appState';

import Location = HistoryModule.Location;

interface DashboardParams {
  gameId?: string;
}

interface DashboardProps {
  params: DashboardParams;
  children?: any;
  location?: Location
}

interface RequestQuery {
  app_request_type?: 'user_touser';
  request_ids?: string;
  fb_source?: 'notification';
}

function deleteFBRequests(location: Location) {
  if (!location.query) {
    return;
  }

  const query = location.query as RequestQuery;

  if (query.request_ids) {
    const requestIds = query.request_ids.split(',');
    Meteor.call('FBJoinRequests.delete', requestIds)
  }
}

@decorate(ReactMeteorData)
export class Dashboard extends React.Component<DashboardProps, {}> {

  data: AppState;

  constructor(props: DashboardProps) {
    super(props);
  }

  getMeteorData() {
    return getAppState();
  }

  componentDidReceiveProps(props) {
    const location = props.location;

    if (location) {
      deleteFBRequests(location);
    }
  }

  render() {
    if (!this.data.isLoggedIn) {
      return <Home />;
    }

    const {
      user,
      games,
      joinRequests,
      lastGameId
    } = this.data;

    const { gameId } = this.props.params;

    const optGameId = (gameId == null) ? new None() : new Some(gameId);
    const game      = optGameId.flatMap(id => GameStore.byId(id));

    const inner = React.cloneElement(this.props.children, {
      game,
      user,
      games,
      joinRequests,
      lastGameId
    });

    return (
      <div>
        {this.renderPlayers(game, user)}
        <div id="dashboard" className="grid-container">
          <div className="grid-25 desktop-only">
            <div id="sidebar" className="notifications">
              <GamesList games={games} />
            </div>
          </div>
          <div className="grid-50">
            <div className="dashboard-main">
              {inner}
            </div>
          </div>
          <div className="grid-25 desktop-only">
            <div className="notifications">
              <JoinRequestsList requests={joinRequests} />
            </div>
          </div>
        </div>
        <Footer currentGame={game.unwrapOr(null)}
                location={this.props.location} />
      </div>
    );
  }

  renderPlayers(game: Option<Game>, user: User) {
    if (!game.isSome) {
      return null;
    }

    return <Players game={game} user={user} />;
  }

}

