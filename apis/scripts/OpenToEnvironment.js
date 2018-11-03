function checkJelasticResponse(response, errorMsg) {
  if (!response || response.result !== 0) {
    throw errorMsg + ": " + response;
  }
}

function addFirewallRule(rule) {
  const APPID = getParam("TARGET_APPID");
  const resp = jelastic.environment.security.AddRule(
    APPID,
    session,
    rule,
    "bl"
  );
  checkJelasticResponse(
    resp,
    "Cannot add firewall rule with APPID <" +
      APPID +
      ">, session <" +
      session +
      ">, nodeGroup bl, and rule <" +
      rule +
      ">"
  );
}

function allowConnectionFromEnv(port, srcEnv) {
  const SUCCESS_RESPONSE = { result: 0 };
  const rule = {
    protocol: "ALL",
    src: "ENVIRONMENT NODES",
    isEnabled: true,
    name: "Allow internal connection",
    action: "ALLOW",
    ports: port,
    type: "CUSTOM",
    direction: "INPUT",
    relatedEnvName: srcEnv
  };
  addFirewallRule(rule);
  return SUCCESS_RESPONSE;
}

return allowConnectionFromEnv(getParam("port"), getParam("srcEnv"));
