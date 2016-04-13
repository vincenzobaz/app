
'use strict';

import Autosuggest from 'react-autosuggest';
import {test}        from 'fuzzy';

import {FriendStore} from './../stores/FriendStore';
import {Friend}      from './../../../common/models/Friend';
import {Routes}      from './../../../common/Routes';

const theme = require('./FriendsSearchbox.css');

interface FriendsSearchboxProps {
  onSelect: Function;
}

interface FriendsSearchboxState {
  value: string;
  friends: Friend[];
}

export class FriendsSearchbox
  extends React.Component<FriendsSearchboxProps, FriendsSearchboxState> {

  constructor(props: FriendsSearchboxProps) {
    super(props);

    this.state = {
      value: '',
      friends: []
    };
  }

  getMatchingFriends(value: string): Friend[] {
    const friends = FriendStore.list();
    return friends.filter(friend => test(value, friend.name));
  }

  loadFriends(value: string) {
    setImmediate(() => {
      if (value !== this.state.value) {
        return;
      }

      const friends = this.getMatchingFriends(value);

      this.setState({
        value: this.state.value,
        friends: friends
      });
    });
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
      friends: this.state.friends
    });
  }

  onFriendSelected(event, { suggestion }) {
    this.setState({
      value: '',
      friends: this.state.friends
    });

    this.props.onSelect(suggestion);
  }

  onFriendsUpdateRequested({ value }) {
    this.loadFriends(value);
  }

  shouldRenderFriends(value: string): boolean {
    return true;
  }

  getFriendValue(friend: Friend): string {
    return friend.name;
  }

  renderFriend(friend: Friend) {
    return (
      <span>
        <img className="img-circle" width="32" height="32"
             src={Routes.Assets.avatarFor(friend)} alt="" />
        {friend.name}
      </span>
    );
  }

  render() {
    const { value, friends } = this.state;

    const inputProps = {
      placeholder: "Type a friend's name…",
      autoFocus: true,
      onChange: this.onChange.bind(this),
      value: value
    };

    return (
      <div className="friends-autocomplete">
        <Autosuggest
          focusInputOnSuggestionClick={false}
          onSuggestionsUpdateRequested={this.onFriendsUpdateRequested.bind(this)}
          shouldRenderSuggestions={this.shouldRenderFriends.bind(this)}
          onSuggestionSelected={this.onFriendSelected.bind(this)}
          getSuggestionValue={this.getFriendValue.bind(this)}
          renderSuggestion={this.renderFriend.bind(this)}
          suggestions={friends}
          inputProps={inputProps}
          theme={theme}
        />
      </div>
    );
  }

  friendMatchingQuery(query: string, friend: Friend): boolean {
    return test(query, friend.name);
  }

}

