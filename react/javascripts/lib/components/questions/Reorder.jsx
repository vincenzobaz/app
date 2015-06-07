
'use strict';

var React = require('react'),
    Button = require('react-bootstrap').Button,
    SortableList = require('../SortableList'),
    shapes = require('../shapes');

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
    return (
      <div className="question question-reorder">
        <h4>What is the correct order?</h4>
        <p>Click and drag the items in the correct order.</p>
        <SortableList items={this.props.items} onSort={this.onSort} />
        <Button onClick={this.onDone}>Done</Button>
      </div>
    );
  },

  onSort(items) {
    this.setState({
      items: items
    });
  },

  onDone() {
    this.props.onDone({
      items: this.state.items
    });
  }

});

module.exports = Reorder;
