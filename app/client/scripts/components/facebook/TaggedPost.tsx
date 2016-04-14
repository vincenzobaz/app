
import {Subject}   from "../../../../common/models/questions/common/Subject";
import {UserStore} from "../../stores/UserStore";

interface TaggedPostProps {
  post: Subject;
  children?: any;
}

export class TaggedPost extends React.Component<TaggedPostProps, {}> {

  render() {
    if (this.isSelfPost()) {
      return this.props.children;
    }

    const from = this.props.post.from;

    return (
      <div className="post-tagged">
        <div className="post-tagged-by">
          <span>{from.userName}</span> tagged you in that post:
        </div>
        <div className="post-tagged-post">
          {this.props.children}
        </div>
      </div>
    );
  }

  isSelfPost(): boolean {
    const user = UserStore.current();

    if (!user || this.props.post.from == null) {
      return true;
    }

    return user.facebookId === this.props.post.from.userId;
  }

}

