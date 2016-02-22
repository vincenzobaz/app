
/* global ServiceConfiguration */

'use strict';

export const getConfig = (serviceName) =>
  ServiceConfiguration.configurations.findOne({
    service: serviceName
  });

