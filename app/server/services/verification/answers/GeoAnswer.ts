import { GeoData } from "./GeoData";
import {Answer} from "./Answer";

export class GeoAnswer extends Answer {


  constructor(public data: GeoData) {
    super();
  }

}
