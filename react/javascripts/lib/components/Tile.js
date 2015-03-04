
/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Tooltip = require('./bootstrap/Tooltip'),
    ModalTrigger = require('react-bootstrap').ModalTrigger,
    Routes = require('../Routes'),
    scoreShape = require('./shapes').score,
    cortexShape = require('./shapes').cortex,
    hasToken = require('../helpers/hasToken'),
    AppState = require('../AppState'),
    progressImage = require('../helpers/progressImage');

var Tile = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    placement: React.PropTypes.string.isRequired,
    answered: React.PropTypes.bool.isRequired,
    questionModal: React.PropTypes.component.isRequired,
    number: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    opponentId: React.PropTypes.string,
    score: cortexShape(scoreShape).isRequired,
    wonBy: React.PropTypes.oneOf(['me', 'opponent']),
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
    if (this.isDisabled()) {
      return this.renderButton(false);
    }

    return (
      <ModalTrigger modal={this.props.questionModal}>
        {this.renderButton(true)}
      </ModalTrigger>
    );
  },

  renderButton(enabled) {
    // FIXME: Horrible hack to shut up JSLint.
    var href = enabled ? '#' : 'java script:;'.replace(/\s/, '');
    return (
      <a role='button' href={href}>
        <img src={this.getProgressImage()} alt={this.props.title} style={this.getImageStyle()} />
        <i className={this.getIconClassNames()}></i>
      </a>
    );
  },

  isDisabled() {
    return this.props.answered || this.props.disabled || this.props.wonBy || !hasToken(AppState)();
  },

  getCellClassNames() {
    return [
      'cell',
      `cell-${this.props.number}`,
      this.props.wonBy != null ? `win-${this.props.wonBy}` : '',
      this.props.answered ? 'answered' : '',
      this.isDisabled() ? 'disabled' : '',
      this.props.type
    ].join(' ');
  },

  getIconClassNames() {
    return [
      `icon-${this.props.icon}`,
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
