<template>
    <div class="node-add-form">
        <h2>Ajouter un nouveau nœud</h2>

        <div class="form-group">
            <label>Label :</label>
            <input v-model="label" placeholder="Nom du nœud" />
        </div>

        <div class="form-group">
            <label>Type :</label>
            <select v-model="type">
                <option v-for="type in typeList" :value=type.value>{{ type.label }}</option>
            </select>
        </div>

        <button @click="createNode">Créer</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNodeStore } from '@/store/useNodeStore'

const nodeStore = useNodeStore()

const label = ref('')
const type = ref('custom-node')
const posX = ref(100)
const posY = ref(100)

let typeList = [
    {value: 'custom-node', label: 'Custom Node'},
    {value: 'image-node', label: 'Image Node'},
    {value: 'text-node', label: 'Text Node'},
    {value: 'border-node', label: 'Border Node'},
]

function createNode() {
    const newNode = {
        id: Date.now().toString(),
        type: type.value,
        position: { x: posX.value, y: posY.value },
        data: { label: label.value }
    }
    nodeStore.addNode(newNode)

    label.value = ''
    type.value = 'custom-node'
    posX.value = 100
    posY.value = 100
}
</script>

<style scoped>
.node-add-form {
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

.form-group select,
.form-group input {
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>