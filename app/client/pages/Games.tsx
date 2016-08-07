
import { decorate }              from 'react-mixin';

import { GamesList }             from '../components/GamesList';
import { getAppState, AppState } from '../appState';

@decorate(ReactMeteorData)
export class Games extends React.Component<{}, {}> {

  data: AppState;

  getMeteorData() {
    return getAppState();
  }

  render() {
    return <GamesList games={this.data.games} />;
  }

}

