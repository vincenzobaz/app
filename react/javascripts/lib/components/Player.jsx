
'use strict';

var React = require('react'),
    shapes = require('./shapes');

var Player = React.createClass({

  propTypes: {
    player: shapes.User.isRequired,
    isOpponent: React.PropTypes.bool,
    isTurn: React.PropTypes.bool.isRequired,
    waiting: React.PropTypes.bool.isRequired,
    score: React.PropTypes.number.isRequired
  },

  render() {
    var classNames = this.getClassNames();
    return (
      <div className={classNames.prefix}>
        <div className={classNames.player}>
          <div className="media">
            <a className={classNames.pull} href="">
              <img className="media-object img-circle" width="64" src={this.props.player.getAvatarUrl()} alt="" />
            </a>
            <div className="media-body">
              <h4 className="media-heading">
                <span>{this.props.score}</span>
                <div>{this.props.player.getFullName()}</div>
              </h4>
              <p>{this.renderTurnText()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderTurnText() {
    if (this.props.waiting || !this.props.isTurn) {
      return 'Waiting';
    }

    return this.props.isOpponent ? 'Their turn' : 'Your turn';
  },

  getClassNames() {
    return {
      pull: 'pull-' + (this.props.isOpponent ? 'right' : 'left'),
      prefix: 'grid-30' + (this.props.isOpponent ? '' : ' prefix-20'),
      player: 'player' + (this.props.isTurn ? ' turn' : '') + (this.props.isOpponent ? ' opponent' : '')
    };
  }

});

module.exports = Player;
