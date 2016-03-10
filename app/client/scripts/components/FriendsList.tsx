
import {Friend} from "../../../common/models/Friend";
interface FriendsListProps {
  options: Friend[];
  selectionIndex: number;
  onOptionSelected: Function;
}

export class FriendsList extends React.Component<FriendsListProps, {}> {
  
  constructor(props: FriendsListProps) {
    super(props);
  }
  
  render() {
    if (this.props.options.length == 0) {
      return this.renderEmpty();
    }

    return (
        <ul className="rf-combobox-list rf-combobox-is-open">
          {this.props.options.map(this.renderFriend.bind(this))}
        </ul>
    );
  }

  renderEmpty() {
    return (
        <ul className="rf-combobox-list rf-combobox-is-open">
          <li className="rf-combobox-option rf-combobox-disabled">
              No friend matching query found.
              </li>
        </ul>
    );

  }

  renderFriend(friend, idx) {
    const selectedClassName = idx == this.props.selectionIndex ? 'rf-combobox-selected' : '';

    return (
        <li className={"rf-combobox-option " + selectedClassName} key={`friend-${idx}`}>
          <div onClick={() => this.props.onOptionSelected(friend)}>
              <img className="img-circle" width="32" height="32" src={this.getProfilePictureUrl(friend)} alt="" />
              {friend.name}
              </div>
        </li>
    );
  }

  // TODO: Add proper profile pictures to bots
  getProfilePictureUrl(friend) {
    if (friend.isBot) {
      return 'http://www.distilnetworks.com/wp-content/themes/distil/images/theft-bot-home.png';
    }

    return `https://graph.facebook.com/${friend.facebookId}/picture`;
  }

}

