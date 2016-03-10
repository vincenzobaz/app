import {Subject} from "../../../../common/models/questions/Subject";
import {Post} from "./Post";

interface CommentProps {
  post: Subject;
  comment: string;
}

export class Comment extends React.Component<CommentProps, {}> {

  render() {
    return (
        <div>
          <Post post={this.props.post} interactive={false} />
          <div className="post post-comment">
              <blockquote>{this.props.comment}</blockquote>
              </div>
        </div>
    );
  }

}
