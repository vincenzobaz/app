
import {Button, Panel} from "react-bootstrap";
import { MeteorPromise } from "../../helpers/meteor";
import { BlacklistModal } from "../modals/BlacklistModal";

interface BlacklistState {
  showBlacklistModal: boolean;
}

export class BlacklistSelection extends React.Component<{}, BlacklistState> {

  constructor(props: any) {
    super(props);
    this.state = {
      showBlacklistModal: false
    };
  }

  render() {
    return (
      <div>
        <Panel header={<h3>Manage your blacklist</h3>} bsStyle='danger'>
          <p>You can access your blacklist, add and remove facebook contact from it</p>
          <Button bsStyle='danger' onClick={this.onBlacklistClick.bind(this)}>Manage blacklist</Button>
        </Panel>
        {this.state.showBlacklistModal && <BlacklistModal show={this.state.showBlacklistModal} onHide={this.onHideBlacklistModal.bind(this)} />}
      </div>
    );
  }

  onBlacklistClick(e: React.MouseEvent) {
    e.stopPropagation();

    MeteorPromise.call('fetchReactioners');

    this.setState({
      showBlacklistModal: true
    });
  }

  onHideBlacklistModal() {
    this.setState({
      showBlacklistModal: false
    });
  }

}


