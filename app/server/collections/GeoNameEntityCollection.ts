
import {GeoNameEntity, RawGeoNameEntity} from "../../common/models/GeoNameEntity";
export const GeoNameEntityCollection = new Mongo.Collection<GeoNameEntity>("geolocations", {
transform(doc: RawGeoNameEntity){
  return GeoNameEntity.fromRaw(doc);
}
});

