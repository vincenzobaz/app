import {Answer} from "./Answer";
import {Location} from '../../../../common/models/questions/geolocation/Location';

export class GeoAnswer extends Answer {


  constructor(public data: Location) {
    super();
  }

}
