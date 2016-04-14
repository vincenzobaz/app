
import { SubjectType } from "./SubjectType";

export interface RawPostedBy {
  userId?: string;
  userName?: string;
}

export class PostedBy implements RawPostedBy {
  public userId: string;
  public userName: string;

  constructor(data: RawPostedBy) {
    this.userId   = data.userId;
    this.userName = data.userName;
  }
}

export interface RawSubject {
  name: string;
  type: SubjectType;
  photoUrl: string;
  from: RawPostedBy;
  imageUrl?: string;
  thumbnailUrl: string;
  facebookImageUrl?: string;
  comment?: string;
  text?: string;
  url?: string;
}

export class Subject implements RawSubject {

    public name: string;
    public type: SubjectType;
    public photoUrl: string;
    public from: PostedBy;
    public text: string;
    public comment: string;
    public interactive: boolean;
    public thumbnailUrl: string;
    public url: string;

  constructor(data: RawSubject) {
    this.name         = data.name;
    this.type         = data.type;
    this.photoUrl     = data.photoUrl;
    this.text         = data.text;
    this.comment      = data.comment;
    this.interactive  = false;
    this.thumbnailUrl = data.thumbnailUrl || data.imageUrl || data.facebookImageUrl || data.photoUrl;
    this.url          = data.url;

    if (data.from != null) {
      this.from = new PostedBy(data.from);
    }
  }

}

