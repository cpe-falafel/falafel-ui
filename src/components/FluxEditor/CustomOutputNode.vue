<script setup>
import { Handle, Position } from '@vue-flow/core'

</script>

<template>
    <div class="node-item__header">
        Output
    </div>

    <Handle type="target" :position="Position.Left" :connectable="true" />
</template>
