
import { GeoQuestion } from "../../../common/models/questions/GeoQuestion";
import { GeoAnswer } from "./GeoAnswer";


export default class GeoVerificationService {
    /**
     * verifies if the answer provided is at the correct location
     *
     * @param {GeoQuestion} question
     * @param {GeoAnswer} answer
     *
     * @return {number} 1 for correct answer 0 for incorrect
     */

        static verifyAnswer(question: GeoQuestion, answer: GeoAnswer)  {


        const pickedLocation = answer.data.marker;
        const correctLocation = question.answer;

        const distance = Math.sqrt(
            Math.pow(pickedLocation.latitude - correctLocation.latitude, 2) +
            Math.pow(pickedLocation.longitude - correctLocation.longitude, 2));

      
        return distance < question.range ? 1 : 0;
    }
};
