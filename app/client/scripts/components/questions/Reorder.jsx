
'use strict';

import {Shapes} from './../../boot/helpers/shapes';
import {getQuestionTitleByType} from './../../boot/helpers/getQuestionTitleByType'
import {Post} from './../Post';
import {SortableList} from './../SortableList';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    debug = require('debug')('Reorder');

export const Reorder = React.createClass({

  propTypes: {
    items: React.PropTypes.arrayOf(Shapes.item).isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      items: this.props.items
    };
  },

  render() {
      debug(this.props);

      return (
      <div className="question question-reorder">
        <h4>{getQuestionTitleByType(this.props.type)}</h4>
        <p>Click and drag the items in the correct order.</p>
        <SortableList items={this.props.items} onSort={this.onSort} renderItem={this.renderItem} />
        <Button onClick={this.onDone}>Done</Button>
      </div>
    );
  },

  renderItem(item) {
    if (item.subject) {
      return <Post post={item.subject} interactive={false} />;
    }

    return item.text;
  },

  onSort(items) {
      this.state.items = items;
  },

  onDone() {
    this.props.onDone({
      items: this.state.items
    });
  }

});

