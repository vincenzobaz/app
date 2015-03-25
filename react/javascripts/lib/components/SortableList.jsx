
'use strict';

var React = require('react');
var SortableItem = require('react-sortable-bis').SortableItem;

var id = function(x) { return x; };
var nop = function() {};

var SortableList = React.createClass({

  propTypes: {
    items: React.PropTypes.array.isRequired,
    dragging: React.PropTypes.number,
    listTag: React.PropTypes.string,
    itemTag: React.PropTypes.string,
    renderItem: React.PropTypes.func,
    onUpdate: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      listTag: 'ul',
      itemTag: 'li',
      renderItem: id,
      onUpdate: nop
    };
  },

  render() {
    var items = this.props.items.map((item, i) => {
      var renderedItem = this.props.renderItem(item);
      return <SortableItem tagName={this.props.itemTag}
                           onSortUpdate={this.props.onUpdate}
                           items={this.props.items}
                           dragging={this.props.dragging}
                           key={i}
                           item={renderedItem} />;
    }, this);

    return this.transferPropsTo(
      React.DOM[this.props.listTag](null, items)
    );
  }

});

module.exports = SortableList;
