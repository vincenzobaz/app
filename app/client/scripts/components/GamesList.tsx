import {GameItem, None} from './GameItem';
import {Game} from "../models/Game";

interface GamesListProps {
  games: Game[];
  title: string;
  className?: string;
  
}

export class GamesList extends React.Component<GamesListProps, {}> {
  
  constructor(props: GamesListProps) {
    super(props);
    if (!this.props.className) {
      this.props.className = '';
    }
  }
  render() {
    return (
      <div className='well'>
        <h4 className='h5'>{this.props.title}</h4>
        <ul className={`games ${this.props.className}`}>
          {this.renderGames()}
        </ul>
      </div>
    );
  }
  
  renderGames(): JSX.Element | JSX.Element[] {
    if (this.props.games.length <= 0) {
      return <None />;
    }

    const sortedGames = this.sortGames(this.props.games);
    return sortedGames.map((game: Game) =>
      <GameItem key={game._id.toString()} game={game} />
    );
  }

  sortGames(games: Game[]) {
    return _.sortBy(games, (g: Game) => g.creationTime).reverse();
  }

}



