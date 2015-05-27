
'use strict';

var React = require('react'),
    shapes = require('./shapes'),
    Zoomable = require('./jquery/Zoomable');

var None = React.createClass({
  render() {
    return <noscript />;
  }
});

var Text = React.createClass({

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

var Picture = React.createClass({

  propTypes: {
    imageUrl: React.PropTypes.string.isRequired,
    text: React.PropTypes.string
  },

  render() {
    var imgStyle = {
      maxHeight: 200
    };

    return (
      <div className="post post-picture">
        <Zoomable url={this.props.imageUrl}>
          <figure className="zoomable">
            <img src={this.props.imageUrl}
                 style={imgStyle}
                 alt="" />
          </figure>
        </Zoomable>
        {this.renderPictureCaption(this.props.text)}
      </div>
    );
  },

  renderPictureCaption(caption) {
    if (caption) {
      return null;
    }

    return (
      <div className="picture-caption">
        {caption}
      </div>
    );
  }

});

const Video = React.createClass({

  propTypes: {
    text: React.PropTypes.string,
    thumbnailUrl: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="post post-video">
        <Text text={this.props.text || ''} />
        <a href={this.props.url} target="_blank">
          <img src={this.props.thumbnailUrl} />
        </a>
      </div>
    );
  }

});

var Comment = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired,
    comment: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div>
        <Text text={this.props.text} />
        <div className="post post-comment">
          <blockquote>{this.props.comment}</blockquote>
        </div>
      </div>
    );
  }

});


const Link = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    thumbnailUrl: React.PropTypes.string
  },

  render() {
    return (
      <div className="post post-link">
        <blockquote>{this.props.text}</blockquote>
        <a href={this.props.url} target="_blank">{this.props.url}</a>
      </div>
    );
  }

});

var Post = React.createClass({

  propTypes: {
    post: shapes.post.isRequired
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
    Link        : Link
  },

  render() {
    if (!this.props.post || !this.props.post.type) {
      return <noscript />;
    }

    var post = this.props.post;

    if (!post) {
      return <None />;
    }

    if (!this.types[post.type]) {
      console.error(`Unknown post type "${post.type}"`);
      return <None />;
    }

    return React.createElement(this.types[post.type], post);
  }

});

module.exports = Post;
