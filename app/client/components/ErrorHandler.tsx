import {GenericErrorModal} from './modals/GenericErrorModal';
import {NetworkErrorModal} from './modals/NetworkErrorModal';
import {_ErrorStore} from "../stores/ErrorStore";


interface ErrorHandlerProps {
  store: _ErrorStore;
}

interface ErrorHandlerState {
  error: _ErrorStore;
  pendingErrors?: any[];
  isModalOpen: boolean;
}

export class ErrorHandler extends React.Component<ErrorHandlerProps, ErrorHandlerState> {

  interval: number;
  modals: any[];

  // modals: {
  //   Generic: GenericErrorModal,
  //   Network: NetworkErrorModal
  // },

  constructor(props: ErrorHandlerProps) {
    super(props);
    this.modals = [GenericErrorModal, NetworkErrorModal];

    this.state = {
      error: props.store,
      pendingErrors: [],
      isModalOpen: false
    };
  }

  componentWillMount() {
    this.props.store.on('error', this.onNewError.bind(this));
    //FIXME: uncertain if interval should be from es6 or from node
    // this.interval = setInterval(this.showNextError, 1000);
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
        error: error,
        isModalOpen: true
      });
    }
  }

  dismiss() {
    this.setState({
      error: null,
      isModalOpen: false
    });
  }

  hasPending() {
    return this.state.pendingErrors.length > 0;
  }

  render() {
    return <noscript />;
  }

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <noscript />;
    }

    var Modal = this.modals[this.state.error.type];

    if (typeof Modal !== 'function') {
      return <noscript />;
    }

    return <Modal enforceFocus={false} onRequestHide={this.dismiss} error={this.state.error}/>;
  }

}
 
