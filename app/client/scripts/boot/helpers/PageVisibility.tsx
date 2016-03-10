
// Code adapted from
// http://www.html5rocks.com/en/tutorials/pagevisibility/intro/


import {EventEmitter} from "events";

class _PageVisibility extends EventEmitter {

  getHiddenProp() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    // if 'hidden' is natively supported just return it
    if ('hidden' in document) {
      return 'hidden';
    }

    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i += 1) {
      if ((prefixes[i] + 'Hidden') in document) {
        return prefixes[i] + 'Hidden';
      }
    }

    // otherwise it's not supported
    return null;
  }


  PageVisibility() {
    var prop = this.getHiddenProp();
    if (prop) {
      var eventName = prop.replace(/[H|h]idden/, '') + 'visibilitychange';
      document.addEventListener(eventName, this.onVisibilityChange.bind(this));
    }
  }
  
  isHidden() {
    var prop = this.getHiddenProp();
    if (!prop) {
      return false;
    }
    return document[prop];
  };


  onVisibilityChange = function onVisibilityChange() {
    this.emit('change');
  };
  
}

export const PageVisibility = new _PageVisibility();
