'use strict';

import {Player} from './../components/Player';
import {GamesList} from './../components/GamesList';
import {JoinRequests} from './../components/JoinRequests';
import {Players} from './../components/Players';
import {Footer} from './../components/Footer';
import {Game} from "../models/Game";
import {User} from "../models/User";
import {JoinRequest} from "../models/JoinRequest";
import {GAME_STATUS} from "../../../common/models/GameStatus";

interface DashboardProps {
  currentGame?: Game;
  user: User;
  games: Game[];
  joinRequests?: JoinRequest[];
  children?: any;
  
}

export class Dashboard extends React.Component<DashboardProps,{}> {



    render() {
        return (
            <div>
                <Players game={this.props.currentGame} user={this.props.user}/>
                <div id="dashboard" className="grid-container">
                    <div className="grid-25">
                        <div id="sidebar" className="notifications">
                            <GamesList
                                title="Current games"
                                games={this.props.games.filter((g: Game) => !g.hasEnded)}
                                className="current-games"
                            />
                            <GamesList
                                title="Past games"
                                games={this.props.games.filter(g => g.hasEnded)}
                                className="past-games"
                            />
                        </div>
                    </div>
                    <div className='grid-50'>
                        <div className="dashboard-main">
                            {this.props.children}
                        </div>
                    </div>
                    <div className='grid-25'>
                        <div className='notifications'>
                            <JoinRequests requests={this.props.joinRequests}/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

