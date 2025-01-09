<template>
    <div class="node-item__header">
        {{ data.label }}
    </div>
    <div class="node-item__body" :style="{maxWidth: '200px'}">
        Paramètre: {{ data.properties || '—' }}
    </div>

  <!--OUT-->
  <Handle v-for="(key,idx) in typeData.handles.out" :key="`s-${key}`"
          :id="`source-${props.id}-${key}`"
          type="source" :position="Position.Right"
          :connectable="uniqueCollectHandler(`source-${props.id}-${key}`, null)"
          :style="{top: `calc(${(idx+0.5)*getUnit(typeData.handles.out)}% - 10px)`, height: '20px'}"
  />

  <!--IN-->
  <Handle v-for="(key,idx) in typeData.handles.in" :key="`t-${key}`"
          :id="`target-${props.id}-${key}`"
          type="target" :position="Position.Left"
          :connectable="uniqueCollectHandler(null, `target-${props.id}-${key}`)"
          :style="{top: `calc(${(idx+0.5)*getUnit(typeData.handles.in)}% - 10px)`, height: '20px'}"
  />
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'
import {FiltersData} from "@/filtersdata/index.js";
import {computed} from "vue";

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

const typeData = computed(() => {
  return FiltersData[props.data.type]
});

const getUnit = (handles) => 100/handles.length;

function uniqueCollectHandler(src,tgt){
  return (node, connectedEdges) => {
    const edges = connectedEdges.filter(e => e.sourceHandle === src || e.targetHandle === tgt)
    return edges.length < 1;
  }
}

</script>
<script setup lang="ts">
</script>