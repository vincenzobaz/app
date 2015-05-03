
Server = function(){};

Server.fetchGameBoard = function(userId) {
  const user = Meteor.users.findOne(userId);
  const fbUserId = user.services.facebook.id;
  const accessToken = user.services.facebook.accessToken;
  const params = {
    user_id: fbUserId,
    access_token: accessToken
  };

  const url = `${Meteor.settings.gameCreateorUrl}/gameboard?${Querystring.encode(params)}`;
  const get = Meteor.wrapAsync(Meteor.http.get);
  const result = get(url);
  return GameBoard.FromRaw(userId, result.data);
};


Server.fetchData = function(userId) {
  const user = Meteor.users.findOne(userId);
  const fbUserId = user.services.facebook.id;
  const accessToken = user.services.facebook.accessToken;
  const params = {
    user_id: fbUserId,
    access_token: accessToken
  };

  const url = `${Meteor.settings.gameCreateorUrl}/fetchData?${Querystring.encode(params)}`;
  Meteor.http.get(url, function (err, res) {
    console.error(res.statusCode, res.data);
  });
};

