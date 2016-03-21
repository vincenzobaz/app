
'use strict';

import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType'
import {Post} from './../facebook/Post';
import {SortableList} from './../SortableList';
import {debug} from "util";
import {Item} from "../../../../common/models/questions/common/Item";
import {SubjectType} from "../../../../common/models/questions/common/SubjectType";
import {Button} from "react-bootstrap";
import {QuestionProps} from "./QuestionProps";


interface ReorderProps extends QuestionProps {
  items: Item[];
  renderItem: any;
}

interface ReorderState {
  items: Item[];
}

export class Reorder extends React.Component<ReorderProps, ReorderState>{
  
  constructor(props: ReorderProps) {
    super(props);
    this.state = {
      items: this.props.items
    };
  }

  render() {
      return (
      <div className="question question-reorder">
        <h4>{getQuestionTitleByType(this.props.type.toString())}</h4>
        <p>Click and drag the items in the correct order.</p>
        <SortableList items={this.props.items} onSort={this.onSort.bind(this)} renderItem={this.renderItem.bind(this)} />
        <Button onClick={this.onDone.bind(this)}>Done</Button>
      </div>
    );
  }

  renderItem(item) {
    if (item.subject) {
      return <Post post={item.subject} interactive={false} />;
    }

    return item.text;
  }

  onSort(items) {
      this.state.items = items;
  }

  onDone() {
    this.props.onDone({
      items: this.state.items
    });
  }

}

