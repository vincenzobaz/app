import {Reactioner} from "../../../common/models/Reactioner";
import {Modal, Well, Button} from "react-bootstrap";
import {Reactioners, Blacklist} from "../../collections/Reactioners";
import {PersonPicker} from "../PersonPicker";
import {MeteorPromise} from "../../helpers/meteor";

interface BlacklistState {
    all: Reactioner[];
    blackListed: Reactioner[];
    unlisted: boolean[];
}

export class BlacklistModal extends React.Component<{onHide: Function, show: boolean}, BlacklistState> {
    constructor(props) {
        super(props);
        let all: Reactioner[] = Reactioners.find().fetch();
        let blacklist: Reactioner[] = Blacklist.find().fetch();
        this.state = {
            all: all,
            blackListed: blacklist,
            unlisted: blacklist.map(() => false)
        };
    }

    render() {
        const deleted: Function = index => !this.state.unlisted[index];
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
                                    <li key={person.userId}> {person.userName }
                                        <Button
                                            bsSize="xsmall"
                                            onClick={this.onItemListClick.bind(this, index)}
                                            bsStyle={deleted(index) ? "danger" : null}>
                                            {deleted(index) ? "remove" : "cancel"}
                                        </Button>
                                </li>)}
                        </ul>
                        {this.state.unlisted.some(el => el) &&
                            <Button
                            bsSize="large"
                            onClick={this.onConfirm.bind(this)}
                            bsStyle="success">
                            Confirm
                        </Button>}
                    </Well>
                    <Well>
                        <PersonPicker data={this.state.all} onHide={this.props.onHide}/>
                    </Well>
                </Modal.Body>
            </Modal>
        );
    }


    onConfirm() {
        this.props.onHide();
        return MeteorPromise.call('removeFromBlacklist',
            this.state.unlisted
                .map(function (el, i) {
                    return {_1: el, _2: i}
                })
                .filter(tuple => tuple._1)
                .map(tuple => this.state.blackListed[tuple._2])
        );
    }

    onItemListClick(index: number) {
        this.state.unlisted[index] = !this.state.unlisted[index];
        this.setState(this.state);
    }
}
