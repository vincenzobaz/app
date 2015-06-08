
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    SortableList = require('../SortableList'),
    Post = require('../Post'),
    shapes = require('../shapes'),
    debug = require('debug')('Reorder'),
    getQuestionTitleByType = require('./getQuestionTitleByType');


var Reorder = React.createClass({

  propTypes: {
    items: React.PropTypes.arrayOf(shapes.item).isRequired,
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
      //this.state.items = items;
  },

  onDone() {
    this.props.onDone({
      items: this.state.items
    });
  }

});

module.exports = Reorder;
