import {Zoomable} from "../jquery/Zoomable";
interface PictureProps {
  imageUrl: string;
  text?: string;
  interactive: boolean;
}

export class Picture extends React.Component<PictureProps, {}>{

  constructor(props: PictureProps) {
    super(props);
  }

  render() {
    return (
        <div className="post post-picture">
          {this.renderPicture()}
          {this.renderPictureCaption(this.props.text)}
        </div>
    );
  }

  renderPicture() {
    
    if (this.props.interactive) {
      return (
          <Zoomable url="miau">

          </Zoomable>
        // <Zoomable url={this.props.imageUrl}>
        //   <figure className="zoomable">
        //     <img src={this.props.imageUrl} alt="" />
        //   </figure>
        // </Zoomable>
      );
    }

    return <img draggable={false} src={this.props.imageUrl} alt="" />;
  }

  renderPictureCaption(caption) {
    if (!caption) {
      return null;
    }

    return (
        <div className="picture-caption">
          {caption}
        </div>
    );
  }

}
