
import {Game} from "../../models/Game";
import {Answer} from "../../models/Answer";
import {debug} from "util";
import {AnswerStore} from "./../../stores/AnswerStore";
import {Tile} from "../../../../common/models/Tile";
import * as Boots from 'react-bootstrap';

interface DoneProps {
  game: Game;
  tile: Tile;
  answers: Answer[];
  onSent: Function;
  onSendError: Function;
  onClose: Function;
}

interface DoneState {
  sent?: boolean;
  error?: boolean;
  result?: Result;
}

export class Done extends React.Component<DoneProps, DoneState> {
  
  constructor(props: DoneProps) {
    super(props);
    this.state = {
      sent: false,
      error: null
    };
  }
  

  componentDidMount() {
    this.sendAnswers();
  }

  sendAnswers() {
    AnswerStore
        .send(this.props.game, this.props.tile, this.props.answers)
        .then((res: Result) => {
          if (!res || res.status !== "success") {
            this.setState({
              sent: true,
              error: true,
            });

            return;
          }

          this.setState({
            sent: true,
            error: false,
            result: res
          });

          this.props.onSent();
        });
  }

  render() {
    if (!this.state.sent) {
      return <span>Sending answers...</span>;
    }

    if (this.state.error) {
      return <span>{"Sorry, an error occurred and your answers couldn't be submitted."}</span>;
    }

    return this.renderResults();
  }

  renderResults() {
    var result = this.state.result;
    return (
        <div className="question-done">
          <div className="results">
              You got <span className="correct">{result.correct}</span> answers right,
            and <span className="wrong">{result.wrong}</span> wrong.
              </div>
          <div>
              <Boots.Button onClick={this.props.onClose}>Close</Boots.Button>
              </div>
        </div>
    );
  }

}
