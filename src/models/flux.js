export default class Flux {
    constructor(
      uid = null,
      name,
      owner = null,
      value,
      ressourceDependencies = null,
      lastEdited = null
    ) {
      this.uid = uid;
      this.name = name;
      this.owner = owner;
      this.value = value;
      this.ressourceDependencies = ressourceDependencies;
      this.lastEdited = lastEdited;
    }
}
  