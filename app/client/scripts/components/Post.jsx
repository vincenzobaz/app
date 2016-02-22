
'use strict';

import {Zoomable} from './../components/jquery/Zoomable';
import {Shapes} from './../boot/helpers/shapes';


const React = require('react');

export const None = React.createClass({
  render() {
    return <noscript />;
  }
});

export const Text = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="post post-text">
        <blockquote>{this.props.text}</blockquote>
      </div>
    );
  }

});

export const Picture = React.createClass({

  propTypes: {
    imageUrl    : React.PropTypes.string.isRequired,
    text        : React.PropTypes.string,
    interactive : React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      interactive: true
    };
  },

  render() {
    return (
      <div className="post post-picture">
        {this.renderPicture()}
        {this.renderPictureCaption(this.props.text)}
      </div>
    );
  },

  renderPicture() {
    if (this.props.interactive) {
      return (
        <Zoomable url={this.props.imageUrl}>
          <figure className="zoomable">
            <img src={this.props.imageUrl} alt="" />
          </figure>
        </Zoomable>
      );
    }

    return <img src={this.props.imageUrl} alt="" />;
  },

  renderPictureCaption(caption) {
    if (!caption) {
      return null;
    }

    return (
      <div className="picture-caption">
        {caption}
      </div>
    );
  }

});

export const Video = React.createClass({

  propTypes: {
    text         : React.PropTypes.string,
    thumbnailUrl : React.PropTypes.string.isRequired,
    url          : React.PropTypes.string.isRequired
  },

  render() {
    const text = (this.props.text && this.props.text != this.props.url) ? this.props.url : '';

    return (
      <div className="post post-video">
        <Text text={text} />
        <a href={this.props.url} target="_blank">
          <img src={this.props.thumbnailUrl} className="post-video-thumbnail" />
          <div>{this.props.url}</div>
        </a>
      </div>
    );
  }

});

export const Comment = React.createClass({

  propTypes: {
    post    : Shapes.subject.isRequired,
    comment : React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div>
        <Post post={this.props.post} />
        <div className="post post-comment">
          <blockquote>{this.props.comment}</blockquote>
        </div>
      </div>
    );
  }

});


export const Link = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    thumbnailUrl: React.PropTypes.string
  },

  render() {
    return (
      <div className="post post-link">
        <blockquote>{this.props.text}</blockquote>
        {this.renderThumbnail(this.props.thumbnailUrl)}
        <div>
          <a href={this.props.url} target="_blank">{this.props.url}</a>
        </div>
      </div>
    );
  },

  renderThumbnail(url) {
    if (!url) {
      return null;
    }

    return <img src={url} className="post-link-thumbnail" />;
  }

});

export const Page = React.createClass({

  propTypes: {
    name     : React.PropTypes.string.isRequired,
    pageId   : React.PropTypes.string,
    photoUrl : React.PropTypes.string
  },

  render() {
    return (
      <div className="post post-page">
        {this.renderThumbnail()}
        <span>{this.props.name}</span>
      </div>
    );
  },

  renderThumbnail() {
    if (!this.props.photoUrl) {
      return null;
    }

    return <img src={this.props.photoUrl} className="post-page-thumbnail"/>;
  }

});

export const Post = React.createClass({

  propTypes: {
    post        : Shapes.subject.isRequired,
    interactive : React.PropTypes.bool
  },

  types: {
    TextPost    : Text,
    Text        : Text,
    CommentPost : Comment,
    Comment     : Comment,
    ImagePost   : Picture,
    Image       : Picture,
    VideoPost   : Video,
    Video       : Video,
    LinkPost    : Link,
    Link        : Link,
    Page        : Page,
    PagePost    : Page,
  },

  getDefaultProps() {
    return {
      interactive: true
    };
  },

  render() {
    if (!this.props.post || !this.props.post.type) {
      return <noscript />;
    }

    const post = this.props.post;

    if (!post) {
      return <None />;
    }

    if (!this.types[post.type]) {
      console.error(`Unknown post type "${post.type}"`);
      return <None />;
    }

    post.interactive = this.props.interactive;

    return React.createElement(this.types[post.type], post);
  }

});


