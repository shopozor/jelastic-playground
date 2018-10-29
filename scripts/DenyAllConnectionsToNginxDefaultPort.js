var APPID = getParam("TARGET_APPID");
var resp = jelastic.environment.security.GetRules(APPID, session);
return resp;
