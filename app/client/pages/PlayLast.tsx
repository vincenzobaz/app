
import { Routes } from '../../common/Routes';

interface Props {
  lastGameId?: string;
}

export class PlayLast extends React.Component<Props, void> {

  context: {
    router: { replace: Function }
  };

  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.redirectToGame(this.props.lastGameId);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.redirectToGame(nextProps.lastGameId)
  }

  redirectToGame(gameId: string) {
    if (gameId != null) {
      this.context.router.replace(Routes.Page.playGameId(gameId));
    } else {
      this.context.router.replace(Routes.Page.games());
    }
  }

  render() {
    return null;
  }

}

