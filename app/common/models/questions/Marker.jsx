export class Marker {

  /**
   *
   * @param {number} latitude
   * @param {number} longitude
   */
  constructor (latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Returns the latitude
   * @return {number}
   */
  getLatitude() {
    return this.latitude;
  }

  /**
   * Returns the longitude
   * @return {number}
   */
  getLongitude() {
    return this.longitude;
  }
};