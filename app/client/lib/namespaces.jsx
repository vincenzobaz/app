
let R = {};

if (typeof Reminisce !== 'object') {
  Reminisce = {
    Collection: {},
    Model: {},
    Store: {}
  };

  R = Reminisce;
}

module.exports = {
    R: R,
};
