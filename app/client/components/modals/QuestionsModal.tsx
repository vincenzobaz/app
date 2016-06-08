'use strict';

import {ErrorStore} from '../../stores/ErrorStore';
import {progressImage} from '../../helpers/progressImage';
import {TimeLeft} from '../TimeLeft';
import {MultipleChoice} from '../questions/MultipleChoice';
import {Timeline} from '../questions/Timeline';
import {Geo} from '../questions/Geo';
import {Reorder} from '../questions/Reorder';
import {Game} from "../../models/Game";
import Question from "../../../common/models/Question";
import {Modal} from 'react-bootstrap';
import {TimeUp} from "./TimeUp";
import {Done} from "./Done";
import {Tile} from "../../../common/models/Tile";
import {KIND} from "../../../common/models/questions/common/Kind";
import {QuestionTimer} from "../../helpers/QuestionTimer";
import {QuestionFactory} from "../../../common/models/questions/QuestionFactory";
import {Button, Row, Col} from 'react-bootstrap';
import {RunConfig, ENVIRONMENT} from "../../helpers/RunConfig";
import {StateCollector} from "../../StateCollector";



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
  lookingAtAnswers?: boolean;
  timeIsUp?: boolean;
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
      tile: props.tile,
      lookingAtAnswers: props.tile.answered,
      timeIsUp: false
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
    StateCollector.setQuestion(this.props.questions[this.state.step]);
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
      console.error(`Unknown question kind: ${kind}. Available kinds:` + KIND);
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
        done: true,
        step: 0
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
      done: this.state.done,
      timeIsUp: true
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
    const allowClosing = RunConfig.env != ENVIRONMENT.Production || this.state.lookingAtAnswers || this.state.timeIsUp;
    //true indicated the modal can be dismissed if clicked in the background
    const backdrop = allowClosing ? true : "static";
    return (
      <Modal enforceFocus={false} show={this.state.showModal} onHide={onHide} backdrop={backdrop}
             keyboard={allowClosing}>
        <Modal.Header closeButton={allowClosing}>
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
      return <span/>;
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
      const onRequestHide = this.onClose.bind(this);
      return (
        <Done game={this.props.game}
              tile={this.state.tile}
              answers={this.state.answers}
              onSent={this.onAnswerReceived.bind(this)}
              onSendError={this.props.onSendError}
              onClose={onRequestHide}
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
    const onHide = this.props.onRequestHide ? this.props.onRequestHide.bind(this) : this.onClose.bind(this);


    if (this.state.timeIsUp) {
      return (
        <Row>
          <Col xsOffset={5} xs={2} >
            <Button className="centered" onClick={onHide} block>OK </Button>
            </Col>
        </Row>
      );
    } else {
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
  }

  renderDoneFooter() {
    let previousDisabled = this.state.step == 0;
    let nextDisabled = this.state.step >= this.steps.length - 1;
    let nextButton = <noscript/>;
    let leftButton = <noscript />;
    if (this.state.done) {
      leftButton = <Button className="question-navigation-button" onClick={this.onClickSeeAnswers.bind(this)}>
        See Answers
      </Button>
    } else {
      leftButton =<Button className="question-navigation-button" disabled={previousDisabled}
                          onClick={this.onClickPrevious.bind(this)}>
        Previous
      </Button>
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
          {leftButton}
          {nextButton}
        </div>
      </div>
    )
  }


  onClickSeeAnswers() {
    this.setState({
      step: 0,
      done: false,
      lookingAtAnswers: true
    });
  }

  onClickNext() {
    this.nextStep();
  }

  onClickPrevious() {
    this.previousStep();
  }

  onClose(event: React.MouseEvent) {
    this.setState({showModal: false});
    if (this.props.onRequestHide) {
      this.props.onRequestHide(event);
    }
  }

  onAnswerReceived(tile: Tile) {
    this.setState({
      tile: tile
    });
    this.steps = this.getSteps();
  }

}






