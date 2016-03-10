'use strict';

import {GameStore} from './../stores/GameStore';
import {GameStatus, GAME_STATUS} from './../../../common/models/GameStatus';
import {Game} from "../models/Game";
import {Friend} from "../../../common/models/Friend";
import {Score} from "../../../common/models/Score";


interface GameItemProps {
  game: Game;
}

export class GameItem extends React.Component<GameItemProps, {}> {


  render() {
    const game: Game = this.props.game;
    const opponent: Friend = game.opponent as Friend;
    const opponentName = opponent != null ? opponent.name : 'Loading...';
    const avatarUrl = opponent != null ? opponent.avatarUrl : '';
    const classNames = this.getClassNames();

    return (
        <li className={classNames.waiting}>
          <div className='media'>
              <a className='pull-left' title='Switch to this game' href="#" onClick={this.switchToGame(game)}>
                <img className='media-object img-circle' width='40' src={avatarUrl} alt='' />
              </a>
              <div className='media-body'>
                <h5 className='media-heading'>
                    <a title='Switch to this game' onClick={this.switchToGame(game)} href="#">
                      {opponentName}
                    </a>
                    </h5>
                <p>{this.renderDescription()}</p>
              </div>
              </div>
        </li>
    );
  }

  renderDescription() {
    var game = this.props.game;
    var desc = <small></small>;

    switch (game.status) {
      case GAME_STATUS.Creating:
        return <small><b>In creation</b></small>;

      case GAME_STATUS.Waiting:
        return <small><b>Waiting</b></small>;

      case GAME_STATUS.Declined:
        return <small><b>Declined</b></small>;

      case GAME_STATUS.Failed:
        return <small><b>Failed</b></small>;

      case GAME_STATUS.Ended:
        desc = <small><b>Ended</b></small>;
        break;

      case GAME_STATUS.Playing:
        if (game.isMyTurnToPlay) {
          desc = <small><b className='player'>Your turn</b></small>;
        } else {
          desc = <small><b>Their turn</b></small>;
        }
    }

    var score:Score = this.props.game.score;

    return (
        <small>
          <b className='player'>{score.me}</b>
          –
          <b>{score.them}</b>
          &nbsp;
          ({desc})
        </small>
    );
  }
  

  switchToGame(game) {
    return (e) => {
      e.preventDefault();
      GameStore.switchTo(game._id);
    };
  }

  getClassNames() {
    return {
      waiting: this.props.game.isWaiting? 'waiting' : ''
    };
  }
}


export class None extends React.Component<{}, {}> {
  render() {
    var center = {textAlign: 'center'};
    return (
        <li>
          <div className='media'>
              <div className='media-body'>
                <p style={center}>No games</p>
              </div>
              </div>
        </li>
    );
  }
}


