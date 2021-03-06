import { Welcome }    from './Welcome';
import { About }      from './About';
import { Account }    from './Account';
import { PlayGame }   from './PlayGame';
import { Home }       from './Home';
import { Games }      from './Games';
import { Requests }   from './Requests';
import { Dashboard }  from './Dashboard';
import { BugBoard }   from './BugBoard';
import { StatsPage }  from './StatsPage';

import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {AdminPage} from "./Admin";

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={Dashboard}>
            <IndexRoute component={Welcome}/>
            <Route path="about" component={About}/>
            <Route path="account" component={Account}/>
            <Route path="games" component={Games}/>
            <Route path="requests" component={Requests}/>
            <Route path="play/:gameId" component={PlayGame}/>
            <Route path="stats" component={StatsPage}/>
            <Route path="admin" component={AdminPage}/>
        </Route>
        <Route path="view_feedback" component={BugBoard}/>
    </Router>
);

export class Main extends React.Component<{}, {}> {
    render() {
        return router;
    }
}

