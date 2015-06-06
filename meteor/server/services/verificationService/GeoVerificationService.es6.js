class Marker {

    latitude;
    longitude;

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
}

class GeoData {

    marker;

    /**
     * Contains the marker put by the user
     * @type {Marker}
     */
    getMarker() {
        return this.marker;
    }
}

/**
 * @extends {Answer}
 */
class GeoAnswer {
    /**
     * A data object
     * @type {GeoData}
     */
    getData() {
        return this.data;
    }
}

GeoVerificationService = {
    /**
     * verifies if the answer provided is at the correct location
     *
     * @param {GeoQuestion} question
     * @param {GeoAnswer} answer
     *
     * @return {number} 1 for correct answer 0 for incorrect
     */

        verifyAnswer(question, answer)  {

        const pickedLocation = answer.getData().getMarker();
        const correctLocation = question.getAnswer();

        const distance = Math.sqrt(
            Math.pow(pickedLocation.getLatitude() - correctLocation.getLatitude(), 2) +
            Math.pow(pickedLocation.getLongitude() - correctLocation.getLongitude(), 2));

        return distance < question.getRange() ? 1 : 0;
    }
};
