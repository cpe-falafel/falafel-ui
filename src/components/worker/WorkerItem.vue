<template>
    <div class="div-item">
        <p>{{worker.uid}}</p>
        <p>{{worker.uri}}</p>
        <!-- <span v-if="IsSync" class="material-symbols-outlined sync">sync</span>
        <span v-if="!IsSync" class="material-symbols-outlined not-sync">sync_disabled</span>
        <span v-if="isLinkedToFlux" class="material-symbols-outlined star">star</span> -->
        <button v-if="selectedFlux != null" @click="commit">Commit</button>

        <div class="div-btn" @click="deleteWorker()">
            <span class="material-symbols-outlined">delete</span>
        </div>
    </div>
</template>

<script>
import Worker from "@/models/Worker";
import { computed } from 'vue';
import { useFluxStore } from "@/store/fluxStore";

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
    const fluxStore = useFluxStore();
    const selectedFlux = computed(() => fluxStore.getFluxByUid(fluxStore.getSelectedFlux()));
   
    const isLinkedToFlux = () =>{
      return selectedFlux !== null && selectedFlux.uid === this.worker.lastFluxUid;
    }

    const isSync = () => {
      return isLinkedToFlux() && this.worker.configurationValue === selectedFlux.value;
    }

    const deleteWorker = () => {
      emit('worker:delete' , props.worker);
    }

    const commit = () => {
      emit('commit', {workerUid : props.worker.uid, fluxUid: fluxStore.getSelectedFlux() });
    }

    return {
      deleteWorker,
      fluxStore,
      isLinkedToFlux,
      isSync,
      commit,
      selectedFlux
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
.sync {
  color: green;
}

.not-sync{
  color: red;
}

.star{
  color: yellow;
}
</style>