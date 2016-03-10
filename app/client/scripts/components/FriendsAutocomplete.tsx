
'use strict';

import {FriendStore} from './../stores/FriendStore';
import {Friend} from './../../../common/models/Friend';
import {FriendsList} from "./FriendsList";
import {Typeahead} from "react-typeahead";
const fuzzy = require('fuzzy');


interface FriendsAutocompleteProps {
  onSelect: Function;
  
}

interface FriendsAutocompleteState {
  selection: any;
}

export class FriendsAutocomplete extends React.Component<FriendsAutocompleteProps, FriendsAutocompleteState> {
  
  constructor(props: FriendsAutocompleteProps) {
    super(props);
    this.state = {
      selection: null,
    };
  }

  
  handleSelect(selection) {
    this.setState({
      selection: selection,
    });
  
    this.props.onSelect(selection);
  }

  render() {
    return (
        <div className="friends-autocomplete">
          <Typeahead
              options={FriendStore.friendsWithUserId()}
              placeholder="Type a friend's name…"
              maxVisible={10}
              onOptionSelected={this.handleSelect.bind(this)}
              filterOption={this.friendMatchingQuery}
              displayOption="name"
              customListComponent={FriendsList}
              defaultClassNames={false}
              className="rf-combobox"
              />
        </div>
    );
  }
  friendMatchingQuery(query, friend: Friend) {
    return fuzzy.test(query, friend.name);
  }

}


