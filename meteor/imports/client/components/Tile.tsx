import {Tooltip} from "react-bootstrap";
import {ModalStore} from "../stores/ModalStore";
import {Score} from "../../common/models/Score";
import {Kind} from "../../common/models/questions/common/Kind";
import {ProgressImage} from "./tile/ProgressImage";
import {StateCollector} from "../StateCollector";
import {ModalDescProps} from "../helpers/shapes/ModalDescProps";

const icons = {
  Order: 'sort', // 'sort-up'
  MultipleChoice: 'list',
  Timeline: 'time', // 'calendar'
  Geolocation: 'map-marker', // 'geo'
  Misc: 'question'
};

function typeToIcon(type) {
  return icons[type] || icons.Misc;
}

interface TileProps {
  title: string;
  placement: string;
  questionModal: ModalDescProps;
  number: number;
  type: Kind;
  opponentId?: string | Mongo.ObjectID;
  score: Score;
  disabled: boolean;
  userAnswered?: boolean;
  enemyAnswered?: boolean;
  answered?: boolean;
  winningTile?: boolean
}

export class Tile extends React.Component<TileProps, {}> {

  render() {
    return (
      <a className={this.getCellClassNames()} onClick={this.onClick.bind(this)}>
        <ProgressImage type={this.props.type} score={this.props.score} winningTile={this.props.winningTile} onClick={this.onClick.bind(this)} />
        <i className={this.getIconClassNames()} />
      </a>
    );
  }

  onClick(e) {
    e.preventDefault();

    if (this.isDisabled()) {
      return;
    }
    StateCollector.setTile(this.props.questionModal.props.tile);
    ModalStore.showModal(this.props.questionModal);
  }

  isDisabled() {
    return this.props.disabled && !this.props.answered;
  }

  getCellClassNames() {
    return [
      'cell',
      `cell-${this.props.number}`,
      this.isDisabled() ? 'disabled' : '',
      this.props.type,
      this.tileBackgroundStyle(this.props.score)
    ].join(' ');
  }

  tileBackgroundStyle(score: Score): string {
    if (score.me >= 0 && score.them >= 0) {
      return "both-answered"
    } else if (score.me >= 0) {
      return "user-answered";
    } else if (score.them >= 0) {
      return "enemy-answered"
    } else {
      return ""
    }

  }

  getIconClassNames() {
    return [
      `icon-${typeToIcon(this.props.type)}`,
      'icon-2x'
    ].join(' ');
  }

}

