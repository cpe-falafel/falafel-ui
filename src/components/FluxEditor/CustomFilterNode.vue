<template>
    <div class="node-item__header">
        Filtre - {{ data.label }}
    </div>
    <div class="node-item__body">
        Paramètre: {{ data.param || '—' }}
    </div>

    <Handle type="source" :position="Position.Right" :connectable="true" />
    <Handle type="target" :position="Position.Left" :connectable="true" />
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})
</script>