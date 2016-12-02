import {Modal, Button, Table, Panel, Row, Col, ButtonGroup, DropdownButton, MenuItem} from "react-bootstrap";
import {decorate} from "react-mixin";
import {Feedback, FeedbackStatus, FEEDBACK_STATUS} from "../../common/models/Feedback";
import {FeedBackCollection} from "../../common/collections/FeedbackCollection";
import {Routes} from "../../common/Routes";
import {Tile} from "../../common/models/Tile";
import Question from "../../common/models/Question";
import {Game} from "../models/Game";
import {User} from "../models/User";

const moment = require('moment');
const format = "MMMM Do YYYY, k:mm:ss";

export type SortingOptions = "DateMostRecentFirst" | "DateMostRecentLast"

export const SORTING_OPTIONS = {
    DateMostRecentFirst: 'DateMostRecentFirst' as SortingOptions,
    DateMostRecentLast: 'DateMostRecentLast' as SortingOptions,
};


interface Data {
    feedbacks: Feedback[];
    user: User;
    count: number;
}

export interface BugBoardProps {

}

export interface BugBoardState {
    showModal?: boolean;
    currentScreenshot?: string;
    skip?: number;
    limit?: number;
    status?: FeedbackStatus | "All"
    sorting?: number;

}

@decorate(ReactMeteorData)
export class BugBoard extends React.Component<BugBoardProps, BugBoardState> {

    data: Data;

    constructor(props: BugBoardProps) {
        super(props);
        this.state = {
            showModal: false,
            skip: 0,
            limit: 50,
            status: "All",
            sorting: -1
        };
    }

    getMeteorData() {
        let query = {};
        if (this.state.status && this.state.status != "All") {
            query = {status: this.state.status}
        }
        return {
            feedbacks: FeedBackCollection.find(query, {
                sort: {creationDate: this.state.sorting},
                skip: this.state.skip,
                limit: this.state.limit
            }).fetch(),
            count: FeedBackCollection.find(query).count(),
            user: Meteor.user()
        }
    }

    render() {
        if (!this.data.user.profile.isDev) {
            return (
                <p><i>You have wandered in a strange place...</i></p>
            );
        }

        return (
            <div>
                <Panel>
                    {this.renderBugs()}
                </Panel>
            </div>
        )
    }

    renderBugs() {
        const sortBy = this.state.sorting == -1 ? "Sort By Most Recent First" : "Sort By Most Recent Last";
        const filterStatus = this.state.status;
        const nextDisabled = this.state.skip + this.state.limit > this.data.count;
        return (
            <div>
                <Row>
                    <Col md={12} mdOffset={4}>
                        <ButtonGroup className="feedback-menu-buttons">
                            <Button onClick={this.onPrevious.bind(this)} disabled={this.state.skip == 0}>Prev</Button>
                            <DropdownButton title={sortBy} id="bg-nested-dropdown"
                                            onSelect={this.onChangeSorting.bind(this)}>
                                <MenuItem eventKey={SORTING_OPTIONS.DateMostRecentFirst}> Most Recent First </MenuItem>
                                <MenuItem eventKey={SORTING_OPTIONS.DateMostRecentLast}> Most Recent Last </MenuItem>
                            </DropdownButton>
                            <DropdownButton id="select-filter-status"
                                            className={this.getDropDownClassName(this.state.status)}
                                            title={filterStatus} onSelect={this.onFilterSelected.bind(this)}>
                                <MenuItem eventKey={"All"}> All </MenuItem>
                                <MenuItem eventKey={FEEDBACK_STATUS.New}>{FEEDBACK_STATUS.New} </MenuItem>
                                <MenuItem eventKey={FEEDBACK_STATUS.Confirmed}>{FEEDBACK_STATUS.Confirmed} </MenuItem>
                                <MenuItem eventKey={FEEDBACK_STATUS.InProgress}>{FEEDBACK_STATUS.InProgress} </MenuItem>
                                <MenuItem eventKey={FEEDBACK_STATUS.Done}>{FEEDBACK_STATUS.Done} </MenuItem>
                                <MenuItem eventKey={FEEDBACK_STATUS.InProgress}>{FEEDBACK_STATUS.InProgress} </MenuItem>
                                <MenuItem eventKey={FEEDBACK_STATUS.Rejected}>{FEEDBACK_STATUS.Rejected} </MenuItem>


                            </DropdownButton>

                            <Button onClick={this.onNext.bind(this)} disabled={nextDisabled}>Next</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Table striped={true} bordered={true} condensed={true}>
                            <thead>
                            <tr>
                                <th>UserId</th>
                                <th>Note</th>
                                <th>GameId</th>
                                <th>TileId</th>
                                <th>QuestionId</th>
                                <th>ScreenShot</th>
                                <th>Creation Time</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.data.feedbacks.map(f => this.renderFeedbackItem(f))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {this.renderScreenshot()}

            </div>
        );

    }

    renderFeedbackItem(feedback: Feedback) {
        let gameId = feedback.game ? feedback.game._id.valueOf() : '???';
        let tileId = feedback.tile ? feedback.tile._id.valueOf() : '???';
        let questionId = feedback.question ? feedback.question._id.valueOf() : '???';
        return (   <tr key={feedback._id.valueOf() }>
            <td><a href="#" onClick={this.logUserDetails.bind(this, feedback.userId)}>{feedback.userId.toString()} </a>
            </td>
            <td className="feedback-note" onClick={this.logNote.bind(this, feedback.note)}>{feedback.note} </td>
            <td><a href="#" onClick={this.logGameDetails.bind(this, feedback.game)}> {gameId} </a></td>
            <td><a href="#" onClick={this.logTile.bind(this, feedback.tile)}> {tileId} </a></td>
            <td><a href="#" onClick={this.logQuestion.bind(this, feedback.question)}> {questionId}</a></td>
            <td><img className="screenshot-icon" src={Routes.Assets.at('images/screenshot.png')}
                     onClick={this.showScreenshot.bind(this, feedback.img)}/></td>
            <td>{moment(feedback.creationDate).format(format)}</td>
            <td>
                <DropdownButton className={this.getDropDownClassName(feedback.status)}
                                id={"feedback-item-" + feedback._id} title={feedback.status}
                                onSelect={this.onChangeItemStatus.bind(this, feedback)}>
                    <MenuItem eventKey={FEEDBACK_STATUS.New}>{FEEDBACK_STATUS.New} </MenuItem>
                    <MenuItem eventKey={FEEDBACK_STATUS.Confirmed}>{FEEDBACK_STATUS.Confirmed} </MenuItem>
                    <MenuItem eventKey={FEEDBACK_STATUS.InProgress}>{FEEDBACK_STATUS.InProgress} </MenuItem>
                    <MenuItem eventKey={FEEDBACK_STATUS.Done}>{FEEDBACK_STATUS.Done} </MenuItem>
                    <MenuItem eventKey={FEEDBACK_STATUS.InProgress}>{FEEDBACK_STATUS.InProgress} </MenuItem>
                    <MenuItem eventKey={FEEDBACK_STATUS.Rejected}>{FEEDBACK_STATUS.Rejected} </MenuItem>
                </DropdownButton>
            </td>
        </tr>);


    }

    getDropDownClassName(status: FeedbackStatus | "All"): string {
        return "feedback-status-" + status.toLowerCase();
    }

    renderScreenshot() {
        return (
            <Modal show={this.state.showModal} onHide={this.close.bind(this)} className="fullscreen">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={this.state.currentScreenshot}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    onFilterSelected(eventKey: "All" | FeedbackStatus, event: React.MouseEvent) {
        console.log("We selected event", eventKey, event);
        this.setState({
            status: eventKey
        });
    }

    onChangeItemStatus(feedback: Feedback, eventKey: "All" | FeedbackStatus, event: React.MouseEvent) {
        console.log("We have the following", feedback, eventKey, event);
        FeedBackCollection.update({_id: feedback._id}, {
            $set: {status: eventKey}
        })
    }

    onChangeSorting(eventKey: SortingOptions, event: React.MouseEvent) {
        let sorting = eventKey == SORTING_OPTIONS.DateMostRecentFirst ? -1 : 1;
        this.setState({
            sorting: sorting
        })
    }

    showScreenshot(img: string) {
        this.setState({
            showModal: true,
            currentScreenshot: img
        })
    }

    close() {
        this.setState({
            showModal: false,
        })
    }

    onNext() {
        this.setState({
            "skip": this.state.skip + this.state.limit
        })
    }

    onPrevious() {
        this.setState({
            "skip": this.state.skip - this.state.limit < 0 ? 0 : this.state.skip - this.state.limit
        })
    }

    logUserDetails(userId: string) {
        console.log("User: ", userId);
    }

    logGameDetails(game: Game) {
        console.log("Game: ", game);
    }

    logTile(tile: Tile) {
        console.log("Tile: ", tile);
    }

    logQuestion(question: Question) {
        console.log("Question: ", question);
    }

    logNote(note: string) {
        console.log("Note: ", note);
    }

}

