
import {JoinRequest, None} from './JoinRequest';
import * as Model from '../models/JoinRequest';


interface JoinRequestsProps {
    requests: Model.JoinRequest[];
}

export class JoinRequests extends React.Component<JoinRequestsProps,{}> {

  render() {
    return (
      <div className='join-requests-panel well'>
        <h4 className='h5'>Join requests</h4>
        <ul className='join-requests'>
          {this.renderRequests()}
        </ul>
      </div>
    );
  }

  renderRequests(): JSX.Element | JSX.Element[] {
    if (this.props.requests.length > 0) {
      return this.props.requests.map((req: Model.JoinRequest)  =>
        <JoinRequest key={'joinrequest-' + req._id} request={req} />
      );
    }

    return <None />;
  }

}

