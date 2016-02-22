
import {NamespacedSession} from './../boot/helpers/NamespacedSession.jsx';
import {JoinRequest, JoinRequests} from './../models/JoinRequest.jsx';


const JoinRequestSession = NamespacedSession('JoinRequestStore');
const callMeteor = Promise.promisify(Meteor.call, Meteor);

function hydrate(req) {
  return new JoinRequest(req);
}

export const JoinRequestStore = {

  list() {
    return JoinRequests.find().fetch().map(hydrate);
  },

  accept(joinRequest) {
    const id = joinRequest.getId && joinRequest.getId() || joinRequest;
    return callMeteor('JoinRequest.accept', id);
  },

  decline(joinRequest) {
    const id = joinRequest.getId && joinRequest.getId() || joinRequest;
    return callMeteor('JoinRequest.decline', id);
  },

  send(friendId) {
    return callMeteor('JoinRequest.send', friendId);
  }

};


