<template>
    <div class="form-group">
        <label>{{ props.label }} :</label>
        <div v-if="props.type === 'color'">
            <Vue3ColorPicker class="color-picker" @update:modelValue="sendValue" mode="solid" :showColorList="false"
                :showEyeDrop="false" type="HEX" :showInputMenu="false" :showPickerMode="false" :model-value="props.data.value" />
        </div>
        <div v-if="props.type === 'uint'">
            <vue-number-input @update:modelValue="sendValue" :model-value="0" :min="0" inline center controls
                onkeydown="return event.keyCode !== 69" :value="props.data.value" ></vue-number-input>
        </div>
        <div v-if="props.type === 'uint1'">
            <vue-number-input @update:modelValue="sendValue" :model-value="0" :min="1" inline center controls
                onkeydown="return event.keyCode !== 69" :value="props.data.value" ></vue-number-input>
        </div>
        <div v-if="props.type === 'string'">
            <input @input="(evt) => sendValue(evt.target.value)" :value="props.data.value"/>
        </div>
    </div>
</template>

<script setup>
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker'

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    "changeVal"
]);

function sendValue(val) {
  emit("changeVal", val)
}
</script>

<style scoped>
.form-group {
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
}

.color-picker {
    margin: 0 auto;
}

.form-group label {
    font-weight: bold;
    margin-bottom: 0.2rem;
}

.form-group input {
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>