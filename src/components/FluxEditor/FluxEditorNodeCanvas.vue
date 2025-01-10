<template>
    <div class="node-canvas">
        <VueFlow class="flow-container" :nodes="nodes" :edges="edges" :node-types="nodeStore.nodeTypes"
            :fit-view="true" :defaultEdgeOptions="defaultEdgeOptions" @nodeDoubleClick="onNodeDoubleClick"
            @nodesSelected="onNodesSelected" @update="onUpdateGraph" @edge-click="onEdgeClick"
            @pane-click="onPaneClick" @nodesChange="nodesChange"  @update:edges="updateEdges" >

            <template #node-customFilter="props">
                <span :class="'type-' + props.data.type"></span>
                <UIFilterNode :id="props.id" :data="props.data" />
            </template>

            <Background />
        </VueFlow>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { useNodeStore } from '@/store/useNodeStore'
import UIFilterNode from '@/components/FluxEditor/UIFilterNode.vue'
import '@vue-flow/core/dist/style.css'
import '@/assets/styles/node.css'

const nodeStore = useNodeStore()
const { onConnect, addEdges, fitView } = useVueFlow();

onMounted(() => {
    nodeStore.optimizeNodePositions();
    fitView();
});

const defaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
    animated: true,
};

function onNodeDoubleClick(_evt) {
    if (_evt.node.type === "customFilter") {
        nodeStore.setSelectedNode(_evt.node)
    }
}

function onEdgeClick() {
    nodeStore.setSelectedNode(null);
}

function onPaneClick() {
    nodeStore.setSelectedNode(null);
}

function onNodesSelected(nodesSelected) {
    if (nodesSelected.length > 0) {
        nodeStore.setSelectedNode(nodesSelected[0])
    }
}

function onUpdateGraph() {
    nodeStore.updateGraph(nodeStore.nodes, nodeStore.edges)
}

function nodesChange(changes){
  nodeStore.updateNodesPositions(changes.filter(c => c.type=== 'position' && c.id && c.position));
}

function updateEdges(edges){
  nodeStore.updateEdges(edges);
}


onConnect((connection) => {
    addEdges(connection)
})

const nodes = computed({
    get() {
        return nodeStore.nodes
    },
    set(newVal) {
        nodeStore.nodes = newVal
    }
})

const edges = computed({
    get() {
        return nodeStore.edges
    },
    set(newVal) {
        nodeStore.edges = newVal
    }
})
</script>

<style scoped>
.node-canvas {
    width: 100%;
    height: 100%;
}

.flow-container {
    width: 100%;
    height: 100%;
}
</style>