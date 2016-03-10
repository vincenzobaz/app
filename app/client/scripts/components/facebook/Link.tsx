interface LinkProps {
  text: string;
  url: string;
  thumbnailUrl: string;
}

export class Link extends React.Component<LinkProps, {}> {

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
  }

  renderThumbnail(url) {
    if (!url) {
      return null;
    }

    return <img src={url} className="post-link-thumbnail" />;
  }

}
