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

    return <img width="30px" height="40px" src={this.props.photoUrl} className="post-page-thumbnail"/>;
  }

}
