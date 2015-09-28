
const mapping = {
  'react'               : 'React',
  'array-shuffle'       : 'shuffle',
  'camel-case'          : 'camelCase',
  'debug'               : 'debug',
  'fuzzy'               : 'fuzzy',
  'pascal-case'         : 'pascalCase',
  'pluralize'           : 'pluralize',
  'querystring'         : 'queryString',
  'react-bootstrap'     : 'ReactBootstrap',
  'react-d3-components' : 'ReactD3Components',
  'react-localstorage'  : 'ReactLocalStorage',
  'sortablejs'          : 'Sortable',
  'timer-machine'       : 'TimerMachine'
};

require = (package) => window[mapping[package]];

