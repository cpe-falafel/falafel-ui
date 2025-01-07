<template>
    <div class="node-config">
        <h2>Configuration du nœud</h2>
        <div class="form-group">
            <label>Label :</label>
            <input v-model="nodeData.label" />
        </div>
        <div class="form-group">
            <label>Param :</label>
            <input type="number" v-model="nodeData.param" />
        </div>

        <button @click="saveNode">Enregistrer</button>
    </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'
import { useNodeStore } from '@/store/useNodeStore'

const nodeStore = useNodeStore()

const props = defineProps({
    node: {
        type: Object,
        required: true
    }
})

// On copie les données du nœud dans un objet local pour manipuler le form
const nodeData = reactive({
    label: props.node.data.label || '',
    param: props.node.data.param || 0
})

// Quand on enregistre, on émet vers le parent
function saveNode() {
    // On met à jour "node.data" en se basant sur nodeData
    const updatedNode = {
        ...props.node,
        data: {
            ...props.node.data,
            label: nodeData.label,
            param: nodeData.param
        }
    }
    nodeStore.updateNodeData(updatedNode)
}

// Optionnel : si props.node change, on resynchronise le form
watchEffect(() => {
    if (props.node) {
        nodeData.label = props.node.data.label
        nodeData.param = props.node.data.param
    }
})
</script>

<style scoped>
.node-config {
    padding: 1rem;
    border-radius: 6px;
}

.form-group {
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-weight: bold;
    margin-bottom: 0.2rem;
}

.form-group input {
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>