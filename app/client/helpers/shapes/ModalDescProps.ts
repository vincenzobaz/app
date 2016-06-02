import {Game} from "../../models/Game";
import Question from "../../../common/models/Question";
import {Tile} from "../../../common/models/Tile";

export interface ModalProps {
    game: Game;
    onRequestHide?: Function;
    questions: Question[];
    tile: Tile;
}


export interface ModalDescProps {
  element: any;
  props: ModalProps;
  onDismiss: Function;
}
