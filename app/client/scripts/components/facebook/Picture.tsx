
// import {Zoomable} from "../jquery/Zoomable";

import { TwoColumns } from './layout/TwoColumns';

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
    if (!this.props.imageUrl) {
      return null;
    }

    return (
      <div className="post post-picture">
        <TwoColumns>
          {this.renderPicture()}
          {this.renderPictureCaption(this.props.text)}
        </TwoColumns>
      </div>
    );
  }

  renderPicture() {
    if (!this.props.imageUrl) {
      return null;
    }

    // if (this.props.interactive) {
    //   return (
    //     <Zoomable url={this.props.imageUrl}>
    //       <figure className="zoomable">
    //         <img src={this.props.imageUrl} alt="" />
    //       </figure>
    //     </Zoomable>
    //   );
    // }

    return (
      <div className="post-media">
        <img draggable={false} src={this.props.imageUrl} alt="" />
      </div>
    );
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
