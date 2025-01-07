<template>
    <div class="node-item">
        <div class="node-item__header">
            {{ data.label }}
        </div>
        <div class="node-item__body">
            <!-- Affiche d’autres infos/data du nœud -->
            Paramètre: {{ data.param || '—' }}
        </div>
    </div>
    <Handle id="a" type="source" :position="Position.Right" />
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
// Vue Flow passe les props "data" et autres (id, type, etc.) au composant custom.
// data contient les propriétés qu’on a placées dans nodes[].data
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.node-item {
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #999;
    border-radius: 4px;
    min-width: 100px;
    min-height: 60px;
    cursor: pointer;
    user-select: none;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.node-item__header {
    font-weight: bold;
    margin-bottom: 0.3rem;
}

.node-item__body {
    font-size: 0.8rem;
    color: #444;
}
</style>