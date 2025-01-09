export default class CreateFluxDTO {
    constructor(name, owner = 'null') {
        this.name = name;
        this.owner = owner;
    }
}
