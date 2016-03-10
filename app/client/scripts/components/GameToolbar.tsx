

import {GameStore} from './../stores/GameStore';
import {StartGameModal} from './modals/StartGameModal';
import {FriendsAutocomplete} from './FriendsAutocomplete';
import {debug} from "util";
import {Friend} from "../../../common/models/Friend";
import {Game} from "../models/Game";
import {Modal} from "react-bootstrap";
import {Friends} from "../../../common/collections/Friends";



interface GameToolbarProps {
  game: Game;
}

interface GameToolbarState {
  showStartModal: boolean;
  friend: Friend;
  
}

export class GameToolbar extends React.Component<GameToolbarProps, GameToolbarState> {

  constructor(props: GameToolbarProps) {
    super(props);
    this.state = {
      showStartModal: false,
      friend: null
    };
  }

  onFriendSelect(friend) {
    this.setState({
      friend,
      showStartModal: true
    });
  }

  /* eslint no-underscore-dangle: 0 */
  startGame(friend) {
    GameStore.start(friend._id);
  }

  onStart() {
    this.setState({friend: this.state.friend, showStartModal: false});
    this.startGame(this.state.friend);
  }

  onAbortStart() {
    this.setState({
      showStartModal: false,
      friend: null
    });
  }

  onQuit() {
    debug('quit game');
    GameStore.quit(this.props.game);
    Session.set('page', 'home');
  }

  onResume() {
    debug('resume game');
  }

  render() {
    var startModal = null;

    if (this.state.showStartModal && this.state.friend) {
      startModal = <StartGameModal friend={this.state.friend}
                                   onOk={this.onStart.bind(this)}
                                   onCancel={this.onAbortStart.bind(this)} />;
    } 

    return (
      <span>
        <span className='start-game'>
          Start new game with
          &nbsp;
          <FriendsAutocomplete onSelect={this.onFriendSelect.bind(this)} />
          {/* &nbsp; <i className='icon-check-sign'></i> */}
        </span>
        &nbsp;
        {this.renderQuitGameButton()}
        {startModal}
      </span>
    );
  }

  renderQuitGameButton() {
    if (this.props.game == null) {
      return <div></div>;
    }

    return (
      //FIXME: We need to rework all modals due to API change
        <Modal onHide={()=>{console.log("Rework this modal")}}></Modal> 
      // <ModalDialog modal={<QuitGameModal game={this.props.game} onQuit={this.onQuit} onResume={this.onResume} />}>
      //   <a role='button' data-toggle='modal' href='#modal-confirm'>
      //     <i className='icon-signout'></i>
      //     Quit this game
      //   </a>
      // </ModalDialog>
      // <ModalTrigger modal={<QuitGameModal game={this.props.game} onQuit={this.onQuit} onResume={this.onResume} />}>
      //   <a role='button' data-toggle='modal' href='#modal-confirm'>
      //     <i className='icon-signout'></i>
      //     Quit this game
      //   </a>
      // </ModalTrigger>
    );
  }

}

