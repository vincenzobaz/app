Marker = class Marker {

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

GeoData = class GeoData {

    /**
     *
     * @param {Marker} marker
     */
    constructor(marker) {
        this.marker = marker;
    }

    /**
     * Contains the marker put by the user
     * @type {Marker}
     */
    getMarker() {
        return this.marker;
    }
};

/**
 * @extends {Answer}
 */
GeoAnswer = class GeoAnswer {

    /**
     *
     * @param {GeoData} data
     */
    constructor(data) {
        this.data = data;
    }
    /**
     * A data object
     * @type {GeoData}
     */
    getData() {
        return this.data;
    }
};

GeoVerificationService = class GeoVerificationService {
    /**
     * verifies if the answer provided is at the correct location
     *
     * @param {GeoQuestion} question
     * @param {GeoAnswer} answer
     *
     * @return {number} 1 for correct answer 0 for incorrect
     */

        static verifyAnswer(question, answer)  {


        const pickedLocation = answer.getData().getMarker();
        const correctLocation = question.getAnswer();

        const distance = Math.sqrt(
            Math.pow(pickedLocation.getLatitude() - correctLocation.getLatitude(), 2) +
            Math.pow(pickedLocation.getLongitude() - correctLocation.getLongitude(), 2));


        console.error("Geo answer correct", question.getAnswer());
        console.error("Geo answer given", answer.getData().getMarker());
        console.error("Geo allowed distance", question.getRange());
        console.error("Geo actuall distance", distance);
        return distance < question.getRange() ? 1 : 0;
    }
};
