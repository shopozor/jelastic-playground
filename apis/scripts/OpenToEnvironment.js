function checkJelasticResponse(response, errorMsg) {
  if (!response || response.result !== 0) {
    throw errorMsg + ": " + response;
  }
}

function addFirewallRule(envName, rule) {
  const resp = jelastic.environment.security.AddRule(
    envName,
    session,
    rule,
    "bl"
  );
  checkJelasticResponse(
    resp,
    "Cannot add firewall rule with envName <" +
      envName +
      ">, session <" +
      session +
      ">, nodeGroup bl, and rule <" +
      rule +
      ">"
  );
}

function getNodesInfo(envName) {
  const resp = jelastic.environment.control.GetEnvInfo(envName, session);
  checkJelasticResponse(
    resp,
    "Cannot get environment info of environment <" +
      envName +
      ">, session <" +
      session +
      ">"
  );
  return resp.nodes;
}

function getListOfNodejsNodeIPs(envName) {
  var result = [];
  const nodes = getNodesInfo(envName);
  for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i];
    if (node.nodeType == "nodejs") {
      result.push(node.intIP);
    }
  }
  return result.toString();
}

function allowConnectionFromEnv(port, envToOpen, envToAllow) {
  const SUCCESS_RESPONSE = { result: 0 };
  const rule = {
    protocol: "ALL",
    src: getListOfNodejsNodeIPs(envToAllow),
    isEnabled: true,
    name: "Allow internal connection",
    action: "ALLOW",
    ports: port,
    type: "CUSTOM",
    direction: "INPUT",
    relatedEnvName: envToOpen
  };
  addFirewallRule(envToOpen, rule);
  return SUCCESS_RESPONSE;
}

return allowConnectionFromEnv(
  getParam("port"),
  getParam("envToOpen"),
  getParam("envToAllow")
);
