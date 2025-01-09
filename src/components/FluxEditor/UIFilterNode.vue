<template>
    <div class="node-item__header">
        {{ data.label }}
    </div>
    <div class="node-item__body">
        Paramètre: {{ data.properties || '—' }}
    </div>

  <!--OUT-->
  <Handle v-for="key in data.handles.out" :key="`s-${key}`"
          :id="`source-${props.id}-${key}`"
          type="source" :position="Position.Right"
          :connectable="uniqueCollectHandler" />

  <!--IN-->
  <Handle v-for="key in data.handles.in" :key="`t-${key}`"
          :id="`target-${props.id}-${key}`"
          type="target" :position="Position.Left"
          :connectable="uniqueCollectHandler" />
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

const uniqueCollectHandler = (node, connectedEdges) => {
  return connectedEdges.length < 1;
}
</script>