
'use strict';

import {Routes} from './../../../common/Routes';
import {FacebookStore} from './../stores/FacebookStore';
import {renderIcon} from './../boot/helpers/renderIcon';
import {Page} from './Post';

var React = require('react'),
    debug = require('debug');

export const FacebookPicture = React.createClass({
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


export const Default = React.createClass({
  propTypes: {
    pageId: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  render() {
    return <span>{this.props.text}</span>;
  }
});

export const FacebookId = React.createClass({
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

export const Prop = React.createClass({
  propTypes: {
    fbId: React.PropTypes.string,
    pageId: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  mapping: {
    fb: FacebookId,
    page: Page,
    default: Default
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


