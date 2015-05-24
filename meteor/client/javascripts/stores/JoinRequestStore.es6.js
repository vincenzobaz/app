
const JoinRequestSession = NamespacedSession('JoinRequestStore');
const callMeteor = Promise.promisify(Meteor.call, Meteor);

function hydrate(req) {
  return new Reminisce.Model.JoinRequest(req);
}

Reminisce.Store.JoinRequestStore = {

  list() {
    return Reminisce.Collection.JoinRequests.find().fetch().map(hydrate);
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

