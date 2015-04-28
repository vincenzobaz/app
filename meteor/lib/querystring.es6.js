
Querystring = {

  stringify(value) {
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    return value + '';
  },

  encode(props) {
    return Object.keys(props).map(key =>
      `${key}=${encodeURIComponent(this.stringify(props[key]))}`
    ).join('&');
  }

};

