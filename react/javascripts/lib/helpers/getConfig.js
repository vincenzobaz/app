
'use strict';

module.exports = function getConfig(serviceName) {
  return ServiceConfiguration.configurations.findOne({
    service: serviceName
  });
};

