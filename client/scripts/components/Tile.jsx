
'use strict';

var React = require('react'),
    Tooltip = require('./bootstrap/Tooltip'),
    ModalManager = require('../stores/ModalManager'),
    Routes = require('../Routes'),
    shapes = require('./shapes'),
    progressImage = require('../helpers/progressImage');

const icons = {
  Order: 'sort', // 'sort-up'
  MultipleChoice: 'list',
  Timeline: 'time', // 'calendar'
  Geolocation: 'map-marker', // 'geo'
  Misc: 'question'
};

const typeToIcon = (type) =>
  icons[type] || icons.Misc

var Tile = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    placement: React.PropTypes.string.isRequired,
    questionModal: shapes.modalDesc.isRequired,
    number: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    opponentId: React.PropTypes.string,
    score: shapes.score.isRequired,
    disabled: React.PropTypes.bool.isRequired
  },

  render() {
    return (
      <div className={this.getCellClassNames()}>
        <Tooltip title={this.props.title} placement={this.props.placement}>
          {this.renderTrigger()}
        </Tooltip>
      </div>
    );
  },

  renderTrigger() {
    return (
      <a role='button' href='#' onClick={this.onClick}>
        <img src={this.getProgressImage()} alt={this.props.title} style={this.getImageStyle()} />
        <i className={this.getIconClassNames()}></i>
      </a>
    );
  },

  onClick(e) {
    e.preventDefault();

    if (this.isDisabled()) {
      return;
    }

    ModalManager.showModal(this.props.questionModal);
  },

  isDisabled() {
    return this.props.disabled;
  },

  getCellClassNames() {
    return [
      'cell',
      `cell-${this.props.number}`,
      this.isDisabled() ? 'disabled' : '',
      this.props.type
    ].join(' ');
  },

  getIconClassNames() {
    console.log(this.props.type, typeToIcon(this.props.type));
    return [
      `icon-${typeToIcon(this.props.type)}`,
      'icon-2x'
    ].join(' ');
  },

  getImageStyle() {
    if (this.props.opponentId) {
      return {
        backgroundImage: `url(${Routes.Facebook.avatar(this.props.opponentId)})`,
        backgroundSize: '76px 76px'
      };
    }

    return {};
  },

  getProgressImage() {
    var sub = this.props.score,
        max = (sub.me >= sub.them) ? 'me' : 'them',
        color = (max === 'me') ? 'red' : 'blue',
        score = parseInt(sub[max], 10);

    return progressImage(score, color);
  }

});

module.exports = Tile;
