
JoinRequestRepository = {

  save(joinRequest) {
    var doc = _.pick(joinRequest, 'from', 'to', 'gameId');

    if (joinRequest.id) {
      JoinRequest.update(joinRequest.id, {$set: doc});
    } else {
      joinRequest.id = JoinRequests.insert(doc);
    }

    return joinRequest.id;
  }

};

