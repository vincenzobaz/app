export class TrainingStatus {
  constructor(public value: string) {}
  
  toString() {
    return this.value;
  }
  
  
  static NotStarted = new TrainingStatus("not started");
  
}
