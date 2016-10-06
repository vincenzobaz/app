import {JoinRequests} from '../collections/JoinRequests';

export const JoinRequestRepository = {

  save(joinRequest) {
    if (joinRequest._id) {
      JoinRequests.upsert(joinRequest._id, {$set: joinRequest});
    } else {
      joinRequest._id = JoinRequests.insert(joinRequest);
    }

    return joinRequest._id;
  },

  removeRequestsOf(fbUserId) {
    return JoinRequests.remove({$or: [{from: fbUserId}, {to: fbUserId}]})
  }

};

