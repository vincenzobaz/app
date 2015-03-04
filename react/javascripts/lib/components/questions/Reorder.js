/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    SortableList = require('../SortableList');

var itemShape = React.PropTypes.shape({
  title: React.PropTypes.string,
  id: React.PropTypes.number
});

var Reorder = React.createClass({

  propTypes: {
    items: React.PropTypes.arrayOf(itemShape).isRequired,
    onDone: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      items: this.props.items
    };
  },

  render() {
    return (
      <div className="question-reorder">
        <h4>What is the correct order?</h4>
        <p>Click and drag the items in the correct order.</p>
        <SortableList items={this.state.items}
                      dragging={this.state.dragging}
                      onUpdate={this._onReorder}
                      renderItem={this._renderItem}
                      className='answers sortable' />
        <Button onClick={this._onDone}>Done</Button>
      </div>
    );
  },

  _renderItem(item) {
    return item.title;
  },

  _onReorder(items, dragging) {
    this.setState({
      items,
      dragging
    });
  },

  _onDone() {
    this.props.onDone({
      items: this.state.items
    });
  }

});

module.exports = Reorder;
