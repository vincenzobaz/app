
import { JoinRequests, JoinRequest } from "../models/JoinRequest";

export module JoinRequestStore {

  export function list(): JoinRequest[] {
    return <JoinRequest[]>JoinRequests.find().fetch();
  }

  export function accept(joinRequest: JoinRequest) {
    return Meteor.call('JoinRequest.accept', joinRequest._id);
  }

  export function decline(joinRequest: JoinRequest) {
    return Meteor.call('JoinRequest.decline', joinRequest._id);
  }

  export function send(fbRequest: string, fromFbId: string, toFbId: string) {
    console.log("we are seding a join request");
    return Meteor.call('JoinRequest.send', fbRequest, fromFbId, toFbId);
  }

};

