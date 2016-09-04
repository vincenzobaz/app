
import { decorate }              from 'react-mixin';

import { GamesList }             from '../components/GamesList';
import { Game }                  from '../models/Game';
import { getAppState, AppState } from '../appState';

interface Props {
  games: Array<Game>;
}

export class Games extends React.Component<Props, {}> {

  render() {
    return <GamesList games={this.props.games} />;
  }

}

