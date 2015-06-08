const React = require('react'),
      SortableMixin = require('sortablejs/react-sortable-mixin'),
      shapes = require('./shapes');

const SortableList = React.createClass({

    mixins: [SortableMixin],

    propTypes: {
      items: React.PropTypes.arrayOf(shapes.item).isRequired,
      onSort: React.PropTypes.func.isRequired
    },

    getInitialState() {
        console.log("this is the inital sort state", this.props);

        return {
            items: this.props.items
        };
    },

    componentWillReceiveProps(props) {
        this.state.items = props.items;
    },

    handleSort(e) {
      this.props.onSort(this.state.items);
    },

    render() {
        return (
        <ul className="sortable">
          {this.state.items.map(item => <li key={item.id}>{item.text}</li>)}
        </ul>
      );
    }
});

module.exports = SortableList;

