import { ServiceConfiguration } from 'meteor/service-configuration';

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      clientId: "b968d6114e012354620d",
      loginStyle: "redirect",
      secret: "87d28ce9ee6e357d978e8ad68440c001d7ddc425"
    }
  }
);