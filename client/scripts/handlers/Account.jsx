
const React = require('react'),
      Button = require('react-bootstrap').Button,
      Panel = require('react-bootstrap').Panel,
      debug = require('debug')('Account');

const Account = React.createClass({

  render() {
    return (
      <div>
        <h2>Account</h2>
        <R.DeleteAllData />
      </div>
    );
  }

});

Reminisce.Account = Account;
