var APPID = getParam("TARGET_APPID");
var resp = jelastic.environment.security.GetRules(APPID, session);

return JSON.stringify(jelastic);

// this doesn't work:
// return resp.rules.find(function(element) {
//   return element.ports == 80;
// });

/*
The answer is of type:
{
  "result": 0,
  "className": "com.hivext.api.system.persistence.FirewallRule",
  "rules": [
    {
      "protocol": "ALL",
      "dst": "ALL",
      "src": "",
      "isEnabled": true,
      "name": "Allow Platform Infrastructure",
      "action": "ALLOW",
      "id": 0,
      "ports": "",
      "priority": 1,
      "type": "CUSTOM"
    },
    ...
  ]
}
*/
