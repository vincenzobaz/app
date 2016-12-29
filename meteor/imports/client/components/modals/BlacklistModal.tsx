import {decorate} from 'react-mixin';
import {Reactioner} from "../../../common/models/Reactioner";
import {Modal, Well} from "react-bootstrap";
import {Reactioners} from "../../collections/Reactioners";
import {PersonPicker} from "../PersonPicker";

interface BlacklistState {
    whiteListed: Reactioner[];
    blackListed: Reactioner[];
}

@decorate(ReactMeteorData)
export class BlacklistModal extends React.Component<{onHide: Function, show: boolean}, BlacklistState> {
    private data: BlacklistState;

    getMeteorData() {
        let all: Reactioner[] = Reactioners.find().fetch();
        return {
            whiteListed: all.filter(x => !x.blacklisted),
            blackListed: all.filter(x => x.blacklisted)
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
                        <p>This are the people that you have already blacklisted:</p>
                        <ul>
                            {this.data.blackListed.map(person => <li>{person.userName}</li>)}
                        </ul>
                    </Well>
                    <Well>
                        <PersonPicker data={this.data.whiteListed} onHide={this.props.onHide}/>
                    </Well>
                </Modal.Body>
            </Modal>
        );
    }
}
