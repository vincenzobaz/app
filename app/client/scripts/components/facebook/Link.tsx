interface LinkProps {
  text: string;
  url: string;
  thumbnailUrl: string;
  answered?: boolean;
}

export class Link extends React.Component<LinkProps, {}> {

  render() {
    return (
      <div className="post post-link">
        <blockquote>{this.props.text}</blockquote>
        {this.renderThumbnail(this.props.thumbnailUrl)}
        {this.renderLink()}
      </div>
    );
  }

  renderLink() {
    if (!this.props.answered) {
      return null;
    }

    return (
      <div>
        <a href={this.props.url} target="_blank">Link</a>
      </div>
    );
  }

  renderThumbnail(url) {
    if (!url) {
      return null;
    }

    return (
      <div className="post-media">
        <img draggable={false} src={url} alt="" />
      </div>
    );
  }

}
