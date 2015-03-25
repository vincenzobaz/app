
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Facebook = require('../helpers/Facebook'),
    throttle = require('lodash.throttle'),
    Autocomplete = require('../third-party/react-autocomplete'),
    Combobox = Autocomplete.Combobox,
    Item = Autocomplete.Option,
    fuzzy = require('fuzzy');

// TODO: Add PropTypes
var FriendsAutocomplete = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      loading: false,
      response: null,
      selection: null,
      query: null
    };
  },

  componentWillUnmount: function() {
    if (this.pendingRequest) {
      this.pendingRequest.abort();
    }
  },

  handleSelect(selection) {
    this.setState({
      selection: selection,
      response: null,
      query: null
    });

    this.props.onSelect(selection);
  },

  handleInput: throttle(function(input) {
    this.setState({
      loading: true,
      response: {items: []},
      selection: null,
      query: input
    }, this.query.bind(this, input));
  }, 700, {leading: false}),

  query(input) {
    if (this.pendingRequest && this.pendingRequest.abort) {
      this.pendingRequest.abort();
    }
    this.pendingRequest = Facebook.getFriends();
    this.pendingRequest.done(friends => {
      this.setState({
        loading: false,
        response: {
          count: friends.length,
          items: friends
        }
      });
    });
  },

  render() {
    return (
      <div className="friends-autocomplete">
        <Combobox autocomplete="list"
                  placeholder="Type a friend’s name"
                  onInput={this.handleInput}
                  onSelect={this.handleSelect}>
          {this.renderMenuContent()}
        </Combobox>
      </div>
    );
  },

  renderMenuContent() {
    if (this.state.loading) {
      return <div style={{padding: '8px'}} aria-live="polite">Searching...</div>;
    }

    if (this.state.response && this.state.response.count > 0) {
      return this.renderComboboxOptions(this.state.response.items);
    }

    if (this.state.query) {
      return <div style={{padding: '8px'}} aria-live="polite">No matches</div>;
    }

    return <noscript />;
  },

  renderComboboxOptions(friends) {
    return this.friendsMatchingQuery(friends, this.state.query)
      .map(item =>
        <Item key={item.id} value={item.id} label={item.name}>
          <img className="img-circle" width="32" src={`https://graph.facebook.com/${item.id}/picture`} alt="" />
          {item.name}
        </Item>
      );
  },

  friendsMatchingQuery(friends, query) {
    if (!query) {
      return friends;
    }

    return friends.filter(f => fuzzy.test(query, f.name));
  }

});


module.exports = FriendsAutocomplete;
