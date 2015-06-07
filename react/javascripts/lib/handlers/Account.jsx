
const React = require('react'),
      Button = require('react-bootstrap').Button,
      Panel = require('react-bootstrap').Panel,
      AccountStore = require('../stores/AccountStore'),
      DeleteAllData = require('../components/account/DeleteAllData'),
      debug = require('debug')('Account');

const Account = React.createClass({

  render() {
    return (
      <div>
        <h2>Account</h2>
        <DeleteAllData />
      </div>
    );
  }

});

module.exports = Account;
