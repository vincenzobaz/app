'use strict';
import {Game} from "../models/Game";
import {Modal} from "react-bootstrap";
import * as reactMixin from "react-mixin";
var LocalStorageMixin = require('react-localstorage');


export const getEndGameDesc = (game) => {
  return {
    props: {
      game: game,
      isShown: true,
    },
    onDismiss: () => {
    },
    element: EndGame
  };
};

interface EndGameProps {
  game: Game;
  key?: string;
}

interface EndGameState {
  isShown: boolean;
}

@reactMixin.decorate(LocalStorageMixin)

export class EndGame extends React.Component<EndGameProps, EndGameState> {

  constructor(props: EndGameProps) {
    super(props);
    this.state = {
      isShown: true
    }
  }

  componentWillReceiveProps(nextProps: EndGameProps) {
    this.props = nextProps;
    this.setState({isShown: true});
  }

  render() {
    const show: boolean = this.state.isShown;
    return (
        <Modal show={show} onHide={this.onRequestHide.bind(this)}>
          <Modal.Title>{this.renderTitle()}</Modal.Title>
          <Modal.Body>{this.renderBody()}</Modal.Body>

        </Modal>
        
        
    );
  }

  renderTitle() {
    if (this.props.game.isDraw) {
      return "It's a draw!";
    }

    if (this.props.game.isWon) {
      return 'You won!';
    }

    return 'Aww, you lost.';
  }


  renderBody() {
    if (this.props.game.isDraw) {
      return (
          <div>
            <p>Nobody won, but nobody lost either</p>
          </div>
      );
    } else if (this.props.game.isWon) {
      return (
          <div>
            <p>Congratulations, you have won the game!</p>
          </div>
      );
    } else {
      return (
          <div>
            <p>Sorry, you have lost the game.</p>
          </div>
      );
    }
  }

  onRequestHide() {
    console.log("we are requested to hide in End Game")
    this.setState({
      isShown: false
    });
  }

}


