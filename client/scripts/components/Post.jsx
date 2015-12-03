
'use strict';

const React = require('react');

const None = React.createClass({
  render() {
    return <noscript />;
  }
});

const Text = React.createClass({

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

const Picture = React.createClass({

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
        <R.Zoomable url={this.props.imageUrl}>
          <figure className="zoomable">
            <img src={this.props.imageUrl} alt="" />
          </figure>
        </R.Zoomable>
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

const Video = React.createClass({

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
          <img src={this.props.thumbnailUrl} />
          <br />
          {this.props.url}
        </a>
      </div>
    );
  }

});

const Comment = React.createClass({

  propTypes: {
    post    : R.Shapes.subject.isRequired,
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

const Page = React.createClass({

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

    return <img src={this.props.photoUrl} />;
  }

});

const Post = React.createClass({

  propTypes: {
    post        : R.Shapes.subject.isRequired,
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
    console.log("Post", this.props);

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

Reminisce.Post = Post;

