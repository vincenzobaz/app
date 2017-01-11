
import {Button, Panel} from "react-bootstrap";
import { Routes }      from '../../../common/Routes';
import {browserHistory} from 'react-router';
import {MeteorPromise} from "../../helpers/meteor";

interface BlacklistState {}

export class BlacklistSelection extends React.Component<{}, BlacklistState> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Panel header={<h3>Manage your blacklist</h3>} bsStyle='danger'>
        <p>You can access your blacklist, add and remove facebook contact from it</p>
        <Button bsStyle='danger' onClick={this.onSelectBlacklist}>Manage blacklist</Button>
      </Panel>
    );
  }

  onSelectBlacklist(e) {
    e.preventDefault();
    MeteorPromise.call('fetchReactioners');
    browserHistory.push('/blacklist');
  }

}


