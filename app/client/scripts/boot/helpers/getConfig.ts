

export const getConfig = (serviceName) =>
  ServiceConfiguration.configurations.findOne({
    service: serviceName
  });

