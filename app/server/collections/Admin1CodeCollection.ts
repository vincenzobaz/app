
import {Admin1Code, RawAdmin1code} from "../../common/models/Admin1Code";
export const Admin1CodeCollection = new Mongo.Collection<Admin1Code>("admin1Codes", {
      transform(doc: RawAdmin1code){
        return Admin1Code.fromRaw(doc);
      }
    }
);

