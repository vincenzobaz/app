interface PageProps {
  name: string;
  pageId?: string;
  photoUrl?: string;
}

export class Page extends React.Component<PageProps, {}> {

  render() {
    return (
      <div className="post post-page">
        {this.renderThumbnail()}
        <span>{this.props.name}</span>
      </div>
    );
  }

  renderThumbnail() {
    if (!this.props.photoUrl) {
      return null;
    }

    return (
      <div className="post-media">
        <img draggable={false} src={this.props.photoUrl} alt="" />
      </div>
    );
  }

}
