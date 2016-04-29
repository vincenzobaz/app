
'use strict';

import {Routes} from '../../../common/Routes';
import {FacebookStore} from '../stores/FacebookStore';
import {renderIcon} from '../helpers/renderIcon';
import {Page} from "./facebook/Page";


interface FacebookPictureProps {
  facebookId: string;
  altText: string;
  value?: string;
  FacebookId?: string | number;
}

interface FacebookPictureState {
  imageUrl: string;
}

export class FacebookPicture extends React.Component<FacebookPictureProps, FacebookPictureState> {

constructor(props: FacebookPictureProps) {
  super(props);
  this.state = {
    imageUrl: Routes.Facebook.avatar(this.props.value, { type: 'square' })
  };
}

  componentDidMount() {
    FacebookStore.getAvatar(this.props.facebookId).then(imageUrl => {
      this.setState({
        imageUrl: imageUrl
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.facebookId !== this.props.FacebookId ||
           nextState.imageUrl !== this.state.imageUrl;
  }


  render() {
    // return <img url={this.state.imageUrl} alt={this.props.altText} />;
    return renderIcon(this.state.imageUrl, 40, 40);
  }
}

interface DefaultProps {
  pageId: string;
  text: string;
  value: string;
}
export class Default extends React.Component<DefaultProps, any> {


  render() {
    return <span>{this.props.text}</span>;
  }
}

interface FacebookIdProps {
  fbId: string;
  text: string;
}

export class FacebookId extends React.Component<FacebookIdProps, any> {

  render() {
    return (
      <span>
        {this.renderIcon()}
        {this.props.text}
      </span>
    );
  }

  renderIcon() {
    return <FacebookPicture facebookId={this.props.fbId}
                            altText={this.props.text} />;
  }
}

const mapping = {
  fb: FacebookId,
  page: Page,
  default: Default
};
interface PropsProps {
  fbId: string;
  pageId: string;
  text: string;
  value: string;
}
export class Prop extends React.Component<PropsProps, any> {



  render() {
    var type;
    if (this.props.fbId) {
      type = 'fb';
    } else if (this.props.pageId) {
      type = 'page';
    } else {
      type = 'default';
    }

    if (!mapping[type]) {
      type = 'default';
    }

    return React.createElement(mapping[type], this.props, null);
  }
}


