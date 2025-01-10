<template>
    <div class="div-item">
        <p>{{worker.uri}}</p>
        <p>{{worker.apiKey}}</p>
        <div class="div-btn" @click="deleteWorker()">
            <span class="material-symbols-outlined">delete</span>
        </div>
    </div>
</template>

<script>
import Worker from "@/models/worker";

export default {
  props: {
    worker: {
      type: Worker,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const deleteWorker = () => {
      emit('worker:delete' , props.worker);
    }

    return {
      deleteWorker
    }
  }
};
</script>
<style scoped>
.div-btn:hover{
    cursor:pointer;
}

.div-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #E7E5E5;
    padding: 2%;
    margin: 1%;
    border-radius: 6px;
}
</style>