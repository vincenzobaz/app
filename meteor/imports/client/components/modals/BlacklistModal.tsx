import {Reactioner} from "../../../common/models/Reactioner";
import {Modal, Well, Button} from "react-bootstrap";
import {Reactioners, Blacklist} from "../../collections/Reactioners";
import {MeteorPromise} from "../../helpers/meteor";
const Select = require('react-select');

interface BlacklistState {
    all: Reactioner[];
    blackListed: Reactioner[];
    unlisted: boolean[];
    additions: boolean;
    removals: boolean;
}

export class BlacklistModal extends React.Component<{onHide: Function, show: boolean}, BlacklistState> {
    constructor(props) {
        super(props);
        let all: Reactioner[] = Reactioners.find().fetch();
        let blacklist: Reactioner[] = Blacklist.find().fetch();
        this.state = {
            all: all,
            blackListed: blacklist,
            unlisted: blacklist.map(() => false),
            additions: false,
            removals: false
        };
    }

    render() {
        const wasItemDeleted: Function = index => !this.state.unlisted[index];
        const showConfirmation: boolean = this.state.removals || this.state.additions;
        return (
            <Modal bsSize="large" onHide={this.props.onHide} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Blacklist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Well>
                        <p>Your current blacklist: </p>
                        <ul>
                            {this.state.blackListed.map((person, index) =>
                                <li key={person.userId}> {person.userName + " "}
                                    <Button
                                        bsSize="xsmall"
                                        onClick={this.onItemListClick.bind(this, index)}
                                        bsStyle={wasItemDeleted(index) ? "danger" : "warning"}>
                                        {wasItemDeleted(index) ? "remove" : "marked for removal"}
                                    </Button>
                                </li>)}
                        </ul>
                    </Well>
                    <Well>
                        <div className="picker">
                            <p>Search the person you want to blacklist and click on his/her name</p>
                            <Select
                                name="add-to-bl"
                                labelKey="userName"
                                optionClassName="blacklist-option"
                                options={this.state.all}
                                onChange={this.addToBlacklist.bind(this)}
                            />
                        </div>
                    </Well>
                    {showConfirmation && <p>Click on Confirm to save your changes</p>}
                    {showConfirmation && <Button
                        bsSize="large"
                        onClick={this.onConfirm.bind(this)}
                        bsStyle="success">
                        Confirm
                    </Button>}
                </Modal.Body>
            </Modal>
        );
    }

    addToBlacklist(el: Reactioner) {
        let state: BlacklistState = this.state;
        state.blackListed.push(el);
        state.additions = true;
        this.setState(state);
    }

    onConfirm() {
        this.props.onHide();
        if (this.state.removals) {
            MeteorPromise.call('removeFromBlacklist',
                this.state.unlisted
                    .map(function (el, i) {
                        return {_1: el, _2: i}
                    })
                    .filter(tuple => tuple._1)
                    .map(tuple => this.state.blackListed[tuple._2]));
        }
        if (this.state.additions) {
            MeteorPromise.call('addToBlacklist', this.state.blackListed);
        }
    }

    onItemListClick(index: number) {
        this.state.unlisted[index] = !this.state.unlisted[index];
        this.state.removals = this.state.unlisted.some(el => el);
        this.setState(this.state);
    }
}
