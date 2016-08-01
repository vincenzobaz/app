
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
import {FacebookService} from "../../server/services/FacebookService";
import Location = HistoryModule.Location;
import {FacebookClientService} from "../services/FacebookClientService";
import {MeteorUser} from "../../server/MeteorUser";


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

@decorate(ReactMeteorData)
export class Dashboard extends React.Component<DashboardProps, {}> {

  
  constructor(props: DashboardProps) {
    super(props);
    this.deleteFBRequests();
  }
  data: AppState;

  getMeteorData() {
    return getAppState();
  }
  
  componentDidReceiveProps(props) {
    this.props = props;
    this.deleteFBRequests();
  }
  
  deleteFBRequests() {
    const location: Location = this.props.location;
    if (location) {
      if (location.query) {
        const query: RequestQuery = location.query as RequestQuery;
        if (query.request_ids){
          const requestIds = query.request_ids.split(',');
          Meteor.call('FBJoinRequests.delete', requestIds)
        }
      }
    }
  }

  render() {
    if (!this.data.isLoggedIn) {
      return <Home />;
    }

    const { user, games, joinRequests}: {user: User, games: Game[], joinRequests: JoinRequest[]} = this.data;
    const { gameId }                    = this.props.params;
    const optGameId = (gameId == null) ? new None() : new Some(gameId);
    const optGame   = optGameId.flatMap(id => GameStore.byId(id));
    

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
                games={games}
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

