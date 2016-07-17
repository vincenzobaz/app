import {Option}        from 'option-t';

import {Board}          from '../components/Board';
import {GameResult}     from '../components/GameResult';
import {Game}           from '../models/Game';
import {Well} from 'react-bootstrap';

interface PlayGameProps {
  game: Option<Game>;
}

export class PlayGame extends React.Component<PlayGameProps, {}> {

  render() {
    const { game } = this.props;

    return game.map((game: Game) => {
      if (game.hasEnded) {
        return (
          <div className="play-game play-game-ended">
            <GameResult game={game}/>
            <Board game={game}/>
          </div>
        );
      }

      if (game.isPlaying) {
        return (
          <div className="play-game play-game-playing">
            <Board game={game}/>
          </div>
        );
      }

      if (game.isWaiting) {
        return (
          <div className="play-game play-game-waiting">
            {this.renderWaiting() }
          </div>
        );
      }

      if (game.isCreating) {
        return (
          <div className="play-game play-game-creating">
            {this.renderCreating() }
          </div>
        );
      }

      if (game.hasFailed) {
        return (
          <div className="play-game play-game-failing">
            {this.renderFailed()}
          </div>
        );
      }
    }).unwrapOrElse(() => this.renderNoGame());
  }

  renderNoGame() {
    console.log("rendering no game");
    const style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return (
      <div className="play-game play-game-nogame">
        <p style={style}>No game selected.</p>
      </div>
    );
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

  renderFailed() {
    const style = {
      textAlign: 'center',
      lineHeight: '2em',
      marginTop: '3em'
    };

    return (
      <Well>
        <p style={style}>
          Unfortunately the game could not be created due to the lack of activity on facebook from one of players
        </p>
      </Well>
    );
  }

}

