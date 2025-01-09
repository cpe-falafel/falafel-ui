import {FilterNode} from "./FilterNode";

export interface DrawboxFilterNodeData{
    src: string;
}

export interface DrawboxFilterNode extends FilterNode<"drawbox", DrawboxFilterNodeData, 1, 1>{ }