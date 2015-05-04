
'use strict';

var React = require('react'),
    Modal = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button,
    QuestionTimer = require('timer-machine'),
    Questions = require('../questions'),
    TimeLeft = require('../TimeLeft'),
    AnswerStore = require('../../stores/AnswerStore'),
    ErrorStore = require('../../stores/ErrorStore'),
    MultiStepMixin = require('../../mixins/MultiStepMixin'),
    progressImage = require('../../helpers/progressImage'),
    shapes = require('../shapes');

var debug = require('debug')('QuestionsModal');

var nop = () => {};

var QuestionsModal = React.createClass({

  mixins: [MultiStepMixin],

  propTypes: {
    game: shapes.Game.isRequired,
    maxTime: React.PropTypes.number, /* in seconds */
    tile: shapes.Tile,
    questions: React.PropTypes.arrayOf(shapes.Question).isRequired,
    onRequestHide: React.PropTypes.func
  },

  timers: [],

  answers: [],

  getDefaultProps() {
    return {
      maxTime: 120 /* seconds */
    }
  },

  getInitialState() {
    return {
      timeUp: false,
      step: -1,
      answers: []
    };
  },

  getSteps() {
    return this.props.questions.map(this.questionToStep)
                               .filter(q => q != null);
  },

  questionToStep(q) {
    const kind = q.getKind();

    if (!Questions[kind]) {
      ErrorStore.emitError(new Error(`Unknown question kind: ${kind}`));
      return null;
    }

    q.onDone = this.onAnswer;

    return React.createElement(Questions[kind], q);
  },

  getTimers() {
    return this.props.questions.map(q => {
      return new QuestionTimer();
    });
  },

  componentWillMount() {
    this.initSteps(this.getSteps());
    this.timers = this.getTimers();
    this.nextQuestion();
  },

  nextQuestion() {
    this.timers[this.state.step + 1].start();
    this.nextStep();
  },

  isDone() {
    return this.state.answers.length === this.props.questions.length;
  },

  isTimeUp() {
    return this.state.timeUp;
  },

  onTimeUp() {
    this.setState({
      timeUp: true
    });
  },

  onAnswer(answer) {
    debug('answer', answer);

    var timer = this.timers[this.state.step];

    timer.stop();

    this.state.answers.push({
      questionId: this.props.questions[this.state.step].id,
      data: answer,
      timeSpent: timer.time()
    });

    debug('answers', this.state.answers);

    this.setState({
      done: this.isDone()
    });

    if (!this.isDone()) {
      this.nextQuestion();
    }
  },

  render() {
    return (
      <Modal backdrop={true} animation={true} className='question fullscreen' onRequestHide={nop}>
        <div className='modal-header'>
          {this.renderCloseButton()}
          <h3>
            {this.renderTitle()}
          </h3>
        </div>
        <div className='modal-body'>
          {this.renderBody()}
        </div>
        <div className='modal-footer'>
          {this.renderFooter()}
        </div>
      </Modal>
    );
  },

  renderCloseButton() {
    if (!this.isDone() && !this.isTimeUp()) {
      return <span></span>;
    }

    return (
      <span className='close' role='button' data-dismiss='modal' aria-hidden='true' onClick={this.props.onRequestHide}>
        <i className='icon-remove-sign icon-2x'></i>
      </span>
    );
  },

  renderTitle() {
    if (this.isDone()) {
      return 'Tile completed';
    }

    return `Question ${this.state.step + 1} of ${this.steps.length}`;
  },

  renderBody() {
    if (this.isTimeUp()) {
      return <TimeUp tile={this.props.tile} />;
    }

    if (this.isDone()) {
      return <Done game={this.props.game}
                   tile={this.props.tile}
                   answers={this.state.answers}
                   onSent={this.onSent}
                   onSendError={this.onSendError}
                   onClose={this.props.onRequestHide} />;
    }

    return this.renderStep();
  },

  renderFooter() {
    var timeLeftComponent = (this.isDone()) ?
      <span></span> :
      <TimeLeft maxTime={this.props.maxTime} onTimeUp={this.onTimeUp} />;

    return (
      <div className='grid-container'>
        <div className='grid-25'>
          {timeLeftComponent}
        </div>
        <div className='grid-25 prefix-50'>
          <div className='progress'>
            <img src={progressImage(this.state.step, 'red')} alt='' width='22' height='22' />
          </div>
        </div>
      </div>
    );
  }

});

var Done = React.createClass({

  propTypes: {
    game: shapes.Game.isRequired,
    tile: shapes.Tile.isRequired,
    answers: React.PropTypes.arrayOf(shapes.answer).isRequired,
    onSent: React.PropTypes.func,
    onSendError: React.PropTypes.func,
    onClose: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onSent: () => {},
      onSendError: () => {}
    };
  },

  getInitialState() {
    return {
      sent: false,
      error: null
    };
  },

  componentDidMount() {
    this.sendAnswers();
  },

  sendAnswers() {
    AnswerStore
      .send(this.props.game.getId(), this.props.tile, this.props.answers)
      .then(res => {
        if (!res || res.status !== "success") {
          this.setState({
            sent: true,
            error: true,
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
  },

  render() {
    if (!this.state.sent) {
      return <span>Sending answers...</span>;
    }

    if (this.state.error) {
      return <span>{"Sorry, an error occurred and your answers couldn't be submitted."}</span>;
    }

    return this.renderResults();
  },

  renderResults() {
    var results = this.state.results;
    return (
      <div className="question-done">
        <div className="results">
          You got <span className="correct">{results.correct}</span> answers right,
          and <span className="wrong">{results.wrong}</span> wrong.
        </div>
        <div>
          <Button onClick={this.props.onClose}>Close</Button>
        </div>
      </div>
    );
  }

});

var TimeUp = React.createClass({

  propTypes: {
    tile: shapes.Tile.isRequired,
    onSent: React.PropTypes.func,
    onSendError: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onSent: () => {},
      onSendError: () => {}
    };
  },

  getInitialState() {
    return {
      sent: false,
      error: null
    };
  },

  componentDidMount() {
    this.sendTimeUp();
  },

  sendTimeUp() {
    AnswerStore
      .timeOut(this.props.game.getId(), this.props.tile)
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
  },

  render() {
    return (
      <div>Sorry your time is up!</div>
    );
  }

});

module.exports = QuestionsModal;

