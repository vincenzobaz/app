
import {Subject}    from "../../../common/models/questions/common/Subject";
import {Picture}    from "./Picture";
import {Video}      from "./Video";
import {Link}       from "./Link";
import {Page}       from "./Page";
import {Text}       from "./Text";
import {Comment}    from "./Comment";
import {TaggedPost} from "./TaggedPost";
import * as _ from 'lodash';


export class None extends React.Component<{}, {}>{
  render() {
    return null;
  }
}

const types =  {
  TextPost    : Text,
  Text        : Text,
  CommentPost : Comment,
  Comment     : Comment,
  ImagePost   : Picture,
  Image       : Picture,
  VideoPost   : Video,
  Video       : Video,
  LinkPost    : Link,
  Link        : Link,
  Page        : Page,
  PagePost    : Page,
  "Reactions": Picture,
};

interface PostProps {
  post: Subject;
  interactive?: boolean;
}

export class Post extends React.Component<PostProps, {}>{

  constructor(props: PostProps) {
    super(props);
  }

  render() {
    if (!this.props.post || !this.props.post.type) {
      return null;
    }

    const post: Subject = this.props.post;

    if (!post) {
      return <None />;
    }

    if (!types[post.type.toString()]) {
      console.error(`Unknown post type "${post.type}"`);
      return <None />;
    }

    post.interactive = this.props.interactive;

    const PostComponent = types[post.type];

    return (
      <TaggedPost post={post}>
        <PostComponent {...post} />
      </TaggedPost>
    );
  }

}


