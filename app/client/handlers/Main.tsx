
import { decorate } from 'react-mixin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { Welcome }    from './Welcome';
import { About }      from './About';
import { Account }    from './Account';
import { PlayGame }   from './PlayGame';
import { Home }       from './Home';
import { Dashboard  } from './Dashboard';

export class Main extends React.Component<{}, {}> {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Dashboard}>
          <IndexRoute component={Welcome} />

          <Route path="about"        component={About} />
          <Route path="account"      component={Account} />
          <Route path="play/:gameId" component={PlayGame} />
        </Route>
      </Router>
    );
  }

}

