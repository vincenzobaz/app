import {Reactioner} from "../../../common/models/Reactioner";
import {Modal, Well, Button} from "react-bootstrap";
import {Reactioners, Blacklist} from "../../collections/Reactioners";
import {MeteorPromise} from "../../helpers/meteor";
const Select = require('react-select');

interface BlacklistState {
    all: Reactioner[];
    blackListed: Reactioner[];
    unlisted: boolean[];
    modified: boolean;
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
            modified: false
        };
    }

    render() {
        const deleted: Function = index => !this.state.unlisted[index];
        const removedFromList: boolean = this.state.unlisted.some(el => el);
        const showConfirmation: boolean = removedFromList || this.state.modified;
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
                                        bsStyle={deleted(index) ? "danger" : "warning"}>
                                        {deleted(index) ? "remove" : "marked for removal"}
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
                                options={this.state.all}
                                onChange={this.addToBlacklist.bind(this)}
                            />
                        </div>
                    </Well>
                    <p>Click on Confirm to save your changes</p>
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
        state.modified = true;
        this.setState(state);
    }

    onConfirm() {
        this.props.onHide();
        MeteorPromise.call('removeFromBlacklist',
            this.state.unlisted
                .map(function (el, i) {
                    return {_1: el, _2: i}
                })
                .filter(tuple => tuple._1)
                .map(tuple => this.state.blackListed[tuple._2]));
        MeteorPromise.call('addToBlacklist', this.state.blackListed);
    }

    onItemListClick(index: number) {
        this.state.unlisted[index] = !this.state.unlisted[index];
        this.setState(this.state);
    }
}
