
'use strict';

var React = require('react'),
    Routes = require('../Routes'),
    renderIcon = require('../helpers/renderIcon'),
    FacebookStore = require('../stores/FacebookStore');

var FacebookPicture = React.createClass({
  propTypes: {
    facebookId: React.PropTypes.string.isRequired,
    altText: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      imageUrl: Routes.Facebook.avatar(this.props.value, { type: 'square' }).url
    };
  },

  componentDidMount() {
    FacebookStore.getAvatar(this.props.facebookId).then(imageUrl => {
      this.setState({
        imageUrl: imageUrl
      });
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.facebookId !== this.props.FacebookId ||
           nextState.imageUrl !== this.state.imageUrl;
  },


  render() {
    // return <img url={this.state.imageUrl} alt={this.props.altText} />;
    return renderIcon(this.state.imageUrl, 40, 40);
  }
});

var Props = {};

Props.Default = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  render() {
    return <span>{this.props.text}</span>;
  }
});

Props.FacebookId = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <span>
        {this._renderIcon()}
        {this.props.text}
      </span>
    );
  },

  _renderIcon() {
    if (!this.props.value) {
      return <noscript />;
    }

    return <FacebookPicture facebookId={this.props.value}
                            altText={this.props.text} />;
  }
});

Props.Page = Props.FacebookId;

var Prop = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  mapping: {
    fbid: Props.FacebookId,
    page: Props.Page,
    default: Props.default
  },

  render() {
    var type = this.props.type;

    if (!this.props.type || !this.mapping[this.props.type]) {
      type = 'default';
    }

    return this.mapping[type]({
      text: this.props.text,
      value: this.props.value
    }, null);
  }
});

Prop.Props = Props;

module.exports = Prop;
