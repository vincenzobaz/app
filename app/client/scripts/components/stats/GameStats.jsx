


const React = require('react'),
      Chart = require('react-chartjs'),
      debug = require('debug')('GamesStatChart');

export const GameStats = React.createClass({

  propTypes: {
    gameStats: React.PropTypes.instanceOf(Gamestat)
  },

  getStats() {
    if (this.props.gameStats == null) {
      return null;
    }

    const gameStats   = this.props.gameStats;
    const gamesPlayed = gameStats.getGamesPlayed();
    const gamesWon    = gameStats.getGamesWon();
    const gamesDrawn  = gameStats.getGamesDrawn();
    const gamesLost   = gameStats.getGamesLost();

    const pieData = [
      { label: 'Won',   value: gamesWon,   color: '#1E5C82' },
      { label: 'Drawn', value: gamesDrawn, color: '#271533' },
      { label: 'Lost',  value: gamesLost,  color: '#BE2032' }
    ];

    return {
      gamesPlayed,
      gamesWon,
      gamesDrawn,
      pieData
    };
  },

  render() {
    const stats = this.getStats();

    if (stats == null) {
      return <h3>Sorry, we have no stats for you right now.</h3>;
    }

    const chartOptions = {
      responsive: false
    };

    return (
      <div>
        <h3>Total games played: {stats.gamesPlayed}</h3>
        <Chart.Pie data={stats.pieData} options={chartOptions} width="400" height="400" />
      </div>
    );
  }


});


