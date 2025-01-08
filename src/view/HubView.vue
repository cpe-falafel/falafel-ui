<template>
  <div class="hub-view">
    <section>
      <div class="div-title">
        <h3>My Flux</h3>
        <span class="material-symbols-outlined material-vertical-middle">
          arrow_forward
        </span>
      </div>
      <div class="workergrid">
          <FluxCardContainer />
      </div>
    </section>

    <section>
      <div class="div-title">
        <h3>My workers</h3>
        <span class="material-symbols-outlined material-vertical-middle">
          arrow_forward
        </span>
      </div>
      <div class="workergrid">
          <WorkerGrid :isFluxEdition="false"/>
        </div>
    </section>
  </div>
</template>

<script>
import { useWorkersStore } from "@/store/workerStore";
import { useFluxStore } from "@/store/fluxStore";
import { computed } from "vue";
import WorkerGrid from '../components/worker/WorkerGrid.vue';
import FluxCardContainer from "../components/flux/FluxCardContainer.vue";

export default {
  components: {
    WorkerGrid,
    FluxCardContainer
  },
  setup(props, { emit }) {
    const fluxStore = useFluxStore();
    const fluxList = computed(() => fluxStore.getAllFlux());

    const workerStore = useWorkersStore();
    const workerList = computed(() => workerStore.getAllWorkers());

    const createFlux = () => {
      alert('Créer un nouveau flux - Logique à implémenter')
    }

    const stopFlux = (flux) => {
      alert(`Arrêter le flux: ${flux.name}`)
    }

    const stopWorker = (worker) => {
      alert(`Arrêter le worker: ${worker.name}`)
    }

    return {
      fluxList,
      workerList,
      createFlux,
      stopFlux,
      stopWorker
    }
  }
}
</script>

<style scoped>
.hub-view {
  display: flex;
  justify-content: space-between;
  gap : 1rem;
  height: 82vh;
}

.hub-view section{
  margin-top: 4%;
  width: 50%;
  text-align: left;
  height: 40rem;
  max-height: 80%;
}

.list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.workergrid{
  background-color: #d2d2d2;
  border-radius: 6px;
  border: 1px solid #2a802e;
  box-shadow: 0 0 8px 2px #49b26a ;
  margin-top : 1rem;
  color: black;
  height: 70vh;
}

.material-vertical-middle{
  margin: auto 0;
}

.div-title {
  display: flex;
}

</style>