
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
    picture: shapes.image.isRequired
  },

  render() {
    var imgStyle = {
      maxHeight: 200
    };

    var picture = this.props.picture;

    return (
      <div className="post post-picture">
        <Zoomable url={picture.url}>
          <figure className="zoomable">
            <img src={picture.url}
                 width={picture.width}
                 height={picture.height}
                 style={imgStyle}
                 alt="" />
          </figure>
        </Zoomable>
        {this.renderPictureCaption(picture)}
      </div>
    );
  },

  renderPictureCaption(picture) {
    if (!picture.caption) {
      return;
    }

    return (
      <div className="picture-caption">
        {picture.caption}
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


var Post = React.createClass({

  propTypes: {
    post: shapes.post.isRequired,
  },

  types: {
    'text'    : Text,
    'comment' : Comment,
    'picture' : Picture,
    'none'    : None
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

    return this.types[post.type](post);
  },

});

module.exports = Post;
