export default class CreateWorkerDTO {
    constructor(
      group,
      configurationValue,
      uri,
      apiKey,
      lastFluxUid,
    ) {
      this.lastFluxUid = lastFluxUid;
      this.group = group;
      this.configurationValue = configurationValue;
      this.uri = uri;
      this.apiKey = apiKey;
    }
  }
  