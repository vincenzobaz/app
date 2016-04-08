
import { TwoColumns } from './layout/TwoColumns';
import { Text }       from './Text';

interface VideoProps {
  text?: string;
  thumbnailUrl: string;
  url: string;
}

export class Video extends React.Component<VideoProps, {}> {

  render() {
    return (
      <div className="post post-video">
        <TwoColumns>
          {this.renderThumbnail()}
          <div className="post-video-text">
            <Text text={this.props.text} />
          </div>
        </TwoColumns>
      </div>
    );
  }

  renderThumbnail() {
    if (!this.props.url || !this.props.thumbnailUrl) {
      return null;
    }

    return (
      <div className="post-media">
        <a href={this.props.url} target="_blank">
          <img draggable={false} src={this.props.thumbnailUrl} alt="" />
          <div className="post-video-url">{this.props.url}</div>
        </a>
      </div>
    );
  }

}

