
import MouseEventHandler = React.MouseEventHandler;

import { Score, CONQUERER_TYPE } from "../../../common/models/Score";
import { range } from 'lodash';

interface ProgressImageProps {
  onClick: MouseEventHandler;
  type: string;
  score: Score;
  winningTile: boolean
  children?: any[]
}

export class ProgressImage extends React.Component<ProgressImageProps, {}> {

  render() {
    const score = this.conquerorScore(this.props.score);
    const conqueror = this.conqueror(this.props.score);

    const elementsClassName = range(1, 4).map((i: number) => {
      if (i > score) {
        return "trigger-ring-element-empty";
      } else {
        return `trigger-ring-element-${conqueror}-conquered`;
      }
    });

    const svgStyles = {
      width: '100%',
      height: '100%'
    };

    if (this.props.winningTile) {
      const className = `trigger-ring trigger-full-${conqueror}-conquered`;
      return (
        <svg className={className} viewBox="0 0 130 130" style={svgStyles}>
          <ellipse cx="65" cy="65" rx="45.5" ry="44.442"/>
        </svg>
      );
    }

    return (
      <svg className="trigger-ring" preserveAspectRatio="xMidYMid" viewBox="0 0 130 130" style={svgStyles}>
        <g className="drawing">
          <path
            d="M92.897,88.423l16.267,9.391c-10.021,13.558 -26.119,22.356 -44.256,22.356c-18.277,0 -34.483,-8.934 -44.487,-22.669l15.688,-9.072c6.693,8.276 16.929,13.571 28.391,13.571c11.466,0 21.703,-5.298 28.397,-13.577Z"
            className={elementsClassName[0]}/>
          <path
            d="M70,10.403c27.972,2.573 49.908,26.129 49.908,54.767c0,8.283 -1.835,16.141 -5.121,23.189l-16.339,-9.433c1.647,-4.157 2.552,-8.686 2.552,-13.426c0,-18.276 -13.461,-33.432 -31,-36.088l0,-19.009Z"
            className={elementsClassName[1]}/>
          <path
            d="M59,10.484l0,18.928c-17.539,2.656 -31,17.812 -31,36.088c0,4.743 0.906,9.275 2.556,13.434l-15.69,9.073c-3.184,-6.957 -4.958,-14.691 -4.958,-22.837c0,-28.359 21.51,-51.735 49.092,-54.686Z"
            className={elementsClassName[2]}/>
          {this.props.children}
        </g>
    </svg>
    );
  }

  conqueror(score: Score): string {
    return score.conqueredBy == CONQUERER_TYPE.ME ? "user" : "enemy";
  }

  conquerorScore(score: Score): number {
    return score.me > score.them ? score.me : score.them;
  }

}

