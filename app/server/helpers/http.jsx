
const getSync  = Meteor.wrapAsync(Meteor.http.get);
const getAsync = Meteor.http.get;

const delSync  = Meteor.wrapAsync(Meteor.http.del);
const delAsync = Meteor.http.del;

export const HTTPHelper = {

  getSync: getSync,
  getAsync: getAsync,

  delSync: delSync,
  delAsync: delAsync,

  get(url, callback) {
    if (typeof callback !== 'function') {
      return HTTPHelper.getSync(url);
    }

    return HTTPHelper.getAsync(url, callback);
  },

  del(url, callback) {
    if (typeof callback !== 'function') {
      return HTTPHelper.delSync(url);
    }

    return HTTPHelper.delAsync(url, callback);
  }

};

