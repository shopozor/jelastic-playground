function checkJelasticResponse(response, errorMsg) {
  if (!response || response.result !== 0) {
    throw errorMsg + ': ' + response
  }
}

function getNodesInfo(envName) {
  const resp = jelastic.environment.control.GetEnvInfo(envName, session)
  checkJelasticResponse(
    resp,
    'Cannot get environment info of environment <' +
      envName +
      '>, session <' +
      session +
      '>'
  )
  return resp.nodes
}

function getListOfLoadBalancerNodeIPs() {
  var result = []
  const nodes = getNodesInfo(getParam('TARGET_APPID'))
  for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i]
    if (node.nodeType == 'nginx-dockerized') {
      result.push(node.intIP)
    }
  }
  return result
}

function replaceInBody(path, pattern, replacement) {
  const APPID = getParam('TARGET_APPID')
  const resp = jelastic.environment.file.ReplaceInBody(
    APPID,
    session,
    path,
    pattern,
    replacement,
    '', // nth
    '', // nodeType
    'cp'
  )
  checkJelasticResponse(
    resp,
    'Replacing pattern <' +
      pattern +
      '> with <' +
      replacement +
      '> in file <' +
      path +
      '> failed!'
  )
}

function replaceWsgiPlaceholders(
  pathToFile,
  pathToVirtualEnv,
  secretKey,
  domainNames,
  databaseUrl,
  cacheUrl
) {
  replaceInBody(pathToFile, 'PATH_TO_VIRTUAL_ENV_PLACEHOLDER', pathToVirtualEnv)
  replaceInBody(pathToFile, 'SECRET_KEY_PLACEHOLDER', secretKey)
  replaceInBody(
    pathToFile,
    'ALLOWED_HOSTS_PLACEHOLDER',
    domainNames
      .split(',')
      .concat(getListOfLoadBalancerNodeIPs())
      .toString()
  )
  replaceInBody(pathToFile, 'DATABASE_URL_PLACEHOLDER', databaseUrl)
  replaceInBody(pathToFile, 'CACHE_URL_PLACEHOLDER', cacheUrl)
  const SUCCESS_RESPONSE = { result: 0 }
  return SUCCESS_RESPONSE
}

return replaceWsgiPlaceholders(
  getParam('pathToFile'),
  getParam('pathToVirtualEnv'),
  getParam('secretKey'),
  getParam('domainNames'),
  getParam('databaseUrl'),
  getParam('cacheUrl')
)
