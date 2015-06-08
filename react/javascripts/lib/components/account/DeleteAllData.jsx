
const React = require('react'),
      Button = require('react-bootstrap').Button,
      Panel = require('react-bootstrap').Panel,
      DismissableAlert = require('../bootstrap/DismissableAlert'),
      AccountStore = require('../../stores/AccountStore'),
      debug = require('debug')('DeleteAllData');

const DeleteAllData = React.createClass({

  getInitialState() {
    return {
      showResult: false,
      result: null
    };
  },

  render() {
    return (
      <Panel header="Manage your data" bsStyle='danger'>
        <p>You can delete all the data we fetched from Facebook regarding your account by clicking the button below.</p>
        <Button bsStyle='danger' onClick={this.onDeleteData}>Delete all my data</Button>
        {this.renderResult()}
      </Panel>
    );
  },

  renderResult() {
    if (!this.state.showResult) {
      return null;
    }

    if (this.state.result === 'success') {
      return (
        <DismissableAlert bsStyle='warning' style={{marginTop: 20}}>
          <h4>Success!</h4>
          <p style={{marginTop: 10, marginBottom: 10}}>
            Your data has been successfully deleted.
          </p>
        </DismissableAlert>
      );
    }

    return (
      <DismissableAlert bsStyle='warning' style={{marginTop: 20}}>
        <h4>An error occured.</h4>
        <p style={{marginTop: 10, marginBottom: 10}}>
          We couldn't delete your data.<br />
          Please try again or contact us if the problem persists.
        </p>
      </DismissableAlert>
    );
  },

  onDeleteData(e) {
    e.preventDefault();

    AccountStore.deleteAllData()
      .then(res => {
        console.log(res);
        this.setState({
          showResult: true,
          result: res.status
        });
      })
      .error(err => {
        console.error(err);
        this.setState({
          showResult: true,
          result: 'error'
        });
      });
  }

});

module.exports = DeleteAllData;
