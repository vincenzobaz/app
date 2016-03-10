import {Game} from "../../models/Game";
import {Tile} from "../../../../common/models/Tile";
import {AnswerStore} from "../../stores/AnswerStore";

interface TimeUpProps {
  game: Game;
  tile: Tile;
  onSent?: Function;
  onSendError?: Function;
}

export class TimeUp extends React.Component<TimeUpProps, {}>{

  getDefaultProps() {
    return {
      onSent: () => {
      },
      onSendError: () => {
      }
    };
  }

  getInitialState() {
    return {
      sent: false,
      error: null
    };
  }

  componentDidMount() {
    this.sendTimeUp();
  }

  sendTimeUp() {
    AnswerStore
        .timeOut(this.props.game, this.props.tile)
        .then(res => {
          if (!res || res.status !== "success") {
            this.setState({
              sent: true,
              error: false,
              results: null
            });

            return;
          }

          this.setState({
            sent: true,
            error: false,
            results: res.data
          });

          this.props.onSent();
        });
  }

  render() {
    return (
        <div>Sorry your time is up!</div>
    );
  }

}
