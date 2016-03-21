import {Subject, RawSubject} from "./Subject";
import {SUBJECT_TYPE} from "./SubjectType";
import {RawPageSubject, PageSubject} from "./PageSubject";


export module SubjectFactory {
  export function fromRaw(data: RawSubject): Subject {
    let subject: Subject = null;
    switch (data.type) {
      case SUBJECT_TYPE.Page:
        subject =  PageSubject.fromRaw(<RawPageSubject>data);
        break;
      case SUBJECT_TYPE.Comment:
      case SUBJECT_TYPE.ImagePost:
      case SUBJECT_TYPE.LinkPost:
      case SUBJECT_TYPE.VideoPost:
      case SUBJECT_TYPE.TextPost:
        subject = new Subject();
          subject.comment = data.comment;
          subject.text = data.text;
          subject.thumbnailUrl = data.thumbnailUrl;
          subject.name = data.name;
          subject.type = data.type;
          subject.photoUrl = data.photoUrl;
        break;
    }
    if (!subject) {
      console.error("***************** Subject Creation failed", data);
    }
    return subject;
  }
}
