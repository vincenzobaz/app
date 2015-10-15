
'use strict';

var React = require('react');

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
    questionModal: R.Shapes.modalDesc.isRequired,
    number: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    opponentId: React.PropTypes.string,
    score: R.Shapes.score.isRequired,
    disabled: React.PropTypes.bool.isRequired
  },

  render() {
    return (
      <div className={this.getCellClassNames()}>
        <R.Tooltip title={this.props.title} placement={this.props.placement}>
          {this.renderTrigger()}
        </R.Tooltip>
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

    R.ModalManager.showModal(this.props.questionModal);
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
    return [
      `icon-${typeToIcon(this.props.type)}`,
      'icon-2x'
    ].join(' ');
  },

  getImageStyle() {
    if (this.props.opponentId) {
      return {
        backgroundImage: `url(${R.Routes.Facebook.avatar(this.props.opponentId)})`,
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

    return R.progressImage(score, color);
  }

});

Reminisce.Tile = Tile;
