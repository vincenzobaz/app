
const React = require('react'),
      Chart = require('react-chartjs'),
      debug = require('debug')('GamesStatChart');

const TileStats = React.createClass({

  propTypes: {
    gameStats: React.PropTypes.instanceOf(Gamestat)
  },

  getStats() {
    if (this.props.gameStats == null) {
      return null;
    }

    const gameStats = this.props.gameStats;

    const mcStat    = gameStats.getMCTried()    === 0 ? 0 : gameStats.getMCCorrect()    / gameStats.getMCTried();
    const tlStat    = gameStats.getTLTried()    === 0 ? 0 : gameStats.getTLCorrect()    / gameStats.getTLTried();
    const geoStat   = gameStats.getGeoTried()   === 0 ? 0 : gameStats.getGeoCorrect()   / gameStats.getGeoTried();
    const orderStat = gameStats.getOrderTried() === 0 ? 0 : gameStats.getOrderCorrect() / gameStats.getOrderTried();

    const values  = [ mcStat, tlStat, geoStat, orderStat ].map(x => (+x.toFixed(2)) * 100);
    const barData = {
        labels   : [ 'Multiple Choice', 'Timeline', 'Geo', 'Ordering' ],
        datasets : [
          {
            data            : values,
            fillColor       : 'rgba(220,220,220,0.5)',
            strokeColor     : 'rgba(220,220,220,0.8)',
            highlightFill   : 'rgba(220,220,220,0.75)',
            highlightStroke : 'rgba(220,220,220,1)',
          }
        ]
    };

    return {
      barData
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
        <h3>Percentage of correctly answered tiles, by type</h3>
        <Chart.Bar data={stats.barData} options={chartOptions} width="400" height="400" />
      </div>
    );
  }


});

Reminisce.TileStats = TileStats;

