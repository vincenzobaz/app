
import {GenericErrorModal} from './modals/GenericErrorModal';
import {TurnErrorModal}    from './modals/TurnErrorModal';
import {NetworkErrorModal} from './modals/NetworkErrorModal';
import {ErrorStore}        from '../stores/ErrorStore';

interface ErrorHandlerProps {
  store: ErrorStore;
}

interface ErrorHandlerState {
  currentError: any,
  pendingErrors?: any[];
  isModalOpen: boolean;
}

export class ErrorHandler extends React.Component<ErrorHandlerProps, ErrorHandlerState> {

  interval: any;
  modals: any;

  constructor(props: ErrorHandlerProps) {
    super(props);

    this.modals = {
      Turn:    TurnErrorModal,
      Generic: GenericErrorModal,
      Network: NetworkErrorModal
    };

    this.state = {
      currentError: null,
      pendingErrors: [],
      isModalOpen: false
    };
  }

  componentWillMount() {
    this.props.store.on('error', this.onNewError.bind(this));
    this.interval = setInterval(this.showNextError, 1000);
  }

  componentWillUnmount() {
    this.props.store.off('error', this.onNewError.bind(this));
    clearInterval(this.interval);
  }

  onNewError(e) {
    this.state.pendingErrors.push(e);
    this.showNextError();
  }

  showNextError() {
    if (!this.state.isModalOpen && this.hasPending()) {
      var error = this.state.pendingErrors.shift();
      this.setState({
        currentError: error,
        isModalOpen: true
      });
    }
  }

  dismiss() {
    this.setState({
      currentError: null,
      isModalOpen: false
    });
  }

  hasPending() {
    return this.state.pendingErrors.length > 0;
  }

  render() {
    if (!this.state.isModalOpen) {
      return null;
    }

    var Modal = this.modals[this.state.currentError.type];

    if (typeof Modal !== 'function') {
      Modal = GenericErrorModal;
    }

    return (
      <Modal enforceFocus={false}
             onRequestHide={this.dismiss.bind(this)}
             error={this.state.currentError} />
    );
  }

}

