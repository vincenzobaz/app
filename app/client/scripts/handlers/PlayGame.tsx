
import {ModalManager} from "./../ModalManager";
import {Board} from "./../components/Board";
import {Game} from "../models/Game";

interface PlayGameProps {
  currentGame: Game;
}

export class PlayGame extends React.Component<PlayGameProps, {}> {

  render() {
    const game = this.props.currentGame;
    const gameId = game._id;

    if (this.hasGameEnded()) {
      return (
        <div>
          <Board gameId={gameId} game={game} />
        </div>
      );
    }

    if (this.isPlaying()) {
      return (
        <div>
          <Board gameId={gameId} game={game} />
        </div>
      );
    }

    if (this.isWaiting()) {
      return this.renderWaiting();
    }

    if (this.isCreating()) {
      return this.renderCreating();
    }

    return this.renderNoGame();
  }

  renderNoGame() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return <p style={style}>No game selected.</p>;
  }

  renderCreating() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return (
      <p style={style}>
        This game is still being created, please check again in a few minutes.
      </p>
    );
  }

  renderWaiting() {
    var style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return (
      <p style={style}>
        We are still waiting for your opponent to accept your join request.
      </p>
    );
  }

  isPlaying() {
    return this.withGame(game => {
      return game.isPlaying;
    }, false);
  }

  isCreating() {
    return this.withGame(game => {
      return game.isCreating;
    }, false);
  }

  isWaiting() {
    return this.withGame(game => {
      return game.isWaiting;
    }, false);
  }

  hasGameEnded() {
    return this.withGame((game: Game) => {
      return game.hasEnded;
    }, false);
  }
  
  withGame(fn, defValue): Game {
    var game = this.props.currentGame;

    if (game == null) {
      return defValue;
    }

    return fn(game);
  }

}
