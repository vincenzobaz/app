
JoinRequestRepository = {

  save(joinRequest) {
    var doc = _.pick(joinRequest, 'from', 'to', 'gameId');

    if (joinRequest._id) {
      JoinRequest.update(joinRequest._id, {$set: doc});
    } else {
      joinRequest._id = JoinRequests.insert(doc);
    }

    return joinRequest._id;
  }

};

