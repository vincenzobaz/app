'use strict';

import {ErrorStore} from './../../stores/ErrorStore';
import {progressImage} from './../../boot/helpers/progressImage';
import {TimeLeft} from './../TimeLeft';
import {MultipleChoice} from './../questions/MultipleChoice';
import {Timeline} from './../questions/Timeline';
import {Geo} from './../questions/Geo';
import {Reorder} from './../questions/Reorder';
import {Game} from "../../models/Game";
import Question from "../../../../common/models/Question";
import {debug} from "util";
import {Modal} from 'react-bootstrap';
import {TimeUp} from "./TimeUp";
import {Done} from "./Done";
import {Tile} from "../../../../common/models/Tile";
import {KIND} from "../../../../common/models/questions/common/Kind";
import {QuestionTimer} from "../../boot/helpers/QuestionTimer";
import {QuestionFactory} from "../../../../common/models/questions/QuestionFactory";
import {Button} from 'react-bootstrap';
import {RunConfig, ENVIRONMENT} from "../../boot/helpers/RunConfig";
// import {Timer} from "timer-machine";


var nop = () => {
};

interface QuestionsModalProps {
  game: Game;
  maxTime?: number;
  tile: Tile;
  questions: Question[];
  onRequestHide: React.EventHandler<React.MouseEvent>;
  onSent?: Function;
  onSendError?: Function;
  onClose?: Function;
}

interface QuestionModalState {
  timeUp?: boolean;
  step?: number;
  answers?: any[];
  done?: boolean;
  showModal?: boolean;
  tile?: Tile;
}


export class QuestionsModal extends React.Component<QuestionsModalProps, QuestionModalState> {

  timers: any[];
  answers: any[];

  steps: any[];
  maxTime: number;

  constructor(props: QuestionsModalProps) {
    super(props);
    this.timers = [];
    this.answers = [];
    this.steps = [];
    this.maxTime = 120;

    this.state = {
      timeUp: false,
      step: -1,
      answers: [],
      showModal: true,
      tile: props.tile
    };
  }


  initSteps(steps) {
    this.steps = steps;

    this.setState({
      step: 0
    });
  }

  renderStep() {
    if (this.state.step >= this.steps.length) {
      throw new Error(`Invalid step ${this.state.step}. There are only ${this.steps.length} steps.`);
    }

    return this.steps[this.state.step];
  }

  nextStep() {

    this.setState({
      step: Math.min(this.state.step + 1, this.state.tile.questions.length),
    });

  }

  previousStep() {
    this.setState({
      step: Math.max(this.state.step - 1, 0)
    });
  }

  isLastStep() {
    return this.state.step == this.steps.length - 1;
  }


  getSteps() {
    return this.state.tile.questions.map(this.questionToStep.bind(this))
        .filter(q => q != null);
  }

  questionToStep(question: Question) {
    const kind = question.kind;

    if (!QuestionFactory.doesQuestionExist(kind)) {
      debug(`Unknown question kind: ${kind}. Available kinds:` + KIND);
      ErrorStore.emitError(new Error(`Unknown question kind: ${kind}`));
      return null;
    }

    let questionProps: any = question as any;
    questionProps.onDone = this.onAnswer.bind(this);

    return React.createElement(this.getQuestionComponentFromType(kind), questionProps);
  }

  getQuestionComponentFromType(kind): React.ComponentClass<any> {
    switch (kind) {
      case KIND.MultipleChoice:
        return MultipleChoice;
      case KIND.Timeline:
        return Timeline;
      case KIND.Order:
        return Reorder;
      case KIND.Geolocation:
        return Geo;
      default:
        throw new Meteor.Error("404", `Unknown question kind: ${kind}`);
    }
  }

  getTimers() {
    return this.props.questions.map(q => {
      return new QuestionTimer();
    });
  }

  componentWillMount() {
    this.initSteps(this.getSteps());
    this.timers = this.getTimers();
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.state.step == this.state.tile.questions.length - 1) {
      this.setState({
        done: true
      });
    } else {
      this.timers[this.state.step + 1].start();
    }

    this.nextStep();

  }

  isDone() {
    return this.state.done;
  }

  isTimeUp() {
    return this.state.timeUp;
  }

  onTimeUp() {
    this.setState({
      timeUp: true,
      step: this.state.step,
      answers: this.state.answers,
      done: this.state.done
    });
  }

  onAnswer(answer) {

    var timer = this.timers[this.state.step];
    timer.stop();

    this.state.answers.push({
      questionId: this.props.questions[this.state.step]._id,
      data: answer,
      timeSpent: timer.time()
    });


    this.setState({
      timeUp: this.state.timeUp,
      step: this.state.step,
      answers: this.state.answers,
    });

    this.nextQuestion();
    
  }

  render() {
    const onHide = this.props.onRequestHide ? this.props.onRequestHide.bind(this) : this.onClose.bind(this);
    const footer = this.state.tile.answered ? this.renderDoneFooter() : this.renderFooter();
    //true indicated the modal can be dismissed if clicked in the background
    const backdrop = RunConfig.env == ENVIRONMENT.Production? "static" :true;
    return (
        <Modal show={this.state.showModal} onHide={onHide} backdrop={backdrop}>
          <Modal.Header>
            <Modal.Title>{this.renderTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderBody()}
          </Modal.Body>
          <Modal.Footer>
            {footer}
          </Modal.Footer>
        </Modal>
    );
  }

  renderCloseButton() {
    if (!this.isDone() && !this.isTimeUp()) {
      return <span></span>;
    }

    return (
        <span className='close' role='button' data-dismiss='modal' aria-hidden='true'
              onClick={this.props.onRequestHide}>
        <i className='icon-remove-sign icon-2x'></i>
      </span>
    );
  }

  renderTitle() {
    if (this.isDone()) {
      return 'Tile completed';
    }

    return `Question ${this.state.step + 1} of ${this.steps.length}`;
  }

  renderBody() {
    if (this.isTimeUp()) {
      return <TimeUp game={this.props.game} tile={this.state.tile}/>;
    }

    if (this.isDone()) {
      const onREquestHide = this.onClose.bind(this);
      return (
          <Done game={this.props.game}
                tile={this.state.tile}
                answers={this.state.answers}
                onSent={this.onAnswerReceived.bind(this)}
                onSendError={this.props.onSendError}
                onClose={onREquestHide}
                onClickPrevious={this.onClickPrevious.bind(this)}
          />
      );
    }

    return this.renderStep();
  }

  renderTimeLeft(isDone) {
    if (isDone) {
      return <span>&nbsp;</span>;
    }

    return (
        <TimeLeft maxTime={this.maxTime}
                  onTimeUp={this.onTimeUp.bind(this)}/>
    );
  }

  renderFooter() {
    return (
        <div className='grid-container'>
          <div className='grid-25'>
            {this.renderTimeLeft(this.isDone())}
          </div>


          <div className='grid-25' style={{textAlign: 'right'}}>
            <img src={progressImage(this.state.step + 1, 'red')} alt='' width='22' height='22'/>
          </div>
        </div>
    );
  }

  renderDoneFooter() {
    let previousDisabled = this.state.step == 0;
    let nextDisabled = this.state.step >= this.steps.length - 1;
    let nextButton = <noscript/>;
    let previousButtonText = "Previous";
    if (this.state.done) {
      previousButtonText = "See answers";
    }
    if (nextDisabled) {
      nextButton = <Button className="question-navigation-button"
                                     onClick={this.onClose.bind(this)}>
        Close
      </Button>;

    } else {
      nextButton = <Button className="question-navigation-button" onClick={this.onClickNext.bind(this)}>
        Next
      </Button>
    }
    
    return (
        <div className='grid-container'>

          <div className="grid-100 question-navigation">
            <Button className="question-navigation-button" disabled={previousDisabled}
                    onClick={this.onClickPrevious.bind(this)}>
              {previousButtonText}
            </Button>
            {nextButton}
          </div>
        </div>
    )
  }

  onClickNext() {
    this.nextStep();
  }

  onClickPrevious() {
    this.previousStep();
    this.state.done = false;
  }

  onClose(event: React.MouseEvent) {
    this.setState({showModal: false});
    if (this.props.onRequestHide) {
      this.props.onRequestHide(event);
    }
  }

  onAnswerReceived(tile: Tile) {
    console.log("we received answer", tile, tile.questions);
    this.setState({
      tile: tile
    });
    this.steps = this.getSteps();
  }

}






