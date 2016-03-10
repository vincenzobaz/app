import {Game} from "./Game";

var M = Mongo;
export class TestCollection {
  
  public collection: Mongo.Collection<Game>;
  public cat: string = "Miau";
  
  constructor() {
    // this.collection = new Mongo.Collection<Game>("Testing");
    console.info("We got created " + this.cat);
  }
  static saySomething() {
    console.info("The thing is a " + M);
  }
}
