function checkJelasticResponse(response, errorMsg) {
  if (!response || response.result !== 0) {
    throw errorMsg + ": " + response;
  }
}

function getFirewallRules() {
  const APPID = getParam("TARGET_APPID");
  const resp = jelastic.environment.security.GetRules(
    APPID,
    session,
    "bl",
    "INPUT"
  );
  checkJelasticResponse(
    resp,
    "Cannot get firewall rules with APPID <" +
      APPID +
      ">, session <" +
      session +
      ">, nodeGroup <bl>, and direction <INPUT>"
  );
  return resp.rules;
}

function editFirewallRule(rule) {
  const APPID = getParam("TARGET_APPID");
  const resp = jelastic.environment.security.EditRule(APPID, session, rule);
  checkJelasticResponse(
    resp,
    "Cannot edit firewall rule with APPID <" +
      APPID +
      ">, session <" +
      session +
      "> and rule <" +
      rule +
      ">"
  );
}

function denyAllConnectionsToNginxDefaultPort() {
  const SUCCESS_RESPONSE = { result: 0 };
  const rules = getFirewallRules();
  for (var key in rules) {
    var rule = rules[key];
    if (rule.ports == 80) {
      rule.name = "Deny HTTP";
      rule.action = "DENY";
      editFirewallRule(rule);
      return SUCCESS_RESPONSE;
    }
  }
}

return denyAllConnectionsToNginxDefaultPort();
