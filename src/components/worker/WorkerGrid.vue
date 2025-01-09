<template>
  <div class="div-parent">
    <div v-if="isFluxEdition" class="div-flex">
      <h3>Workers assignés</h3>
      <button class="add-btn" @click="openModal">
        <span class="material-symbols-outlined">add</span>
        <span>Add</span>
      </button>
    </div>
    
    <div v-if="this.workers.length > 0" class="workerlist" :class="{ 'workerlist-edition': isFluxEdition }">
      <WorkerItem
        v-for="(worker, index) in this.workers"
        @worker:delete="handleDeleteWorker"
        :key="index"
        :worker="worker"
        :index="index"
      />
    </div>
    <div v-if="this.workers.length == 0" class="div-empty">
      <div v-if="workers.length === 0" class="div-not-found">
            <div class="div-flex">
                <span class="material-symbols-outlined not-found">error</span>
                <span>No worker was found.</span>
            </div>

            <!-- keep it -> to use if we want add worker from hub page -->
            <!-- <div class="div-flex">
              <span class="add-first-worker" @click="openModal">Add first worker</span>
            </div> -->
        </div>
    </div>

    <WorkerModal v-if="showModal"
      :showModal="showModal"
      @close:cancel="handleCancel"
      @close:create="handleCreateWorker"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import WorkerItem from "@/components/worker/WorkerItem.vue";
import { useWorkersStore } from "@/store/workerStore";
import WorkerModal from '@/components/worker/WorkerModal.vue'

export default {
  components: {
    WorkerItem,
    WorkerModal
  },
  props:{
    isFluxEdition: {
        type: Boolean,
        required: true
    }
  },
  setup(props, { emit }) {
    const workerStore = useWorkersStore();
    const workers = computed(() => workerStore.getAllWorkers());

    const showModal = ref(false);
    const newWorker = ref({
      uri: "",
      apiKey: "",
      group: "",
    });

    const openModal = () => {
      showModal.value = true;
    };

    const handleCreateWorker = (newWorker) => {

      // TODO
      //workerStore.addWorker(newWorker);
      showModal.value = false;
    };

    const handleCancel = () => {
        showModal.value = false;
    };

    const handleDeleteWorker = (worker) => {
      workerStore.removeWorker(worker);
    }

    return {
      workers,
      showModal,
      newWorker,
      openModal,
      handleCancel,
      handleCreateWorker,
      handleDeleteWorker
    };
  },
};
</script>

<style scoped>
/* Styles identiques */
div {
  text-align: left;
}

.div-parent {
  height: 100%;
}

.div-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-btn {
  display: flex;
}

.add-btn .material-icons {
  font-size: 20px;
}

.workerlist {
  max-height: 100%;
  overflow-y: scroll;
  padding-left: 3%;
  padding-right: 3%;
}

.workerlist-edition {
  max-height: 70%;
}

.div-empty{
    min-width: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.div-not-found{
    display: block;
    width: 100%;
}

.div-flex{
    display: flex;
    justify-content: center;
}

.add-first-worker{
    background-color: transparent;
    color: blue;
    text-decoration: underline;
}

.add-first-worker:hover{
    border-color: transparent;
    text-decoration: none;
    cursor: pointer;
}

.not-found{
    margin-right: 1%;
}
</style>
