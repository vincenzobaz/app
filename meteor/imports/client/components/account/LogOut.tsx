
import {Button, Panel} from "react-bootstrap";


interface LogOutState {}

export class LogOut extends React.Component<{}, LogOutState> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Panel header={<h3>Log out from the game</h3>} bsStyle='danger'>
        <p>You will be logged out from this application</p>
        <Button bsStyle='danger' onClick={this.onLogOut}>Log me out</Button>
      </Panel>
    );
  }

  onLogOut(e) {
    e.preventDefault();

    Meteor.logout();
  }

}


