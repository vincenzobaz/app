
/* global ServiceConfiguration */

'use strict';

Reminisce.getConfig = (serviceName) =>
  ServiceConfiguration.configurations.findOne({
    service: serviceName
  });

