
const getSync  = Meteor.wrapAsync(HTTP.get);
const getAsync = HTTP.get;



const delSync  = Meteor.wrapAsync(HTTP.del);
const delAsync = HTTP.del;

const postSync = Meteor.wrapAsync(HTTP.post);
const postAsync = HTTP.post;

export const HTTPHelper = {

  getSync: getSync,
  getAsync: getAsync,

  delSync: delSync,
  delAsync: delAsync,

  postSync: postSync,
  postAsync: postAsync,

  get(url, callback?: Function) {
    if (typeof callback !== 'function') {
      return HTTPHelper.getSync(url);
    }

    return HTTPHelper.getAsync(url, callback);
  },

  del(url, callback?: Function) {
    if (typeof callback !== 'function') {
      return HTTPHelper.delSync(url);
    }

    return HTTPHelper.delAsync(url, callback);
  },

  post(url, req, callback?: Function) {
      if (typeof callback !== 'function') {
          return HTTPHelper.postSync(url, req, callback);
      }

      return HTTPHelper.postAsync(url, req, callback);
  }


};

