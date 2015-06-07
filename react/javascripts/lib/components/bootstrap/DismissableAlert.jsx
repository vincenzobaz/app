
const React = require('react'),
      Button = require('react-bootstrap').Button,
      Alert = require('react-bootstrap').Alert;

const DismissableAlert = React.createClass({

  /**
   * All properties are passed down to the inner Alert.
   * See https://react-bootstrap.github.io/components.html#alerts
   * for the full documentation.
   */
  propTypes: {
    onDismiss: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onDismiss: this.onDismiss
    };
  },

  getInitialState() {
    return {
      visible: true
    };
  },

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <Alert {...this.props}>
        {this.props.children}
        <p style={{marginBottom: 0}}>
          <Button onClick={this.onDismiss}>Dismiss</Button>
        </p>
      </Alert>
    );
  },

  onDismiss() {
    this.setState({visible: false});
  }

});

module.exports = DismissableAlert;
