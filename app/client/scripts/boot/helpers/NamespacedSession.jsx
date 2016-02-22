
function NamespacedSession(ns) {
  const nsKey = (key) => `${ns}.${key}`;

  return {
    set(key, value) {
      if (typeof key === 'object') {
        for (let k in key) {
          this.set(nsKey(k), key[k]);
        }
        return;
      }

      Session.set(nsKey(key), value);
    },

    setDefault(key, value) {
      if (typeof key === 'object') {
        for (let k in key) {
          this.setDefault(nsKey(k), key[k]);
        }
        return;
      }

      Session.setDefault(key, value);
    },

    get(key) {
      return Session.get(nsKey(key));
    },

    equals(key, value) {
      return Session.equals(nsKey(key), value);
    }
  };
};

module.exports = {
  NamespacedSession: NamespacedSession
};