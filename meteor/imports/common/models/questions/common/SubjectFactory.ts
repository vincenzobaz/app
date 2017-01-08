import { Subject, RawSubject, CommentSubject }         from "./Subject";
import { SUBJECT_TYPE }                from "./SubjectType";
import { RawPageSubject, PageSubject } from "./PageSubject";
import {getIconPath, getReactionText} from "../../../../client/helpers/reactions";

export module SubjectFactory {

  export function fromRaw(data: RawSubject): Subject {
    let subject: Subject = null;

    switch (data.type) {
      case SUBJECT_TYPE.Page:
        subject = new PageSubject(<RawPageSubject>data);
        break;

      case SUBJECT_TYPE.Comment:
        subject = new CommentSubject(data);
        break;
      case SUBJECT_TYPE.ImagePost:
      case SUBJECT_TYPE.LinkPost:
      case SUBJECT_TYPE.VideoPost:
      case SUBJECT_TYPE.TextPost:
        subject = new Subject(data);
        break;
      case SUBJECT_TYPE.Reactions:
        subject = new Subject({
            name: '',
            type: data.type,
            text: getReactionText(data.reactionType),
            photoUrl: getIconPath(data.reactionType),
            from: null,
            thumbnailUrl: null
        });
        console.log(data.reactionType);
      break;
      default:
        console.error("SubjectFactor: Unknown subject type: ", data.type);
    }

    return subject;
  }

}

