
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    debug = require('debug')('Reorder');

var Reorder = React.createClass({

  propTypes: {
    items: React.PropTypes.arrayOf(R.Shapes.item).isRequired,
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
        <h4>{R.getQuestionTitleByType(this.props.type)}</h4>
        <p>Click and drag the items in the correct order.</p>
        <R.SortableList items={this.props.items} onSort={this.onSort} renderItem={this.renderItem} />
        <Button onClick={this.onDone}>Done</Button>
      </div>
    );
  },

  renderItem(item) {
    if (item.subject) {
      return <R.Post post={item.subject} interactive={false} />;
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

Reminisce.Reorder = Reorder;
