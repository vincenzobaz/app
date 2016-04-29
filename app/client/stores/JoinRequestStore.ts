
import {JoinRequests, JoinRequest} from "../models/JoinRequest";



export module JoinRequestStore {

  export function list(): JoinRequest[] | {} {
    return JoinRequests.find().fetch();
  }

  export function accept(joinRequest: JoinRequest) {
    return Meteor.call('JoinRequest.accept', joinRequest._id);
  }

  export function decline(joinRequest: JoinRequest) {
    return Meteor.call('JoinRequest.decline', joinRequest._id);
  }

  export function send(friendId: string | Mongo.ObjectID) {
    return Meteor.call('JoinRequest.send', friendId);
  }

};


