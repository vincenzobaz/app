
var JoinRequestSession = NamespacedSession('JoinRequestStore');

function hydrate(req) {
  return new Reminisce.Model.JoinRequest(req);
}

Reminisce.Store.JoinRequestStore = {

  list() {
    return Reminisce.Collection.JoinRequests.find().fetch().map(hydrate);
  },

  accept(joinRequest) {
    const id = joinRequest.getId && joinRequest.getId() || joinRequest;
    Meteor.call('JoinRequest.accept', id);
  },

  decline(joinRequest) {
    const id = joinRequest.getId && joinRequest.getId() || joinRequest;
    Meteor.call('JoinRequest.decline', id);
  },

  send(user) {
    const id = user.getId && user.getId() || user;
    Meteor.call('JoinRequest.send', id);
  }

};

