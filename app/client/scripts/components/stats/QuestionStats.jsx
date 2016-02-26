

const React = require('react'),
      Chart = require('react-chartjs'),
      debug = require('debug')('GamesStatChart');

export const QuestionStats = React.createClass({

  propTypes: {
    gameStats: React.PropTypes.instanceOf(Gamestat)
  },

  getStats() {
    if (this.props.gameStats == null) {
      return null;
    }

    const stats = this.props.gameStats;

    const mcWhichPageT    = stats.getMCWhichPageDidYouLikeQuestionsTried();
    const mcWhoLikedPostT = stats.getMCWhoLikedYourPostQuestionsTried();
    const mcWhoMadeT      = stats.getMCWhoMadeThisCommentOnYourPostQuestionsTried();
    const tlSharedT       = stats.getTLWhenDidYouShareThisPostQuestionsTried();
    const geoT            = stats.getGeoWhatCoordinatesWereYouAtQuestionsTried();

    const mcWhichPageC    = stats.getMCWhichPageDidYouLikeCorrect();
    const mcWhoLikedPostC = stats.getMCWhoLikedYourPostCorrect();
    const mcWhoMadeC      = stats.getMCWhoMadeThisCommentOnYourPostCorrect();
    const tlSharedC       = stats.getTLWhenDidYouShareThisPostCorrect();
    const geoC            = stats.getGeoWhatCoordinatesWereYouAtCorrect();

    const mcWhichPage    = mcWhichPageT    === 0 ? 0 : mcWhichPageC    / mcWhichPageT;
    const mcWhoLikedPost = mcWhoLikedPostT === 0 ? 0 : mcWhoLikedPostC / mcWhoLikedPostT;
    const mcWhoMade      = mcWhoMadeT      === 0 ? 0 : mcWhoMadeC      / mcWhoMadeT;
    const tlShared       = tlSharedT       === 0 ? 0 : tlSharedC       / tlSharedT;
    const geo            = geoT            === 0 ? 0 : geoC            / geoT;

    const values  = [ mcWhichPage, mcWhoLikedPost, mcWhoMade, tlShared, geo ].map(x => (+x.toFixed(2)) * 100);
    const barData = {
        labels   : [ 'WPDYL', 'WLYP', 'WMTC', 'WDYSTP', 'AWCDYSTP' ],
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
        <h3>Percentage of correctly answered questions, by type</h3>
        <Chart.Bar data={stats.barData} options={chartOptions} width="400" height="400" />
      </div>
    );
  }


});


