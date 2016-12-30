import {decorate} from 'react-mixin';
import {Reactioner} from "../../../common/models/Reactioner";
import {Modal, Well} from "react-bootstrap";
import {Reactioners, Blacklist} from "../../collections/Reactioners";
import {PersonPicker} from "../PersonPicker";

interface BlacklistState {
    all: Reactioner[];
    blackListed: Reactioner[];
}

@decorate(ReactMeteorData)
export class BlacklistModal extends React.Component<{onHide: Function, show: boolean}, BlacklistState> {
    private data: BlacklistState;

    getMeteorData() {
        let all: Reactioner[] = Reactioners.find().fetch();
        let blacklist = Blacklist.find().fetch();
        console.log("getMeteorData triggered");
        return {
            all: all,
            blackListed: blacklist
        };
    }

    render() {
        return (
            <Modal bsSize="large" onHide={this.props.onHide} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Blacklist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Well>
                        <p>Your current blacklist: </p>
                        <OldBlacklistModal list={this.data.blackListed}/>
                    </Well>
                    <Well>
                        <PersonPicker data={this.data.all} onHide={this.props.onHide}/>
                    </Well>
                </Modal.Body>
            </Modal>
        );
    }
}

function OldBlacklistModal(props) {
    const list: Reactioner[] = props.list;
    return (
        <ul>
            {list.map(person => <li key={person.userId}> {person.userName} </li>)}
        </ul>
    );
}
