
import { TwoColumns } from './layout/TwoColumns';

interface PageProps {
  name: string;
  pageId?: string;
  photoUrl?: string;
  onLoad?: Function;
}

export class Page extends React.Component<PageProps, {}> {

  render() {
    return (
      <div className="post post-page">
        <TwoColumns>
          {this.renderThumbnail()}
          {this.props.name}
        </TwoColumns>
      </div>
    );
  }

  renderThumbnail() {
    if (!this.props.photoUrl) {
      return null;
    }

    return (
      <div className="post-media grid-30">
        <img onLoad={this.onLoad.bind(this)} draggable={false} src={this.props.photoUrl} alt="" />
      </div>
    );
  }
  
  onLoad(){
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

}
