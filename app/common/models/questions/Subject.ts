
import {SubjectType} from "./SubjectType";

export interface RawSubject {
    name?: string;
    text?: string;
    comment?: string;
    type: SubjectType;
}

export class Subject implements RawSubject{
  public name: string;
  public text: string;
  public comment: string;
  public type: SubjectType;
  
  constructor() {
    
  }
  
  static fromRaw(data: RawSubject): Subject {
    // switch (data.type) {
    //   case SubjectType.Page:
    //     return PageSubject.fromRaw(<RawPageSubject>data);
    // }
    let subject = new Subject();
    subject.name = "Hello";
    subject.text = "Well whatever";
    subject.type = SubjectType.Page;
    return subject;
  }
}
