
/* tslint:disable:curly */

import { Game } from '../models/Game';

interface GameResultProps {
  game: Game;
}

export class GameResult extends React.Component<GameResultProps, {}> {

  render() {
    const game = this.props.game;

    return (
      <div className={`game-result ${this.renderClass(game)}`}>
        {this.renderText(game)}
      </div>
    );
  }

  renderClass(game: Game): string {
    if      (game.isWon)  return 'won';
    else if (game.isDraw) return 'draw';
    else                  return 'lost';
  }

  renderText(game: Game): string {
    if      (game.isWon)  return 'Yay, you have won!';
    else if (game.isDraw) return 'Nobody won, nobody lost.';
    else                  return 'Sorry, you have lost...';
  }

}

