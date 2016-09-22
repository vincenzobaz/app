
import { RawSubject, Subject } from "./Subject";

export interface RawPageSubject extends RawSubject {
  pageId: string;
}

export class PageSubject extends Subject {

  public pageId: string;

  constructor(data: RawPageSubject) {
    super(data);

    this.pageId = data.pageId;
  }

}

