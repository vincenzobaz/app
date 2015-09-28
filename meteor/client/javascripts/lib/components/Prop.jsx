
'use strict';

var React = require('react'),
    Routes = require('../Routes'),
    renderIcon = require('../helpers/renderIcon'),
    FacebookStore = require('../stores/FacebookStore'),
    debug = require('debug');

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
    pageId: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  render() {
    return <span>{this.props.text}</span>;
  }
});

Props.FacebookId = React.createClass({
  propTypes: {
    fbId: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <span>
        {this.renderIcon()}
        {this.props.text}
      </span>
    );
  },

  renderIcon() {
    return <FacebookPicture facebookId={this.props.fbId}
                            altText={this.props.text} />;
  }
});

Props.Page = Props.FacebookId;

var Prop = React.createClass({
  propTypes: {
    fbId: React.PropTypes.string,
    pageId: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  mapping: {
    fb: Props.FacebookId,
    page: Props.Page,
    default: Props.Default
  },

  render() {
    debug('Prop')(this.props);
    var type;
    if (this.props.fbId) {
      type = 'fb';
    } else if (this.props.pageId) {
      type = 'page';
    } else {
      type = 'default';
    }

    if (!this.mapping[type]) {
      type = 'default';
    }

    return React.createElement(this.mapping[type], this.props, null);
  }
});

Prop.Props = Props;

module.exports = Prop;
