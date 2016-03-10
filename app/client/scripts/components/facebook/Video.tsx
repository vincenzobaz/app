import {Text} from "./Text";

interface VideoProps {
  text?: string;
  thumbnailUrl: string;
  url: string;
}

export class Video extends React.Component<VideoProps, {}> {


  render() {
    const text = (this.props.text && this.props.text != this.props.url) ? this.props.url : '';

    return (
        <div className="post post-video">
          <Text text={text} />
          <a href={this.props.url} target="_blank">
              <img src={this.props.thumbnailUrl} className="post-video-thumbnail" />
              <div>{this.props.url}</div>
              </a>
        </div>
    );
  }

}
