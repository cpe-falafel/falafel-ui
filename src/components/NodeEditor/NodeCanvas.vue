<template>
    <div class="node-canvas">
        <!-- Le composant VueFlow -->
        <VueFlow class="flow-container" v-model:nodes="nodes" v-model:edges="edges" :node-types="nodeTypes"
            :fit-view="true" @nodeDoubleClick="onNodeDoubleClick" @nodesSelected="onNodesSelected"
            @update="onUpdateGraph" />
    </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

// Import du composant de nœud personnalisé
import NodeItem from '@/components/NodeEditor/NodeItem.vue'

// On crée des refs pour stocker les nœuds et les edges
const nodes = ref([
    {
        id: '1',
        type: 'custom-node',
        position: { x: 50, y: 50 },
        data: { label: 'Source', foo: 'bar' }
    },
    {
        id: '2',
        type: 'custom-node',
        position: { x: 300, y: 50 },
        data: { label: 'Effet', param: 123 }
    },
    {
        id: '3',
        type: 'custom-node',
        position: { x: 550, y: 50 },
        data: { label: 'Output' }
    }
])

const edges = ref([
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' }
])

// On définit les types de nœuds personnalisés
const nodeTypes = {
    'custom-node': markRaw(NodeItem)
}

// Émissions d’événements vers le parent FluxEditorView
const emit = defineEmits(['nodeSelected', 'graphUpdated'])

// Quand un nœud est double-cliqué, on peut considérer que c’est un “sélection”
function onNodeDoubleClick(_evt) { 
    emit('nodeSelected', _evt.node)
}

// Quand on sélectionne un/des nœuds
function onNodesSelected(nodesSelected) {
    // S'il y a un nœud sélectionné, on émet le premier
    if (nodesSelected.length > 0) {
        emit('nodeSelected', nodesSelected[0])
    }
}

// Mise à jour du graph (quand on déplace un nœud, connecte deux nœuds, etc.)
function onUpdateGraph() {
    // On peut émettre tout le graph pour que le parent le sauvegarde
    emit('graphUpdated', { nodes: nodes.value, edges: edges.value })
}
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