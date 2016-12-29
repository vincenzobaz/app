import {
    Button,
    OverlayTrigger,
    Popover,
    Row, Col, Well
} from 'react-bootstrap';
import {getConfig} from "../helpers/getConfig";
import {MeteorPromise} from "../helpers/meteor";
import {BlacklistModal} from "./modals/BlacklistModal";
import {Reactioners} from "../collections/Reactioners";
import {Reactioner} from "../../common/models/Reactioner";

interface AccountSettingsState {
    logoutConfirmed: boolean;
    deleteAllDataConfirmed: boolean;
    showBlacklistModal: boolean;
}

export class AccountSettings extends React.Component<{}, AccountSettingsState> {

    constructor(props) {
        super(props);

        this.state = {
            logoutConfirmed: false,
            deleteAllDataConfirmed: false,
            showBlacklistModal: false
        }
    }

    render() {
        let popover = (
            <Popover id="logoutInfo">
                Are you sure? Click again to confirm
            </Popover>
        );

        return (
            <div className="account-settings" onClick={this.onBackgroundClick.bind(this)}>
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
                                <Button className="button-logout" onClick={this.onLogout.bind(this)}>
                                    Log Out
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Well>
                <Well>
                    <Row>
                        <Col md={12}>
                            <div className="settings-info">
                                <strong>Careful!</strong> This will delete everything.
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
                                <Button className="button-logout" onClick={this.onDeleteAllData.bind(this)}>
                                    Delete Account
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Well>
                <Well>
                    <Row>
                        <Col md={12}>
                            <div className="blacklist-info">
                                Blacklist people here
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <Button className="blacklist_button" onClick={this.onBlacklistClick.bind(this)}>
                                Blacklist
                            </Button>
                        </Col>
                    </Row >
                </Well >
                {this.state.showBlacklistModal && <BlacklistModal show={this.state.showBlacklistModal} onHide={this.onHideBlacklistModal.bind(this)}/>}
            </div>
        )
    }

    onBlacklistClick(e: React.MouseEvent) {
        e.stopPropagation();

        MeteorPromise.call('fetchReactioners');

        this.setState({
            logoutConfirmed: this.state.logoutConfirmed,
            deleteAllDataConfirmed: this.state.deleteAllDataConfirmed,
            showBlacklistModal: true
        });
    }


    onLogout(e: React.MouseEvent) {
        e.stopPropagation();

        if (this.state.logoutConfirmed) {
            Meteor.logout();
        }

        this.setState({
            logoutConfirmed: true,
            deleteAllDataConfirmed: false,
            showBlacklistModal: this.state.showBlacklistModal
        });
    }

    onDeleteAllData(e: React.MouseEvent) {
        e.stopPropagation();

        if (this.state.deleteAllDataConfirmed) {
            Meteor.call("Account.deleteAllData");
        }

        this.setState({
            logoutConfirmed: false,
            deleteAllDataConfirmed: true,
            showBlacklistModal: this.state.showBlacklistModal
        })
    }

    onBackgroundClick() {
        this.setState({
            logoutConfirmed: false,
            deleteAllDataConfirmed: false,
            showBlacklistModal: this.state.showBlacklistModal
        });
    }

    onHideBlacklistModal() {
        this.setState({
            logoutConfirmed: this.state.logoutConfirmed,
            deleteAllDataConfirmed: this.state.deleteAllDataConfirmed,
            showBlacklistModal: false
        });
    }

}

