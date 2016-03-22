
import {Friend} from "../../../common/models/Friend";
import {User} from "../models/User";
import {Routes} from "../../../common/Routes";

 

interface PlayerProps {
  player: Meteor.User | Friend | User
  isOpponent: boolean;
  isTurn: boolean;
  waiting: boolean;
  score: number;
}

export class Player extends React.Component<PlayerProps, {}> {


  render() {
    const classNames = this.getClassNames();
    const friend     = this.props.player as Friend;
    const name       = friend.name || this.getName()
    const avatarUrl  = friend.avatarUrl || this.getFacebookAvatar();

    return (
      <div className={classNames.prefix}>
        <div className={classNames.player}>
          <div className="media">
            <a className={classNames.pull} href="">
              <img className="media-object img-circle" width="64" src={avatarUrl} alt="" />
            </a>
            <div className="media-body">
              <h4 className="media-heading">
                <span>{this.props.score}</span>
                <div>{name}</div>
              </h4>
              <p>{this.renderTurnText()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTurnText() {
    if (this.props.waiting || !this.props.isTurn) {
      return 'Waiting';
    }

    return this.props.isOpponent ? 'Their turn' : 'Your turn';
  }

  getClassNames() {
    return {
      pull: 'pull-' + (this.props.isOpponent ? 'right' : 'left'),
      prefix: 'grid-30' + (this.props.isOpponent ? '' : ' prefix-20'),
      player: 'player' + (this.props.isTurn ? ' turn' : '') + (this.props.isOpponent ? ' opponent' : '')
    };
  }

  getName(): string {
    const user = this.props.player as User;
    return user.profile.name;
  }

  getFacebookAvatar(): string {
    const user = this.props.player as User;
    return Routes.Assets.avatars.facebook(user.services.facebook.id);
  }

}
