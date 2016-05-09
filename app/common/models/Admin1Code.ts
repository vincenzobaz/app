export interface RawAdmin1code {
  _id: Mongo.ObjectID;
  area_code: string;
  name: string;
  alternative_name: string;
  number: number;
}

export class Admin1Code {
  constructor(
      public _id: Mongo.ObjectID,
      public areaCode: string,
      public name: string,
      public alternativeName: string,
      number: number
  ){}

  static fromRaw(raw: RawAdmin1code): Admin1Code {
    return new Admin1Code(
        raw._id,
        raw.area_code,
        raw.name,
        raw.alternative_name,
        raw.number
    )
  }
}
