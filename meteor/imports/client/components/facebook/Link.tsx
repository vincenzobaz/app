
import { TwoColumns } from './layout/TwoColumns';

const ellipsize = require('ellipsize');

interface LinkProps {
  text: string;
  url: string;
  thumbnailUrl: string;
  answered?: boolean;
  onLoad?: Function;
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
    const link = ellipsize(this.props.url, 60);
    return (
      <div>
        <a href={this.props.url} target="_blank">{link}</a>
      </div>
    );
  }

  renderThumbnail(url) {
    if (!url) {
      return null;
    }

    return (
      <div className="post-media">
        <img draggable={false} src={url} alt="" onLoad={this.onLoad.bind(this)}/>
      </div>
    );
  }

  onLoad() {
    if(this.props.onLoad) {
      this.props.onLoad();
    }
  }

}
