/**
 * @typedef {import('../types/nodes').GenericFilterNode} GenericFilterNode
 */


import {FiltersData} from "@/filtersdata/index.js";

/**
 * Serializes FilterNodes
 * @param {{[k:string]:GenericFilterNode}} nodes
 * @private
 */
function _serialize(nodes){

    return JSON.stringify(nodes);
}


/**
 * provides FilterNodes with no connection
 * @param {{id:string, data:&{type:string}}[]} storeNodeValue
 * @returns {{[k:string]: GenericFilterNode}}
 */
function _retrieveIsolatedFilterNodes(storeNodeValue){
    return Object.fromEntries(
        storeNodeValue?.map((nv) =>
            _uiNodeToGenericNodeKv(nv))
    );
}

/**
 * @param {string} id
 * @param {&{type:string}} data
 * @returns {[string,GenericFilterNode]}
 * @private
 */
function _uiNodeToGenericNodeKv({id, data}){
    const typeData = FiltersData[data.type];
    const handles = typeData.handles
    return [id,{
        type: data.type,
        properties: data.properties,
        in: handles.in?.map(_ => null) || [],
        out: handles.out?.map(_ => null) || []
    }];
}

/**
 * @param {{[k:string]:GenericFilterNode}} nodes
 * @param {{id:string, source:string, target:string}[]} storeEdges
 * @private
 */
function _linkUiNodes(nodes, storeEdges){
    for (let edge of storeEdges) {
        const srcNode = nodes[edge.source];
        const tgtNode = nodes[edge.target];
        const srcNodeType = FiltersData[srcNode.type];
        const tgtNodeType = FiltersData[tgtNode.type];

        const sourceHandleName = edge.sourceHandle.split('-').reverse()[0];
        const targetHandleName = edge.targetHandle.split('-').reverse()[0];

        const srcNIdx = srcNodeType.handles?.out?.findIndex(v => v === sourceHandleName)?? -1;
        if (srcNIdx < 0) throw `Unexpected state: no handle named ${sourceHandleName}`;
        srcNode.out[srcNIdx] = edge.id;

        const tgtNIdx = tgtNodeType.handles?.in?.findIndex(v => v === targetHandleName) ?? -1;
        if (tgtNIdx < 0) throw `Unexpected state: no handle named ${targetHandleName}`;
        tgtNode.in[tgtNIdx] = edge.id;
    }
}

export function serializeStore({nodes, edges}){
    const genericNodes = _retrieveIsolatedFilterNodes(nodes);
    _linkUiNodes(genericNodes, edges);
    return _serialize(genericNodes);
}