import {FilterNode} from "./FilterNode";

export interface OutFilterNodeData{
    src: string;
}

export interface OutFilterNode extends FilterNode<"_OUT", OutFilterNodeData, 2, 0>{ }