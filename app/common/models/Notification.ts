
interface RawNotification {
    _id?: Mongo.ObjectID;
    userId: string;
    message: string;
    dateCreated: Date;
    shown: boolean;
}

export class Notification {

    constructor(
      public _id: Mongo.ObjectID | string,
      public userId: Mongo.ObjectID | string,
      public message: string,
      public dateCreated: Date = new Date(),
      public shown: boolean = false
    ) {}

  static fromRaw(data: RawNotification) {
    return new Notification(
      data._id, data.userId,
      data.message, data.dateCreated, data.shown
    );
  }

}

