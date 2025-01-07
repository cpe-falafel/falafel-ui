<template>
    <div class="node-canvas">
        <!-- Le composant VueFlow -->
        <VueFlow class="flow-container" v-model:nodes="nodes" v-model:edges="edges" :node-types="nodeStore.nodeTypes"
            :fit-view="true" @nodeDoubleClick="onNodeDoubleClick" @nodesSelected="onNodesSelected"
            @update="onUpdateGraph" />
    </div>
</template>

<script setup>
import { computed, markRaw } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { useNodeStore } from '@/store/useNodeStore'
import '@vue-flow/core/dist/style.css'
import NodeItem from '@/components/NodeEditor/NodeItem.vue'

const nodeStore = useNodeStore()

function onNodeDoubleClick(_evt, node) {
    nodeStore.setSelectedNode(node)
}

function onNodesSelected(nodesSelected) {
    if (nodesSelected.length > 0) {
        nodeStore.setSelectedNode(nodesSelected[0])
    }
}

function onUpdateGraph() {
    nodeStore.updateGraph(nodeStore.nodes, nodeStore.edges)
}

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