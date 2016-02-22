import {Shapes} from './../boot/helpers/shapes';
import {GameItem, None} from './GameItem';


export const GamesList = React.createClass({

  propTypes: {
    games: React.PropTypes.arrayOf(Shapes.Game).isRequired,
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      className: ''
    };
  },

  render() {
    return (
      <div className='well'>
        <h4 className='h5'>{this.props.title}</h4>
        <ul className={`games ${this.props.className}`}>
          {this.renderGames()}
        </ul>
      </div>
    );
  },

  renderGames() {
    if (this.props.games.length <= 0) {
      return <None />;
    }

    const sortedGames = this.sortGames(this.props.games);
    return sortedGames.map(game =>
      <GameItem key={game.getId()} game={game} />
    );
  },

  sortGames(games) {
    return _.sortBy(games, g => g.getCreationTime()).reverse();
  }

});

