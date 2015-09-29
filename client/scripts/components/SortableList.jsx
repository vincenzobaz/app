const React = require('react'),
      SortableMixin = require('sortablejs/react-sortable-mixin');

const SortableList = React.createClass({

    mixins: [SortableMixin],

    propTypes: {
      items: React.PropTypes.array.isRequired,
      onSort: React.PropTypes.func.isRequired,
      renderItem: React.PropTypes.func.isRequired
    },

    getInitialState() {
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
          {this.state.items.map(this.renderItem)}
        </ul>
      );
    },

    renderItem(item) {
      return <li key={item.id}>{this.props.renderItem(item)}</li>;
    }
});

Reminisce.SortableList = SortableList;

