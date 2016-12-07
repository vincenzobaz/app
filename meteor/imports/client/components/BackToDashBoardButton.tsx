import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import {Routes} from "../../common/Routes";

export function BackDashboardButton(props) {
    return (
        <Link to={Routes.Page.home()}
              className="dashboard-link">
            <Button bsStyle="primary"
                    className="to-dashboard-button">
                Back to Dashboard
            </Button>
        </Link >);
}

