

import * as reactMixin from 'react-mixin';
import {Item} from "../../../common/models/questions/Item";
var SortableMixin = require('./../boot/mixins/SortableMixin');


interface SortableListProps {
  items?: Item[];
  onSort?: Function;
  renderItem?: Function;
}

interface SortableListState {
  items: Item[];
}

// @reactMixin.decorate(SortableMixin)
export class SortableList extends React.Component<SortableListProps, SortableListState> {
  
    constructor(props: SortableListProps) {
      super(props);
      this.state = {
        items: this.props.items
      };
    }
  

    componentWillReceiveProps(props) {
      this.setState({items: this.props.items});
    }

    handleSort(e) {
      this.props.onSort(this.state.items);
    }

    render() {
        return (
        <ul className="sortable">
           {this.state.items.map(this.renderItem.bind(this))}
        </ul>
      );
    }

    renderItem(item) {
      return <li key={item.id}>{this.props.renderItem(item)}</li>;
    }
}


