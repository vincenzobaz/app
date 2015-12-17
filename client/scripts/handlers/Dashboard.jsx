
'use strict';

var React = require('react');

var Dashboard = React.createClass({

  propTypes: {
    currentGame: R.Shapes.Game,
    user: R.Shapes.User,
    games: React.PropTypes.arrayOf(R.Shapes.Game),
    joinRequests: React.PropTypes.arrayOf(R.Shapes.JoinRequest)
  },

  render() {
    return (
      <div>
        <R.Players game={this.props.currentGame} user={this.props.user} />
        <div id="dashboard" className="grid-container">
          <div className="grid-20">
            <div id="sidebar" className="notifications">
              <R.GamesList
                title="Current games"
                games={this.props.games.filter(g => !g.hasEnded())}
                className="current-games"
              />
              <R.GamesList
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
              <R.JoinRequests requests={this.props.joinRequests} />
            </div>
          </div>
        </div>
        <nav id="navigation-toggle" role="navigation">
          <div className="grid-container">
            <div id="js-footer" className="grid-100">
              <R.Footer />
            </div>
          </div>
        </nav>
      </div>
    );
  }

});

Reminisce.Dashboard = Dashboard;
