
import { decorate }              from 'react-mixin';

import { JoinRequestsList }      from '../components/JoinRequestsList';
import { getAppState, AppState } from '../appState';

@decorate(ReactMeteorData)
export class Requests extends React.Component<{}, {}> {

  data: AppState;

  getMeteorData() {
    return getAppState();
  }

  render() {
    return <JoinRequestsList requests={this.data.joinRequests} />;
  }

}

