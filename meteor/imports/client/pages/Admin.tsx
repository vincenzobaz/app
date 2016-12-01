import {User} from "../models/User";
import {MeteorPromise} from "../helpers/meteor";
import {Button} from "react-bootstrap";

interface AdminPageProps {
    user: User;
}

export class AdminPage extends React.Component<AdminPageProps, {}> {

    constructor(props: AdminPageProps) {
        super(props);
    }

    onClickLogsButton() {
        if (this.props.user.profile.isDev) {
            var now = new Date();
            var expiration = new Date(now.getTime() + 60 * 60 * 1000);
            var secure = location.protocol == "https:" ? "; secure" : "";
            document.cookie = "Reminisceme_LogsToken="
                + this.props.user._id
                + "; path=/; max-age=3600; expires="
                + expiration.toUTCString()
                + secure;
            MeteorPromise.call("Logs.createToken").then(res => {
                if (res.status == 'success') {
                    window.open(location.protocol + "//" + window.location.hostname + ":8080")
                } else {
                    alert("Something went wrong...")
                }
            });
        }
    }

    render() {
        if (!this.props.user.profile.isDev) {
            return (
                <p>You have wandered in a strange place...</p>
            );
        }
        return (
            <Button
                bsStyle="primary"
                className="logs-button"
                onClick={this.onClickLogsButton.bind(this)}>
                Open Kibana to see logs
            </Button>
        );
    }
}
