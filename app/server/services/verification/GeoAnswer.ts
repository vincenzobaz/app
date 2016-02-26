import { GeoData } from "./GeoData";
import { Answer } from "./AnswerVerificationService";

export class GeoAnswer extends Answer {


  constructor(public data: GeoData) {
    super();
  }

}
