export class Marker {

  /**
   *
   * @param {number} latitude
   * @param {number} longitude
   */
  constructor (private latitude: number, private longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Returns the latitude
   * @return {number}
   */
  getLatitude(): number {
    return this.latitude;
  }

  /**
   * Returns the longitude
   * @return {number}
   */
  getLongitude(): number {
    return this.longitude;
  }
};