<template>
    <div class="node-edit-form">
        <h2>Configuration du nœud</h2>
        {{ proto }}
        <FluxEditorFormProperty v-for="prop in typeData.proto" :key="prop.key" :label="prop.label" :type="prop.type"
            @change-val="(v) => handleChange(prop,v)" :data="{value:nodeProperties[prop.key]}"/>

        <button @click="saveNode">Enregistrer</button>
    </div>
</template>

<script setup>
import {computed, reactive, ref, watchEffect} from 'vue'
import { useNodeStore } from '@/store/useNodeStore'
import FluxEditorFormProperty from '@/components/FluxEditor/FluxEditorFormProperty.vue'
import { FiltersData } from "@/filtersdata"

const nodeStore = useNodeStore()

const props = defineProps({
    node: {
        type: Object,
        required: true
    },
})

const typeData = computed(() =>
    FiltersData[props.node.data.type]
)

const nodeProperties = ref(props.node.data.properties);

function saveNode() {
    nodeStore.updateSelectedNodeProperties({...nodeProperties.value});
}

function handleChange(proto, val) {
  nodeProperties.value =  {...nodeProperties.value, [proto.key] : val};
}

// Si props.node change, on resynchronise le form
watchEffect(() => {
    if (props.node) {
        nodeProperties.value = {...props.node.data.properties};
    }
})
</script>

<style scoped>
.node-edit-form {
    margin: 0 auto;
    max-width: 50vw;
    padding: 1rem;
    border-radius: 6px;
}
</style>