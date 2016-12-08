
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

interface RawFBNotification {
    _id?: Mongo.ObjectID;
    userId: string;
    fbId: string;
    message: string;
    dateCreated: Date;
    sent: boolean;
}

export class FBNotification {

    constructor(
      public _id: Mongo.ObjectID | string,
      public userId: Mongo.ObjectID | string,
      public fbId: string,
      public message: string,
      public dateCreated: Date = new Date(),
      public sent: boolean = false
    ) {}

  static fromRaw(data: RawFBNotification) {
    return new FBNotification(
      data._id, data.userId, data.fbId,
      data.message, data.dateCreated, data.sent
    );
  }

}
