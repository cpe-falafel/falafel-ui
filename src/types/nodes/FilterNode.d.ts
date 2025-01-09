export interface FilterNode<TYPENAME extends string, DATATYPE extends {[key:string]:any}, IN_COUNT extends number, OUT_COUNT extends number> {
    type: TYPENAME;
    properties: DATATYPE;
    in: [string, ...string[]] & { length: IN_COUNT };
    out: [string, ...string[]] & { length: OUT_COUNT };
}

export interface GenericFilterNode extends
    FilterNode<string, {[key:string]:any}, number, number>{

}