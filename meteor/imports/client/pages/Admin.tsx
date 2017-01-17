import {User} from "../models/User";
import {MeteorPromise} from "../helpers/meteor";
import {Button, Glyphicon} from "react-bootstrap";
import {Link} from "react-router";
import {Routes} from "../../common/Routes";

interface AdminPageProps {
    user: User;
}

export class AdminPage extends React.Component<AdminPageProps, {}> {

    constructor(props: AdminPageProps) {
        super(props);
        console.log(props);
    }

    onClickLogsButton() {
        if (this.props.user.profile.isDev) {
            MeteorPromise.call("Logs.createToken").then(res => {
                if (res.status == 'success' && res.id !== "") {
                    let now = new Date();
                    let expiration = new Date(now.getTime() + 60 * 60 * 1000);
                    let secure = location.protocol == "https:" ? "; secure" : "";
                    document.cookie = "Reminisceme_LogsToken="
                        + res.id
                        + "; path=/; max-age=3600; expires="
                        + expiration.toUTCString()
                        + secure;
                    window.open(location.protocol + "//" + window.location.hostname + ":8080")
                } else {
                    alert("Something went wrong...\n" + JSON.stringify(res))
                }
            });
        }
    }

    render() {
        if (!this.props.user.profile.isDev) {
            return (
                <p><i>You have wandered in a strange place...</i></p>
            );
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <Button
                            bsStyle="primary"
                            onClick={this.onClickLogsButton.bind(this)}>
                            Open Kibana to see logs
                        </Button>
                    </div>
                    <div className="col-sm-4">
                        <Link to={Routes.Page.viewFeedback()} className='feedback-link'>
                            <Button bsStyle='primary'>
                                <Glyphicon glyph='dashboard'/>
                                View Feedback
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
