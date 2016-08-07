
import { JoinRequestItem, NoJoinRequests } from './JoinRequestItem';
import { JoinRequest }                     from '../models/JoinRequest';

interface JoinRequestsProps {
    requests: JoinRequest[];
}

export class JoinRequestsList extends React.Component<JoinRequestsProps,{}> {

  render() {
    const requests = this.props.requests;

    return (
      <div className='join-requests-panel well'>
        <h4 className='h5'>Join requests</h4>
        <ul className='join-requests'>
          {this.renderRequests(requests)}
        </ul>
      </div>
    );
  }

  renderRequests(requests: JoinRequest[]): JSX.Element | JSX.Element[] {
    if (this.props.requests.length > 0) {
      return requests.map(req  =>
        <JoinRequestItem key={'joinrequest-' + req._id} request={req} />
      );
    }

    return <NoJoinRequests />;
  }

}

