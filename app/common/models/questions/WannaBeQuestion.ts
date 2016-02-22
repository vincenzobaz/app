
import {Kind} from "./Kind";
import {QuestionType} from "./QuestionType";
import {Subject} from "./Subject";
export class WannaBeQuestion {
  constructor(public _id:string ,
              public subject:Subject,
              public type:QuestionType,
              public kind:Kind)
  {}
}
