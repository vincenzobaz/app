import { Subject, RawSubject, CommentSubject }         from "./Subject";
import { SUBJECT_TYPE }                from "./SubjectType";
import { RawPageSubject, PageSubject } from "./PageSubject";

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

      default:
        console.error("SubjectFactor: Unknown subject type: ", data.type);
    }

    return subject;
  }
}

