<script setup>
import { Handle, Position } from '@vue-flow/core'

const props = defineProps(['id', 'data'])

</script>

<template>
    <div class="node-item__header">
        Filtre - {{ data.label }}
    </div>
    <div class="node-item__body">
        <!-- Affiche d’autres infos/data du nœud -->
        Paramètre: {{ data.param || '—' }}
    </div>

    <Handle type="source" :position="Position.Right" :connectable="true" />
    <Handle id="target-a" type="target" :position="Position.Left" :connectable="true" />
</template>