import {CommentSubject} from "../../../common/models/questions/common/Subject";
import {Post} from "./Post";

interface CommentProps {
  post: CommentSubject;
  comment: string;
}

export class Comment extends React.Component<CommentProps, {}> {

  render() {
    if (!this.props.comment) {
      return null;
    }

    return (
      <div>
        <Post post={this.props.post} interactive={false} />
        <div className="post post-comment">
          <h5>Comment:</h5>
          <blockquote>{this.props.comment}</blockquote>
        </div>
      </div>
    );
  }

}
