import {SubjectType, SUBJECT_TYPE} from "./SubjectType";

export interface RawSubject {
  name?: string;
  text?: string;
  comment?: string;
  thumbnailUrl: string;
  photoUrl: string;
  facebookImageUrl?: string;
  imageUrl?: string;
  url?: string;
  type: SubjectType;
}

export class Subject implements RawSubject {
  public name: string;
  public text: string;
  public comment: string;
  public type: SubjectType;
  public interactive: boolean;
  public thumbnailUrl: string;
  public photoUrl: string;
  public url: string;

  constructor() {

  }


}
