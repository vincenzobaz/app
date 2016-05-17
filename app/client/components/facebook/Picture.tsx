
import { TwoColumns } from './layout/TwoColumns';
import { Text }       from './Text';

interface PictureProps {
  imageUrl: string;
  thumbnailUrl: string;
  text?: string;
  interactive: boolean;
  onLoad?: Function;
}

export class Picture extends React.Component<PictureProps, {}>{

  private element: any;

  constructor(props: PictureProps) {
    super(props);
  }

  render() {
    const image = this.props.imageUrl || this.props.thumbnailUrl;

    if (image == null) {
      return <Text text={this.props.text}/>;
    }

    return (
      <div className="post post-picture" ref={this.selfRef.bind(this)}>
        <TwoColumns>
          {this.renderPicture(image)}
          {this.renderPictureCaption(this.props.text)}
        </TwoColumns>
      </div>
    );
  }

  renderPicture(imageUrl: string) {
    return (
      <div className="post-media">
        <img onLoad={this.onLoad.bind(this)} draggable={false} src={imageUrl} alt="" />
      </div>
    );
  }

  renderPictureCaption(caption) {
    if (!caption) {
      return <noscript />;
    }

    return (
      <div className="picture-caption">
        {caption}
      </div>
    );
  }

  selfRef(element: any){
    this.element = element;
  }

  onLoad(){
    if(this.props.onLoad) {
      this.props.onLoad();
    }
  }

}

