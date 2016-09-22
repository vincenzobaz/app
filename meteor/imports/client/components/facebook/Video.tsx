
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
            {this.renderUrl(this.props.url)}
          </div>
        </TwoColumns>
      </div>
    );
  }

  renderUrl(url) {
    if (!url) {
      return null;
    }

    return (
      <a href={url} target="_blank">
        <div className="post-video-url">{url}</div>
      </a>
    );
  }

  renderThumbnail() {
    if (!this.props.thumbnailUrl) {
      return null;
    }

    return (
      <div className="post-media">
        <img draggable={false} src={this.props.thumbnailUrl} alt="" />
      </div>
    );
  }

}

