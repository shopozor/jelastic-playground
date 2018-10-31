function checkJelasticResponse(response, errorMsg) {
  if (!response || response.result !== 0) {
    throw errorMsg + ": " + response;
  }
}

function getPortModifier(port) {
  return port ? ":" + port : "";
}

function apiEndpoint(host, port) {
  return host + getPortModifier(port) + "/api";
}

function imgEndpoint(host, port) {
  return host + getPortModifier(port) + "/img";
}

function replaceInBody(path, pattern, replacement) {
  const APPID = getParam("TARGET_APPID");
  const resp = jelastic.environment.file.ReplaceInBody(
    APPID,
    session,
    path,
    pattern,
    replacement,
    "", // nth
    "", // nodeType
    "cp"
  );
  checkJelasticResponse(
    resp,
    "Replacing pattern <" +
      pattern +
      "> with <" +
      replacement +
      "> in file <" +
      path +
      "> failed!"
  );
}

function replaceEndpointsInConfig(path, host, port) {
  const SUCCESS_RESPONSE = { result: 0 };
  replaceInBody(path, "API_ENDPOINT", apiEndpoint(host, port));
  replaceInBody(path, "IMG_ENDPOINT", imgEndpoint(host, port));
  return SUCCESS_RESPONSE;
}

return replaceEndpointsInConfig(
  getParam("pathToConfig"),
  getParam("apiHost"),
  getParam("apiPort")
);
