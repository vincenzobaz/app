import {RawSubject, Subject} from "./Subject";
import {SubjectType} from "./SubjectType";

export interface RawPageSubject extends RawSubject {
  name: string;
  pageId: string;
  photoUrl: string;
}

export class PageSubject extends Subject {
  private _name:string;
  private _pageId:string;
  private _photoUrl:string;
  private _type:SubjectType;
  
  constructor(name: string, pageId: string, photoUrl: string, type: SubjectType) {
    super();
    this._name = name;
    this._pageId = pageId;
    this._photoUrl = photoUrl;
    this._type = type;
  }

  get name() {
    return this._name;
  }
  
  get pageId() {
    return this._pageId;
  }
  
  get photoUrl() {
    return this._photoUrl;
  }
  
  get type() {
    return this._type;
  }
  
  static fromRaw(data: RawPageSubject) {
    return new PageSubject(data.name, data.pageId, data.photoUrl, data.type);
  }

}
