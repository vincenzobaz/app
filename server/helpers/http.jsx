
const getSync  = Meteor.wrapAsync(Meteor.http.get);
const getAsync = Meteor.http.get;

HTTPHelper = {

  getSync: getSync,
  getAsync: getAsync,

  get(url, callback) {
    if (typeof callback !== 'function') {
      return HTTPHelper.getSync(url);
    }

    return HTTPHelper.getAsync(url, callback);
  }

};

