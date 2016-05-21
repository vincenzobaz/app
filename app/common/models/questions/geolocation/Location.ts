import {GeoNameEntity} from "../../GeoNameEntity";

export class Location {
  constructor(public latitude: number,
              public longitude: number,
              public name?: string,
              public countryCode?: string,
              public admin1Code?: string,
              public admin2Code?: string,
              public admin3Code?: string,
              public admin4Code?: string
  ) {
  }
}

