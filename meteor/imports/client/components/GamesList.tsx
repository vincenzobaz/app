import {GameItem, None} from './GameItem';
import {Game} from "../models/Game";
import {Glyphicon, Button} from "react-bootstrap";
import * as _ from 'lodash';


const isCurrent = (g: Game) => !g.hasEnded && !g.hasFailed && !g.isWaiting;
const isWaiting = (g: Game) => g.isWaiting;
const isPast = (g: Game) => g.hasEnded || g.hasFailed;

type GameList = "Current" | "Past" | "Waiting";

const GAME_LIST = {
  Current: "Current" as GameList,
  Past: "Past" as GameList,
  Waiting: "Waiting" as GameList
};

interface GamesListProps {
  games: Game[];
}

interface GameListState {
  gameList?: GameList;
}

export class GamesList extends React.Component<GamesListProps, GameListState> {

  constructor(props: GamesListProps) {
    super(props);

    this.state = {
      gameList: GAME_LIST.Current
    }
  }

  render() {
    const games: Game[] = this.getGameList();
    const currentCount = games.length;


    return (
      <div className='well'>
        <h4 className='h5'>
          {this.renderPreviousNavigation()}
          <span className="game-list-title"> {this.state.gameList} ({currentCount}) </span>
          {this.renderNextNavigation()}
        </h4>
        <ul className={`games`}>
          {this.renderGames(games)}
        </ul>
      </div>
    );
  }

  getGameList() {
    switch (this.state.gameList) {
      case GAME_LIST.Current:
        return this.props.games.filter(g => isCurrent(g));
      case GAME_LIST.Past:
        return this.props.games.filter(g => isPast(g));
      case GAME_LIST.Waiting:
        return this.props.games.filter(g => isWaiting(g))
    }
  }

  onNavigationPrevious() {
    const previousList = this.state.gameList == GAME_LIST.Current ?
      GAME_LIST.Past :
      GAME_LIST.Current;

    this.setState({
      gameList: previousList
    });
  }

  onNavigationNext() {
    const nestList = this.state.gameList == GAME_LIST.Current ?
      GAME_LIST.Waiting :
      GAME_LIST.Current;

    this.setState({
      gameList: nestList
    });
  }

  renderGames(games: Game[]): JSX.Element | JSX.Element[] {
    if (games.length <= 0) {
      return <None />;
    }

    const sortedGames = this.sortGames(games);

    return sortedGames.map((game: Game) =>
      <GameItem key={game._id.toString()} game={game}/>
    );
  }

  sortGames(games: Game[]) {
    const yourTurnGames = _.sortBy( _.filter(games, (g: Game) => g.isMyTurnToPlay), (g: Game) => g.creationTime).reverse();
    const nonTurnGames = _.sortBy( _.filter(games, (g: Game) => !g.isMyTurnToPlay), (g: Game) => g.creationTime).reverse();
    return _.concat(yourTurnGames, nonTurnGames);
  }

  renderPreviousNavigation() {
    let className = '';
    let onClick = () => {};
    if (this.state.gameList == GAME_LIST.Past) {
      className = 'navigation-arrow-disabled';
    } else {
      className = 'navigation-arrow';
      onClick = this.onNavigationPrevious.bind(this)
    }

    return <Glyphicon className={className} glyph="arrow-left"
                      onClick={onClick}/>

  }

  renderNextNavigation() {
    let className = '';
    let onClick = () => {};

    if (this.state.gameList == GAME_LIST.Waiting) {
      className = 'navigation-arrow-disabled';
    } else {
      className = 'navigation-arrow';
      onClick = this.onNavigationNext.bind(this)

    }
    return <Glyphicon className={className} glyph="arrow-right"
                      onClick={onClick}/>

  }


}



