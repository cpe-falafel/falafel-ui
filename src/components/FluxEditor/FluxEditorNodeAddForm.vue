<template>
    <div class="node-add-form">
        <h2>Ajouter un nouveau nœud</h2>

        <div class="form-group">
            <label>Nom :</label>
            <input v-model="label" placeholder="Nom du nœud" />
        </div>

        <button @click="createNode">Créer</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNodeStore } from '@/store/useNodeStore'

const nodeStore = useNodeStore()

const label = ref('')
const type = ref('customFilter')
const posX = ref(100)
const posY = ref(100)
const dataType = ref('drawbox')
const dataColor = ref('#000000')
const dataTop = ref(0)
const dataBottom = ref(0)
const dataLeft = ref(0)
const dataRight = ref(0)
const dataThickness = ref(1)

function createNode() {
    const newNode = {
        id: Date.now().toString(),
        type: type.value,
        position: { x: posX.value, y: posY.value },
        data: {
            label: label.value, type: dataType.value, properties: {
                color: dataColor.value,
                top: dataTop.value,
                bottom: dataBottom.value,
                left: dataLeft.value,
                right: dataRight.value,
                thickness: dataThickness.value,
            }
        }
    }
    nodeStore.addNode(newNode)

    label.value = ''
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
    margin: 0 auto;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    max-width: 15vw;
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