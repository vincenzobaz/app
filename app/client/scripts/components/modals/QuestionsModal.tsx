'use strict';

import {ErrorStore} from './../../stores/ErrorStore';
import {progressImage} from './../../boot/helpers/progressImage';
import {TimeLeft} from './../TimeLeft';
import {AnswerStore} from './../../stores/AnswerStore';
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
      showModal: true
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
      step: this.state.step + 1
    });
  }

  isLastStep() {
    return this.state.step == this.steps.length - 1;
  }


  getSteps() {
    return this.props.questions.map(this.questionToStep.bind(this))
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
    this.timers[this.state.step + 1].start();
    this.nextStep();
  }

  isDone() {
    return this.state.answers.length == this.props.questions.length;
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
      done: this.isDone()
    });

    if (!this.isDone()) {
      this.nextQuestion();
    }
  }

  render() {
    const onHide = this.props.onRequestHide? this.props.onRequestHide.bind(this): this.onClose.bind(this);
    return (
        <Modal show={this.state.showModal} onHide={onHide}>
          <Modal.Header>
              <Modal.Title>{this.renderTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {this.renderBody()}
          </Modal.Body>
          <Modal.Footer>
              {this.renderFooter()}
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
      return <TimeUp game={this.props.game} tile={this.props.tile}/>;
    }

    if (this.isDone()) {
      const game = this.props.game;
      const tile = this.props.tile;
      const answers = this.state.answers;
      const onClose = this.props.onClose;
      const sendError = this.props.onSendError;
      const onREquestHide = this.onClose.bind(this);

      return (
        <Done game={this.props.game}
              tile={this.props.tile}
              answers={this.state.answers}
              onSent={this.props.onClose}
              onSendError={this.props.onSendError}
              onClose={onREquestHide}/>
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
                onTimeUp={this.onTimeUp.bind(this)} />
    );
  }

  renderFooter() {
    return (
      <div className='grid-container'>
        <div className='grid-50'>
          {this.renderTimeLeft(this.isDone())}
        </div>
        <div className='grid-50' style={{textAlign: 'right'}}>
          <img src={progressImage(this.state.step + 1, 'red')} alt='' width='22' height='22'/>
        </div>
      </div>
    );
  }

  onClose(event: React.MouseEvent) {
    this.setState({showModal: false});
    if (this.props.onRequestHide) {
      this.props.onRequestHide(event);
    } 
  }

}






