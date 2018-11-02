export function checkJelasticResponse(response, errorMsg) {
  if (!response || response.result !== 0) {
    throw errorMsg + ": " + response;
  }
}
