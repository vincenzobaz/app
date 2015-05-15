
'use strict';

var React = require('react'),
    shapes = require('./shapes'),
    GameStore = require('../stores/GameStore');

var CurrentGame = React.createClass({

  propTypes: {
    game: shapes.Game
  },

  render() {
    var game = this.props.game,
        classNames = this.getClassNames();

    return (
      <li className={classNames.waiting}>
        <div className='media'>
          <a className='pull-left' title='Switch to this game' href="#" onClick={this.switchToGame(game)}>
            <img className='media-object img-circle' width='40' src={game.getOpponent().getAvatarUrl()} alt='' />
          </a>
          <div className='media-body'>
            <h5 className='media-heading'>
              <a title='Switch to this game' onClick={this.switchToGame(game)} href="#">
                {game.getOpponent().getFullName()}
              </a>
            </h5>
            <p>{this.renderDescription()}</p>
          </div>
        </div>
      </li>
    );
  },

  renderDescription() {
    var game = this.props.game;
    var desc = <small></small>;

    switch (game.getStatus().toLowerCase()) {
      case GameStatus.Creating:
        return <small>In creation</small>;

      case GameStatus.Waiting:
        return <small>Waiting</small>;

      case GameStatus.Declined:
        return <small>Declined</small>;
        break;

      case GameStatus.Ended:
      case GameStatus.Finished:
        desc = <small><b>Ended</b></small>;
        break;

      case GameStatus.Failed:
        desc = <small><b>Failed</b></small>;
        break;

      case GameStatus.Playing:
        if (game.isMyTurnToPlay()) {
          desc = <small><b className='player'>Your turn</b></small>;
        } else {
          desc = <small><b>Their turn</b></small>;
        }
    }

    var score = this.props.game.getScore() || {};

    return (
      <small>
        <b className='player'>{score.me}</b>
        –
        <b>{score.them}</b>
        &nbsp;
        ({desc})
      </small>
    );
  },

  switchToGame(game) {
    return (e) => {
      e.preventDefault();
      GameStore.switchTo(game.getId());
    };
  },

  getClassNames() {
    return {
      waiting: this.props.game.isWaiting() ? 'waiting' : ''
    };
  }
});

CurrentGame.None = React.createClass({
  render() {
    var center = {textAlign: 'center'};
    return (
      <li>
        <div className='media'>
          <div className='media-body'>
            <p style={center}>No current games</p>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = CurrentGame;
