import {Reactioner} from "../../common/models/Reactioner";
import {Button, Row, Col} from 'react-bootstrap';
import {MeteorPromise} from "../helpers/meteor";
const Select = require('react-select');

type PickerState = {picked: Reactioner[], pickable: Reactioner[]};

export class PersonPicker extends React.Component<{data: Reactioner[], onHide: Function}, PickerState> {
    constructor(props) {
        super(props);
        this.state = {
            picked: [],
            pickable: props.data
        };
    }

    render() {
        return (
            <div className="picker">
                <p>Search the person you want to blacklist and click on its name</p>
                <Select
                    name="add-to-bl"
                    labelKey="userName"
                    options={this.state.pickable}
                    onChange={this.onPick.bind(this)}
                />
                <p>You have marked for blacklisting :</p>

                <ul>
                    {this.state.picked.map(el => <li key={el.userId}> {el.userName} </li>)}
                </ul>
                <Button className="confirm-blacklist" onClick={this.sendBlacklist.bind(this)}>
                    Confirm Blacklist
                </Button>
            </div>
        );
    }

    onPick(chosen: Reactioner) {
        console.log("You picked " + chosen.userId);
        const state: PickerState = this.state;
        state.picked.push(chosen);
        this.setState(state)
    }

    sendBlacklist() {
        this.props.onHide();
        if (this.state.picked.length != 0) {
            return MeteorPromise.call('addToBlacklist', this.state.picked);
        }
    }
}

