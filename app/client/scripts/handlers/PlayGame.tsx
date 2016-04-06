
import {ModalManager} from "./../ModalManager";
import {Board} from "./../components/Board";
import {GameResult} from "./../components/GameResult";
import {Game} from "../models/Game";

interface PlayGameProps {
  currentGame: Game;
}

export class PlayGame extends React.Component<PlayGameProps, {}> {

  render() {
    const game = this.props.currentGame;

    if (this.hasGameEnded()) {
      return (
        <div className="play-game play-game-ended">
          <GameResult game={game} />
          <Board game={game} />
        </div>
      );
    }

    if (this.isPlaying()) {
      return (
        <div className="play-game play-game-playing">
          <Board game={game} />
        </div>
      );
    }

    if (this.isWaiting()) {
      return (
        <div className="play-game play-game-waiting">
          {this.renderWaiting()}
        </div>
      );
    }

    if (this.isCreating()) {
      return (
        <div className="play-game play-game-creating">
          {this.renderCreating()}
        </div>
      );
    }

    return (
      <div className="play-game play-game-nogame">
        {this.renderNoGame()}
      </div>
    );
  }

  renderNoGame() {
    const style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return <p style={style}>No game selected.</p>;
  }

  renderCreating() {
    const style = {
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
    const style = {
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
    const game = this.props.currentGame;

    if (game == null) {
      return defValue;
    }

    return fn(game);
  }

}
