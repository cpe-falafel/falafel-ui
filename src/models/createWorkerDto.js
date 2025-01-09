export default class CreateWorkerDTO {
    constructor(
      groupUid,
      configurationValue,
      uri,
      apiKey,
      lastFluxUid,
    ) {
      this.lastFluxUid = lastFluxUid;
      this.groupUid = groupUid;
      this.configurationValue = configurationValue;
      this.uri = uri;
      this.apiKey = apiKey;
    }
  }
  