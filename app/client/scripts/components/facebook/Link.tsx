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
    if (this.props.answered) {
      return (
          <div>
            <a href={this.props.url} target="_blank">Link</a>
          </div>
      )
    } else {
      return <noscript />
    }
  }

  renderThumbnail(url) {
    if (!url) {
      return null;
    }

    return <img draggable={false} src={url} className="post-link-thumbnail" />;
  }

}
