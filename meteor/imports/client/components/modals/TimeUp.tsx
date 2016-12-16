import {Game} from "../../models/Game";
import {Tile} from "../../../common/models/Tile";
import {AnswerStore} from "../../stores/AnswerStore";

interface TimeUpProps {
  game: Game;
  tile: Tile;
  onSent?: Function;
  onSendError?: Function;
}

export class TimeUp extends React.Component<TimeUpProps, {}> {

  static defaultProps = {
    onSent: () => {
    },
    onSendError: () => {
    }
  };

  constructor(props: TimeUpProps) {
    super(props);
    this.state = {
      sent: false,
      error: null
    }
  }

  componentDidMount() {
    this.sendTimeUp();
  }

  sendTimeUp() {
    AnswerStore
      .timeOut(this.props.game, this.props.tile)
      .then((res: {status: string, message: string}) => {
        if (!res || res.status !== "success") {
          this.setState({
            sent: true,
            error: true,
            results: res.message
          });

          return;
        }

        this.setState({
          sent: true,
          error: false,
          results: res.message
        });
        if (this.props.onSent) {
          this.props.onSent();
        }
      });
  }

  render() {
    return (
      <div>Sorry your time is up!</div>
    );
  }

}
