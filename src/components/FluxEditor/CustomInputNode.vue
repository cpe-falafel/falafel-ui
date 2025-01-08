<template>
    <div class="node-item__header">
        Source
    </div>

    <Handle type="source" :position="Position.Right" :connectable="true" />
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
</script>
