export interface RawGeoNameEntity {
  _id: Mongo.ObjectID;
  geonameid: number;
  name: string;
  asciiname: string;
  alternatenames: string;
  feature_class: string;
  feature_code: string;
  country_code: string;
  cc2: string;
  admin1_code: string;
  admin2_code: string;
  admin3_code: string;
  admin4_code: string;
  population: number;
  elevation: number;
  dem: number;
  timezone: string;
  modification_date: Date;
  canonical: string[];
  loc: Loc;
}
interface Loc {
  type: string;
  coordinates: number[]; //index 0: longitude, index 1: latitude
}


export class GeoNameEntity {
  constructor(
      public _id: Mongo.ObjectID,
      public geonameId: number,
      public name: string,
      public asciiName: string,
      public alternateNames: string,
      public featureClass: string,
      public featureCode: string,
      public countryCode: string,
      public cc2: string,
      public longitude: number,
      public latitude: number,
      public admin1Code: string,
      public admin2Code: string,
      public admin3Code: string,
      public admin4Code: string,
      public population: number,
      public elevation: number,
      public dem: number,
      public timezone: string,
      public modificationDate: Date,
      public canonincal: string[]

  )
  {}

  static fromRaw(raw: RawGeoNameEntity) {
    return new GeoNameEntity(
        raw._id,
        raw.geonameid,
        raw.name,
        raw.asciiname,
        raw.alternatenames,
        raw.feature_class,
        raw.feature_code,
        raw.country_code,
        raw.cc2,
        raw.loc.coordinates[0],
        raw.loc.coordinates[1],
        raw.admin1_code, 
        raw.admin2_code, 
        raw.admin3_code, 
        raw.admin4_code,
        raw.population,
        raw.elevation,
        raw.dem,
        raw.timezone,
        raw.modification_date,
        raw.canonical
    )
  }

}
