

import {Tooltip} from './bootstrap/Tooltip';
import {Routes} from './../../../common/Routes';
import {progressImage} from './../boot/helpers/progressImage';
import {ModalManager} from './../ModalManager';
import {SubjectType} from "../../../common/models/questions/SubjectType";
import {Score} from "../../../common/models/Score";
import {Kind} from "../../../common/models/questions/Kind";

const icons = {
  Order: 'sort', // 'sort-up'
  MultipleChoice: 'list',
  Timeline: 'time', // 'calendar'
  Geolocation: 'map-marker', // 'geo'
  Misc: 'question'
};

const typeToIcon = (type) =>
  icons[type] || icons.Misc;

interface TileProps {
  title: string;
  placement: string;
  questionModal: ModalDescProps;
  number: number;
  type: Kind;
  opponentId?: string | Mongo.ObjectID;
  score: Score;
  disabled: boolean;
  
}

export class Tile extends React.Component<TileProps, {}> {
  
  render() {
    return (
      <div className={this.getCellClassNames()}>
        <Tooltip title={this.props.title} placement={this.props.placement}>
          {this.renderTrigger()}
        </Tooltip>
      </div>
    );
  }

  renderTrigger() {
    return (
      <a role='button' href='#' onClick={this.onClick.bind(this)}>
        <img src={this.getProgressImage()} alt={this.props.title} style={this.getImageStyle()} />
        <i className={this.getIconClassNames()}></i>
      </a>
    );
  }

  onClick(e) {
    e.preventDefault();

    if (this.isDisabled()) {
      return;
    }
    ModalManager.showModal(this.props.questionModal);
  }

  isDisabled() {
    return this.props.disabled;
  }

  getCellClassNames() {
    return [
      'cell',
      `cell-${this.props.number}`,
      this.isDisabled() ? 'disabled' : '',
      this.props.type
    ].join(' ');
  }

  getIconClassNames() {
    return [
      `icon-${typeToIcon(this.props.type)}`,
      'icon-2x'
    ].join(' ');
  }

  getImageStyle(): {backgroundImage: string, backgroundSize: string} {
    if (this.props.opponentId) {
      return {
        backgroundImage: `url(${Routes.Facebook.avatar(this.props.opponentId as string)})`,
        backgroundSize: '76px 76px'
      };
    }

    return null;
  }

  getProgressImage() {
    var sub = this.props.score,
        max = (sub.me >= sub.them) ? 'me' : 'them',
        color = (max == 'me') ? 'red' : 'blue',
        score = parseInt(sub[max], 10);

    return progressImage(score, color);
  }

}

