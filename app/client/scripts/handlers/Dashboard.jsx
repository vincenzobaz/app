'use strict';

import {Shapes} from './../boot/helpers/shapes';
import {Player} from './../components/Player';
import {GamesList} from './../components/GamesList';
import {JoinRequests} from './../components/JoinRequests';
import {Players} from './../components/Players';
import {Footer} from './../components/Footer';

var React = require('react');

export const Dashboard = React.createClass({

    propTypes: {
        currentGame: Shapes.Game,
        user: Shapes.User,
        games: React.PropTypes.arrayOf(Shapes.Game),
        joinRequests: React.PropTypes.arrayOf(Shapes.JoinRequest)
    },

    render() {
        return (
            <div>
                <Players game={this.props.currentGame} user={this.props.user}/>
                <div id="dashboard" className="grid-container">
                    <div className="grid-20">
                        <div id="sidebar" className="notifications">
                            <GamesList
                                title="Current games"
                                games={this.props.games.filter(g => !g.hasEnded())}
                                className="current-games"
                            />
                            <GamesList
                                title="Past games"
                                games={this.props.games.filter(g => g.hasEnded())}
                                className="past-games"
                            />
                        </div>
                    </div>
                    <div className='grid-50 prefix-5'>
                        <div className="dashboard-main">
                            {this.props.children}
                        </div>
                    </div>
                    <div className='grid-20 prefix-5'>
                        <div className='notifications'>
                            <JoinRequests requests={this.props.joinRequests}/>
                        </div>
                    </div>
                </div>
                <nav id="navigation-toggle" role="navigation">
                    <div className="grid-container">
                        <div id="js-footer" className="grid-100">
                            <Footer />
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

});

