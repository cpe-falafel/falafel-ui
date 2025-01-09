import {FilterNode} from "./FilterNode";

export interface InFilterNodeData{
    src: string;
}

export interface InFilterNode extends FilterNode<"_IN", InFilterNodeData, 0, 2>{ }