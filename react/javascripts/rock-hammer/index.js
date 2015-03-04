
'use strict';

var loadPlugins = require('./plugins'),
    bindings = require('./bindings');

loadPlugins();
bindings.bindAll();
