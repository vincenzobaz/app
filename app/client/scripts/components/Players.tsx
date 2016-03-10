
'use strict';

import {Player} from './Player';
import {Game} from "../models/Game";
import {User} from "../models/User";

interface PlayersProps {
  game?: Game;
  user?: User;
  children?: any;
}

export class Players extends React.Component<PlayersProps, {}> {

  render() {
    return (
      <div className="players">
        {this.renderPlayers()}
      </div>
    );
  }

  renderPlayers() {
    if (this.props.children) {
      return this.props.children;
    }

    if (!this.props.game) {
      return <AbsentPlayer />;
    }

    const game = this.props.game;
    const opponent = game.opponent;

    if (opponent == null) {
      return <AbsentPlayer />;
    }

    return (
      <div>
        <Player player={this.props.user} isOpponent={false} isTurn={game.isMyTurnToPlay} score={game.score.me} waiting={game.isWaiting} />
        <Player player={opponent} isTurn={!game.isMyTurnToPlay} isOpponent={true} score={game.score.them} waiting={game.isWaiting} />
      </div>
    );
  }
}

export class AbsentPlayer extends React.Component<{}, {}> {

  render() {
    return <noscript />;
  }
}


