export default class Worker {
    constructor(
      groupUid,
      configurationValue,
      uri,
      apiKey,
      uid = null,
      lastUpdate = null,
      previewUri = null,
      previewKey = null,
      packageKey = null
    ) {
      this.uid = uid;
      this.groupUid = groupUid;
      this.lastUpdate = lastUpdate;
      this.configurationValue = configurationValue;
      this.uri = uri;
      this.apiKey = apiKey;
      this.previewUri = previewUri;
      this.previewKey = previewKey;
      this.packageKey = packageKey;
    }
  }
  