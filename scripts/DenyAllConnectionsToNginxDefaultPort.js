var SUCCESS_RESPONSE = { result: 0 };

function checkJelasticResponse(response, errorMsg) {
  if (!response || response.result !== 0) {
    throw errorMsg + response;
  }
}

function getFirewallRules() {
  var APPID = getParam("TARGET_APPID");
  var resp = jelastic.environment.security.GetRules(
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

function denyAllConnectionsToNginxDefaultPort() {
  var APPID = getParam("TARGET_APPID");
  var rules = getFirewallRules();
  for (var key in rules) {
    var rule = rules[key];
    if (rule.ports == 80) {
      rule.name = "Allow HTTP";
      rule.action = "ALLOW";
      var resp = jelastic.environment.security.EditRule(APPID, session, rule);
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
      return SUCCESS_RESPONSE;
    }
  }
}

return denyAllConnectionsToNginxDefaultPort();
