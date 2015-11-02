
'use strict';

const fuzzy = require('fuzzy');
const Typeahead = require('react-typeahead').Typeahead;

const FriendsAutocomplete = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      selection: null,
    };
  },

  handleSelect(selection) {
    console.log(selection);
    this.setState({
      selection: selection,
    });

    this.props.onSelect(selection);
  },

  render() {
    return (
      <div className="friends-autocomplete">
        <Typeahead
          options={R.Store.FriendStore.friendsWithUserId()}
          placeholder="Pick a friend…"
          maxVisible={10}
          onOptionSelected={this.handleSelect}
          filterOption={this.friendMatchingQuery}
          displayOption="name"
          customListComponent={FriendsList}
          defaultClassNames={false}
          className="rf-combobox"
        />
      </div>
    );
  },

  friendMatchingQuery(query, friend) {
    return fuzzy.test(query, friend.getName());
  }

});

const FriendsList = React.createClass({

  render() {
    return (
      <ul className="rf-combobox-list rf-combobox-is-open">
        {this.props.options.map(this.renderFriend)}
      </ul>
    );
  },

  renderFriend(friend, idx) {
    const selectedClassName = idx === this.props.selectionIndex ? 'rf-combobox-selected' : '';
    return (
      <li className={"rf-combobox-option " + selectedClassName} key={`friend-${idx}`}>
        <div onClick={() => this.props.onOptionSelected(friend)}>
          <img className="img-circle" width="32" height="32" src={this.getProfilePictureUrl(friend)} alt="" />
          {friend.name}
        </div>
      </li>
    );
  },

  // TODO: Add proper profile pictures to bots
  getProfilePictureUrl(friend) {
    if (friend.isBot) {
      return 'http://www.distilnetworks.com/wp-content/themes/distil/images/theft-bot-home.png';
    }

    return `https://graph.facebook.com/${friend.facebookId}/picture`;
  }

});

Reminisce.FriendsAutocomplete = FriendsAutocomplete;

