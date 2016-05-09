import {Address} from '../../../../common/external_services/OpenStreetMapsHelper';
import * as url from 'url';
import {GeoQuestion} from '../../../../common/models/questions/geolocation/GeoQuestion';
import {GeoAnswer} from '../../../../common/models/questions/answers/GeoAnswer';
import {Location} from '../../../../common/models/questions/geolocation/Location';
import * as _ from 'lodash';



export class GeoVerificationService {
  /**
   * verifies if the answer provided is at the correct location
   *
   * @param {GeoQuestion} question
   * @param {GeoAnswer} answer
   *
   * @return {number} 1 for correct answer 0 for incorrect
   */

  static verifyAnswer(question: GeoQuestion, answer: GeoAnswer) {
    const correctLocation: Location = question.answer;
    const lat = correctLocation.latitude;
    const long = correctLocation.longitude;
    const email: string = "info@reminisce.me";
    const zoom: number = 18;
    let correct = 0;

   _.forIn(answer.data.place, (answerValue, answerKey) => {
     _.forIn(question.answer, (correctValue, correctKey) => {
         console.log(`The place is: answer => ${answerKey}:${answerValue}:| correct => ${correctKey}:${correctValue} `);
       //As Country is too broad
       if (answerValue == correctValue && correctKey != 'country') {
         console.log(`********** The place is correct: answer => ${answerValue}:${answerKey} | correct => ${correctValue} ${correctKey}`);
         correct = 1;
       }
     })
     console.log("We are done *************************************************")
   });

    return correct

  }


}

