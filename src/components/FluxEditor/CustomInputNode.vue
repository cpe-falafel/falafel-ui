<template>
    <div class="node-item__header">
        {{ data.label }}
    </div>

    <Handle type="source" :position="Position.Right" :connectable="true" />
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
