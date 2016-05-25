
import { decorate }           from 'react-mixin';
import { Option, Some, None } from 'option-t';

import { PlayGame }     from './PlayGame';
import { Home }         from './Home';
import { GamesList }    from '../components/GamesList';
import { JoinRequests } from '../components/JoinRequests';
import { Players }      from '../components/Players';
import { Footer }       from '../components/Footer';
import { Game }         from '../models/Game';
import { User }         from '../models/User';
import { JoinRequest }  from '../models/JoinRequest';
import { GameStore }    from '../stores/GameStore';
import { GAME_STATUS }  from '../../common/models/GameStatus';

import { getAppState, AppState } from '../appState';

const isCurrent = (g: Game) => !g.hasEnded && !g.hasFailed;

interface DashboardParams {
  gameId?: string;
}

interface DashboardProps {
  params: DashboardParams;
  children?: any;
}

@decorate(ReactMeteorData)
export class Dashboard extends React.Component<DashboardProps, {}> {

  data: AppState;

  getMeteorData() {
    return getAppState();
  }

  render() {
    if (!this.data.isLoggedIn) {
      return <Home />;
    }

    const { user, games, joinRequests } = this.data;
    const { gameId }                    = this.props.params;

    const optGameId = (gameId == null) ? new None() : new Some(gameId);
    const optGame   = optGameId.flatMap(id => GameStore.byId(id));

    const currentGames = games.filter(g => isCurrent(g));
    const pastGames    = games.filter(g => !isCurrent(g));

    const inner = React.cloneElement(this.props.children, {
      game: optGame,
      user,
      games,
      joinRequests
    });

    return (
      <div>
        <Players game={optGame} user={user} />
        <div id="dashboard" className="grid-container">
          <div className="grid-25">
            <div id="sidebar" className="notifications">
              <GamesList
                title="Current games"
                games={currentGames}
                className="current-games"
              />
              <GamesList
                title="Past games"
                games={pastGames}
                className="past-games"
              />
            </div>
          </div>
          <div className='grid-50'>
            <div className="dashboard-main">
              {inner}
            </div>
          </div>
          <div className='grid-25'>
            <div className='notifications'>
              <JoinRequests requests={joinRequests}/>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}

