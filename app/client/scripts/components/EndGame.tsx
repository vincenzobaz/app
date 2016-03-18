'use strict';
import {Game} from "../models/Game";
import {Modal} from "react-bootstrap";
import * as ReactMixin from "react-mixin";

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

export class EndGame extends React.Component<EndGameProps, EndGameState> {

  getLocalStorageKey() {
    return `Game.${this.props.game._id}.EndGame.hidden`;
  }

  isHidden() {
    const hidden = JSON.parse(localStorage.getItem(this.getLocalStorageKey()));
    return hidden != null && hidden != undefined && hidden;
  }

  constructor(props: EndGameProps) {
    super(props);

    this.state = {
      isShown: !this.isHidden()
    };
  }

  componentWillReceiveProps(nextProps: EndGameProps) {
    this.props = nextProps;
    this.setState({ isShown: !this.isHidden() });
  }

  render() {
    const show: boolean = this.state.isShown;

    return (
        <Modal show={show} onHide={this.onRequestHide.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.renderTitle()}</Modal.Title>
          </Modal.Header>
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
    localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(true));

    this.setState({
      isShown: false
    });
  }

}


