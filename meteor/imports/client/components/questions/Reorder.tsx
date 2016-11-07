
import { debug }                                         from 'util';
import { find, uniqueId }                                from 'lodash';
import { Button }                                        from 'react-bootstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { QuestionProps }                                 from './QuestionProps';
import { Post }                                          from '../facebook/Post';
import { getQuestionTitleByType }                        from '../../helpers/getQuestionTitleByType';
import { Item }                                          from '../../../common/models/questions/common/Item';
import { SubjectType }                                   from '../../../common/models/questions/common/SubjectType';
import { OrderAnswer }                                   from '../../../common/models/questions/answers/OrderAnswer';

interface ReorderProps extends QuestionProps {
  items: Item[];
  renderItem: any;
  userAnswer: OrderAnswer;
  answer: number[];
}

interface ReorderState {
  items: Item[];
}

interface SortableItemProps {
  index: number;
  value: any;
}

const SortableItem = SortableElement((props: SortableItemProps) => {
  return (
    <div className="reorder-item">
      {props.value}
    </div>
  );
});

interface SortableListProps {
  items: any[];
}

const SortableList = SortableContainer((props: SortableListProps) => {
    const { items } = props;

    return (
      <div>
        {items.map((value, index) =>
          <SortableItem key={`item-${index}`} index={index} value={value} />
        )}
      </div>
    );
});

export class Reorder extends React.Component<ReorderProps, ReorderState> {

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
      items = props.answer.map((i: number) =>
        find(items, (item: Item) => item.id == i)
      );
    }
    this.state = {
      items: items
    };
  }

  render() {
    if (this.props.userAnswer == null) {
      const items = this.state.items.map(this.renderItem.bind(this));

      return (
          <div className="question question-reorder">
            <h4>{getQuestionTitleByType(this.props.type.toString())}</h4>
            <h5>Click and drag the items in the correct order.</h5>

            <SortableList
                items={items}
                axis='y'
                lockAxis='y'
                hideSortableGhost={true}
                helperClass='demo-item-helper'
                onSortEnd={this.onSortEnd.bind(this)}
              />

            <Button onClick={this.onDone.bind(this)}>Done</Button>
          </div>
      );
    }

    return (
      <div className="question question-reorder">
        <h4>{getQuestionTitleByType(this.props.type.toString())}</h4>
        <p>Click and drag the items in the correct order.</p>
        {this.state.items.map(item =>
           <div key={uniqueId()} className="reorder-item-static">
             {this.renderItem(item)}
          </div>
        )}
      </div>
    );
  }

  renderItem(item: Item) {
    if (this.props.userAnswer != null && this.props.answer != null) {
      const index: number = this.state.items.indexOf(item);
      const userItem      = this.props.userAnswer.data.items[index];
      const className     = userItem.id == this.state.items[index].id ? 'correct-order': 'wrong-order';

      if (item.subject) {
        return (
          <div className={`${className}` }>
            <Post post={item.subject} interactive={false}/>
          </div>
        );
      }
    } else {
      if (item.subject) {
        return <Post post={item.subject} interactive={false} />;
      }
    }

    return <div>{item.text}</div>;
  }

  onSortEnd({oldIndex, newIndex}) {
    const items = arrayMove(this.state.items, oldIndex, newIndex);
    this.setState({ items });
  }

  onDone() {
    this.props.onDone({
      items: this.state.items
    });
  }

}

