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
          {this.state.items.map(item => <li key={item.id}>{item.text} <br> </br>
              <img src='https://scontent.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10407070_732714740110741_588645306290663759_n.png?oh=95bbc1c8263d6b3cf8afbcabf86f5990&oe=55F32E77' height="16px" ></img></li>)}
        </ul>
      );
    }
});

module.exports = SortableList;

