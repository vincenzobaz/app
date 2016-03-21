import {RawSubject, Subject} from "./Subject";
import {SubjectType} from "./SubjectType";

export interface RawPageSubject extends RawSubject {
  name: string;
  pageId: string;
  photoUrl: string;
}

export class PageSubject extends Subject {

  
  constructor(public name: string, public pageId: string, public photoUrl: string, public type: SubjectType) {
    super();
  }
  
  static fromRaw(data: RawPageSubject) {
    return new PageSubject(data.name, data.pageId, data.photoUrl, data.type);
  }

}
