
import EventEmitter = NodeJS.EventEmitter;

interface ModalHandlerProps {
  store: EventEmiterProps;
}

interface ModalHanlderState {
  modal: any;
  isOpen: boolean;
}

export class ModalHandler extends React.Component<ModalHandlerProps, ModalHanlderState> {

  constructor(props: ModalHandlerProps) {
    super(props);
    this.state = {
      modal: null,
      isOpen: false
    };
  }

  
  componentDidMount() {
    this.props.store.on('modal', this.onNewModal.bind(this));
    console.log('subscribed');
  }
  
  componentWillUnmount() {
    this.props.store.off('modal', this.onNewModal.bind(this));
    console.log('unsubscribed');
  }
  
  onNewModal(modal) {
    this.setState({
      modal: modal,
      isOpen: true
    });
  }
  
  render() {
    if (this.state.modal) {
      const modal = this.state.modal;
      modal.props.onRequestHide = this.dismiss.bind(this);
      const Modal = modal.element;
      const props = modal.props;
      return (
          <Modal  {...props}/>
      );
    } else {
      return <noscript/>;
    }
  }
  
  dismiss(callback) {
      this.setState({
        modal: null,
        isOpen: false
      });
  
      if (typeof callback == 'function') {
        callback();
      }
  }

}
