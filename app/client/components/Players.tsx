
import {Option} from 'option-t';

import {Player} from './Player';
import {Game} from "../models/Game";
import {User} from "../models/User";
import {Routes} from "../../common/Routes";

interface PlayersProps {
  game: Option<Game>;
  user?: User;
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
    const optGame = this.props.game;

    if (optGame.isNone) {
      return <AbsentPlayer />;
    }

    const game        = optGame.unwrap();
    const opponent    = game.opponent;
    const user        = this.props.user;
    const myName      = user.profile.name;
    const myAvatarUrl = Routes.Assets.avatars.facebook(user.services.facebook.id);

    if (opponent == null) {
      return <AbsentPlayer />;
    }

    return (
      <div>
        <Player name={myName}
                avatarUrl={myAvatarUrl}
                isOpponent={false}
                isTurn={game.isMyTurnToPlay}
                score={game.score.me}
                waiting={game.isWaiting} />

        <Player name={opponent.name}
                avatarUrl={opponent.avatarUrl}
                isTurn={!game.isMyTurnToPlay}
                isOpponent={true}
                score={game.score.them}
                waiting={game.isWaiting} />
      </div>
    );
  }
}

export class AbsentPlayer extends React.Component<{}, {}> {
  render() {
    return null;
  }
}

