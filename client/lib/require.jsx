
const mapping = {
  'react'               : 'React',
  'array-shuffle'       : 'shuffle',
  'camel-case'          : 'camelCase',
  'debug'               : 'debug',
  'events'              : 'NodeEvents',
  'fuzzy'               : 'fuzzy',
  'moment'              : 'moment',
  'util'                : 'NodeUtil',
  'pascal-case'         : 'pascalCase',
  'pluralize'           : 'pluralize',
  'querystring'         : 'queryString',
  'react-bootstrap'     : 'ReactBootstrap',
  'react-d3-components' : 'ReactD3Components',
  'react-localstorage'  : 'ReactLocalStorage',
  'react-typeahead'     : 'ReactTypeahead',
  'sortablejs'          : 'Sortable',
  'timer-machine'       : 'TimerMachine'
};

const debug = window.debug('require');

require = (package) => {
  if (mapping[package] !== undefined) {
    debug('Loading module "%s" from window.%s', package, mapping[package]);
    return window[mapping[package]];
  }

  if (window.Reminisce[package] !== undefined) {
    debug('Loading module "%s" from window.Reminisce.%s', package, package);
    return window.Reminisce[package];
  }

  if (window[package] !== undefined) {
    debug('Loading module "%s" from window.%s', package, package);
    return window[package];
  }

  throw new Error('Cannot find package "' + package + '".');
}

