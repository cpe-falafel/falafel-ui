<template>
    <div class="node-item__header">
        <!-- {{ data.label }} -->
          TEST
    </div>
    <div class="node-item__body">
        <!-- Affiche d’autres infos/data du nœud -->
        <!-- Paramètre: {{ data.param || '—' }} -->
    </div>

    <Handle type="source" :position="Position.Right" :connectable="true" />
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
