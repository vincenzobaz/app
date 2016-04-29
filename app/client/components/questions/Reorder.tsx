import {getQuestionTitleByType} from '../../helpers/getQuestionTitleByType'
import {Post} from '../facebook/Post';
import {SortableList} from '../SortableList';
import {debug} from "util";
import {Item} from "../../../common/models/questions/common/Item";
import {SubjectType} from "../../../common/models/questions/common/SubjectType";
import {Button} from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";
import {OrderAnswer} from "../../../common/models/questions/answers/OrderAnswer";
import {OrderItem} from "../../../common/models/questions/answers/OrderItem";
import {OrderChoice} from "../../../common/models/questions/order/OrderChoice";


interface ReorderProps extends QuestionProps {
  items: Item[];
  renderItem: any;
  userAnswer: OrderAnswer;
  answer: number[];
}

interface ReorderState {
  items: Item[];
}

export class Reorder extends React.Component<ReorderProps, ReorderState> {

  private userAnswer: Item[];
  
  constructor(props: ReorderProps) {
    super(props);
    this.prepareState(props)
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.prepareState(props);
  }
  
  prepareState(props: ReorderProps) {
    let items = props.items;
    if (props.answer != null && props.userAnswer) {
      items = props.answer.map((i: number) => {return items.find((item: Item) => {return item.id == i})});
    }
    this.state = {
      items: items
    };
  }

  render() {
    if (this.props.userAnswer == null) {
      return (
          <div className="question question-reorder">
            <h4>{getQuestionTitleByType(this.props.type.toString())}</h4>
            <p>Click and drag the items in the correct order.</p>
            <SortableList items={this.state.items} onSort={this.onSort.bind(this)}
                          renderItem={this.renderItem.bind(this)}/>
            <Button onClick={this.onDone.bind(this)}>Done</Button>
          </div>
      );
    } else {
      return (<div className="question question-reorder">
        <h4>{getQuestionTitleByType(this.props.type.toString())}</h4>
        <p>Click and drag the items in the correct order.</p>
        {this.state.items.map((item: Item) => {
          return (
           <div key={_.uniqueId()} className="demo8-item-static">
             {this.renderItem(item)}
          </div>
        )})}
      </div>);
    }

  }

  renderItem(item: Item, onLoad?: Function) {
 
    if (this.props.userAnswer != null && this.props.answer != null) {
      const index: number = this.state.items.indexOf(item);
      const userItem = this.props.userAnswer.data.items[index];
      const className = userItem.id == this.state.items[index].id? "correct-order": "wrong-order";
      if (item.subject) {
        return (<div className={`${className}` }>
        <Post post={item.subject} onLoad={onLoad} interactive={false}/>
        </div>)
      }
    } else {

      if (item.subject) {
        return <Post post={item.subject} onLoad={onLoad} interactive={false} />;
      }
    }

    return <div>item.text</div>;

  }

  onSort(items) {
    this.userAnswer = items;
  }

  onDone() {
    this.props.onDone({
      items: this.userAnswer
    });
  }

}

