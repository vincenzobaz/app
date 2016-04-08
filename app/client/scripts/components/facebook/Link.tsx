
import { TwoColumns } from './layout/TwoColumns';

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
        <TwoColumns>
          {this.renderThumbnail(this.props.thumbnailUrl)}
          {this.renderText(this.props.text)}
        </TwoColumns>
      </div>
    );
  }

  renderText(text) {
    return (
      <div className="post-link-value">
        <blockquote>{text}</blockquote>
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
