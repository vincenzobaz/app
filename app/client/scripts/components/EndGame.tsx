'use strict';
import {Game} from "../models/Game";
import * as reactMixin from "react-mixin";
import {Modal} from "react-bootstrap";
var LocalStorageMixin = require('react-localstorage');


export const getEndGameDesc = (game) => {
  return {
    props: {
      game: game
    },
    onDismiss: () => {
    },
    element: EndGame
  };
};

interface EndGameProps {
  game: Game;
}

interface EndGameState {
  hidden: boolean;
}

@reactMixin.decorate(LocalStorageMixin)
export class EndGame extends React.Component<EndGameProps, EndGameState> {

  constructor(props: EndGameProps) {
    super(props);
    this.state = {
      hidden: true
  }
  }

  render() {
    return (
        <Modal show={!this.state.hidden} onHide={this.onRequestHide.bind(this)}>
          <Modal.Title>
              {this.renderTitle()}
              </Modal.Title>
          <Modal.Body>
              {this.renderBody()}
              </Modal.Body>

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
    this.setState({
      hidden: true
    });
  }

}


