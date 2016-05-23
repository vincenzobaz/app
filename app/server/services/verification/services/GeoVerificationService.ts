import {GeoQuestion} from '../../../../common/models/questions/geolocation/GeoQuestion';
import {GeoAnswer} from '../../../../common/models/questions/answers/GeoAnswer';
import {Location} from '../../../../common/models/questions/geolocation/Location';
import * as _ from 'lodash';
import {GeoNameEntityCollection} from "../../../collections/GeoNameEntityCollection";
import {GeoNameEntity} from "../../../../common/models/GeoNameEntity";



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
    console.log("Geverification received the following answer", answer);
    const entity: GeoNameEntity = GeoNameEntityCollection.findOne({
      loc: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [answer.data.longitude, answer.data.latitude]
          },
          $maxDistance: 100000,
        }
      },
      country_code: {$exists: true},
      feature_class: "P"
    });
    
    const correctEntity: GeoNameEntity = GeoNameEntityCollection.findOne({
      loc: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat]
          },
          $maxDistance: 100000,
        }
      },
      country_code: {$exists: true},
      feature_class: "P"
    });

    
    if (correctEntity && entity) {
      correctEntity.latitude = lat;
      correctEntity.longitude = long;
      question.answer = GeoVerificationService.createAnswerFromEntity(correctEntity);
      entity.latitude = answer.data.longitude;
      entity.latitude = answer.data.latitude;
      question.userAnswer = GeoVerificationService.createAnswerFromEntity(entity);
      if (correctEntity.admin1Code && correctEntity.admin1Code.length > 0) {
        if (correctEntity.admin2Code && correctEntity.admin2Code.length > 0) {
          if (entity.admin1Code == correctEntity.admin1Code && entity.admin2Code == correctEntity.admin2Code) {
            question.correct = true;
            return 1;
          } else {
            question.correct = false;
            return 0;
          }
        } else {
          if (entity.admin1Code == correctEntity.admin1Code) {
            question.correct = true;
            return 1;
          } else {
            question.correct = false;
            return 0;
          }
        }
      }
    }

    //If our geolocation data isn't sufficient we give the player the point
    question.correct = true;
    return 1;

  }

  static createAnswerFromEntity(entity: GeoNameEntity): GeoAnswer {
    const location: Location = new Location(
        entity.latitude,
        entity.longitude,
        entity.name,
        entity.countryCode,
        entity.admin1Code,
        entity.admin2Code,
        entity.admin3Code,
        entity.admin4Code
    );
    return new GeoAnswer(location);
  }


}

