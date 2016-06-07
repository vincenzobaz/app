import {Button, OverlayTrigger, Popover, Row, Col, Well} from 'react-bootstrap';
import {Dashboard} from "../handlers/Dashboard";
import {BugBoard} from "./BugBoard";


interface AccountSettingsState {
    logoutConfirmed:boolean;
    deleteAllDataConfirmed:boolean;
}

export class AccountSettings extends React.Component<{}, AccountSettingsState> {

    constructor(props) {
        super(props);
        this.state = {
            logoutConfirmed: false,
            deleteAllDataConfirmed: false
        }
    }

    render() {

        let popover = <Popover id="logoutInfo">
            Are you sure? Click again to confirm
        </Popover>;
        return (
            <div className="account-settings" onClick={this.clickedBackGround.bind(this) }>
                <Well>
                    <Row>
                        <Col md={12}>
                            <div className="settings-info">
                                <p>
                                    This will log you out of the app.
                                    We keep your data safely secured and you can come back
                                    any time you want.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>

                                <Button className="button-logout" onClick={this.onLogout.bind(this) }>Log Out</Button>

                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Well>
                <Well>
                    <Row>
                        <Col md={12}>
                            <div className="settings-info">
                                <b>Careful!</b> This will delete everything.
              All your games played, all data we gathered to create questions.
                                <p>
                                    There will be no trace you ever existed!
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>


                                <Button className="button-logout" onClick={this.onDeleteAllData.bind(this) }>Delete Account</Button>

                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Well>
            </div>
        )
    }

  onLogout(e: React.MouseEvent) {
    e.stopPropagation();
    if (this.state.logoutConfirmed) {
      Meteor.logout();
    }

        this.setState({
            logoutConfirmed: true,
            deleteAllDataConfirmed: false
        })
    }

    onDeleteAllData(e:React.MouseEvent) {
        e.stopPropagation();

        if (this.state.deleteAllDataConfirmed) {
            Meteor.call("Account.deleteAllData");
        }

        this.setState({
            logoutConfirmed: false,
            deleteAllDataConfirmed: true
        })
    }

    renderInfoForLogout() {
        // if (this.state.logoutConfirmed) {
        return (
            <div className="settings-info">
                <p>
                    Are you sure?This will log you out of the app.
                    We keep your data safely secured and you can come back
                    any time you want.
                </p>

                <p>Click again to confirm</p>
            </div>
        );
    }

    renderInfoForDeleteAllData() {
        if (this.state.deleteAllDataConfirmed) {
            return (
                <div className="settings-info grid-100">

                    <b>Careful!</b> This will delete everything.
          All your games played, all data we gathered to create questions,
          there will be no trace you ever existed.

          Click again to confirm
                </div>
            )
        } else {
            return <noscript/>

        }
    }

    clickedBackGround() {
        console.log("clicked background");
        this.setState({
            logoutConfirmed: false,
            deleteAllDataConfirmed: false
        })
    }
}

// <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={
//   <Popover id="logoutInfo">
//   Are you sure?
// </Popover>}>
//   <Button className="button-wrong prefix-25 grid-50" onClick={this.onLogout.bind(this) }>Log Out</Button>

// </OverlayTrigger>
// <div className="settings-info">
//   <p>
//     Are you sure?This will log you out of the app.
//     We keep your data safely secured and you can come back
//     any time you want.
//   </p>
// </div>
// <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={
//   <Popover id="logoutInfo">
//   Are you sure?
// </Popover>}>

//   <Button className="button-wrong prefix-25 grid-50"onClick={this.onDeleteAllData.bind(this) }>Delete Account</Button>
