import {Address} from '../../../external_services/OpenStreetMapsHelper';
import {Marker} from '../geolocation/Marker';

export class GeoData {

  /**
   *
   * @param marker lat, long for the place
   * @param place the string location retrieved through reverse geocoding
   */
  constructor(public marker: Marker, public place: Address) {
  }

}
