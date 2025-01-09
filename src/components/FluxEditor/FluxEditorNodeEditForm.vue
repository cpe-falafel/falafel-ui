<template>
    <div class="node-edit-form">
        <h2>Configuration du nœud</h2>
        <div class="form-group">
            <label>Label :</label>
            <input v-model="nodeData.label" />
        </div>
        <div class="form-group">
            <label>Type :</label>
            <select v-model="nodeData.type">
                <option v-for="type in typeList" :value=type.value>{{ type.label }}</option>
            </select>
        </div>
        <div class="form-group">
            <Vue3ColorPicker v-model="nodeData.color" mode="solid" :showColorList="false" :showEyeDrop="false"
                type="HEX" :showInputMenu="false" :showPickerMode="false"/>

            Selected color: {{ nodeData.color }}
        </div>
        <div class="form-group">
            <label>Top :</label>
            <vue-number-input class="num-input" v-model="nodeData.top" :model-value="0" :min="0" inline center controls
                onkeydown="return event.keyCode !== 69"></vue-number-input>
        </div>

        <button @click="saveNode">Enregistrer</button>
    </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'
import { useNodeStore } from '@/store/useNodeStore'
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';

const nodeStore = useNodeStore()

const props = defineProps({
    node: {
        type: Object,
        required: true
    },
    proto: Object
})

const typeList = [
    { value: 'drawbox', label: 'Border' },
    { value: 'image', label: 'Image' },
    { value: 'text', label: 'Text' },
]

// On copie les données du nœud dans un objet local pour manipuler le form
const nodeData = reactive({
    label: props.node.data.label || 'Filter',
    type: props.node.data.type || '',
    color: props.node.data.properties.color || '#000000',
    top: props.node.data.properties.top || '0',
    bottom: props.node.data.properties.bottom || '0',
    left: props.node.data.properties.left || '0',
    right: props.node.data.properties.right || '0',
    thickness: props.node.data.properties.thickness || '1',
})

// Quand on enregistre, on émet vers le parent
function saveNode() {
    // On met à jour "node.data" en se basant sur nodeData
    const updatedNode = {
        ...props.node,
        data: {
            ...props.node.data,
            label: nodeData.label,
            type: nodeData.type,
            properties: {
                color: nodeData.color,
                top: nodeData.top,
                bottom: nodeData.bottom,
                left: nodeData.left,
                right: nodeData.right,
                thickness: nodeData.thickness
            }
        }
    }
    nodeStore.updateNodeData(updatedNode)
}

// Si props.node change, on resynchronise le form
watchEffect(() => {
    if (props.node) {
        nodeData.label = props.node.data.label
        nodeData.type = props.node.data.type
        nodeData.color = props.node.data.properties.color
        nodeData.top = props.node.data.properties.top
        nodeData.bottom = props.node.data.properties.bottom
        nodeData.left = props.node.data.properties.left
        nodeData.right = props.node.data.properties.right
        nodeData.thickness = props.node.data.properties.thickness
    }
})
</script>

<style scoped>
.node-edit-form {
    margin: 0 auto;
    max-width: 50vw;
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

.num-input {
    color: #242424;
}
</style>