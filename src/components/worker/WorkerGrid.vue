<template>
  <div class="div-parent">
    <div v-if="isFluxEdition" class="div-flex">
      <h3>Workers assignés</h3>
      <button class="add-btn" @click="openModal">
        <span class="material-symbols-outlined">add</span>
        <span>Add</span>
      </button>
    </div>
    
    <div class="workerlist" :class="{ 'workerlist-edition': isFluxEdition }">
      <WorkerItem
        v-for="(worker, index) in this.workers"
        @worker:delete="handleDeleteWorker"
        :key="index"
        :worker="worker"
        :index="index"
      />
    </div>


    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <span class="material-symbols-outlined modal-title-logo">token</span>
            <p>New Worker</p>
          </div>
        </div>
        <form class="modal-slot" @submit.prevent="createWorker">
          <input
            type="text"
            v-model="newWorker.uri"
            placeholder="Worker URI"
            required
          />
          <input
            type="text"
            v-model="newWorker.apiKey"
            placeholder="API Key"
            required
          />
          <input
            type="text"
            v-model="newWorker.group"
            placeholder="Group"
            disabled
          />
          <div class="modal-form-btn">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import WorkerItem from "@/components/worker/WorkerItem.vue";
import { useWorkersStore } from "@/store/workerStore";
import Worker from '@/models/worker';

export default {
  components: {
    WorkerItem,
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
      emit("update:show", true);
    };

    const closeModal = () => {
      showModal.value = false;
      emit("update:show", false);
      resetForm();
    };

    const resetForm = () => {
      newWorker.value = {
        uri: "",
        apiKey: "",
        group: "",
      };
    };

    const createWorker = () => {
      const { uri, apiKey, group } = newWorker.value;
      if (!uri || !apiKey) {
        alert("Please fill in all required fields!");
        return;
      }

      const worker = new Worker(group, "{}", uri, apiKey);
      workerStore.addWorker(worker);

      emit("worker:creation", worker);
      closeModal();
    };

    const handleDeleteWorker = (worker) => {
      workerStore.removeWorker(worker);
    }

    return {
      workers,
      showModal,
      newWorker,
      openModal,
      closeModal,
      createWorker,
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2%;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-btn-div {
  display: flex;
  justify-content: end;
}

.close-btn {
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
}

.close-btn:focus,
.close-btn:focus-visible {
  outline: none;
}

.modal-title {
  font-size: x-large;
  font-weight: bold;
  display: flex;
}

.modal-title-logo {
  font-size: 200%;
  margin: auto 0;
}

.modal-slot {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-slot label {
  font-weight: bold;
}

.modal-slot input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #7e7d7d;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  background-color: white;
  color: black;
}

.modal-slot input[type="text"]:disabled {
  background-color: rgb(180, 180, 180);
}

.modal-slot input[type="text"]:focus {
  border: 3px solid #555;
}

.modal-form-btn {
  text-align: end;
}

.btn-cancel {
  background-color: red;
}

.list{
  text-decoration: none;
}

.btn-submit {
  margin-left: 3%;
  background-color: green;
}
</style>
