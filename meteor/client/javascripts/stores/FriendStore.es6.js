
function hydrate(friend) {
  if (!(friend instanceof Friend)) {
    friend = new Friend(friend);
  }
  return friend;
}

Reminisce.Store.FriendStore = {

  list() {
    return Friends.find().fetch().map(hydrate);
  }

};

