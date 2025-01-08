<template>
  <div class="hub-view">
    <h1>Welcome back, Ralph!</h1>
    <section>
      <h2>
        Mes flux
        <span class="material-symbols-outlined">
          arrow_forward
        </span>
      </h2>
      <button @click="createFlux">Créer un nouveau flux</button>
      <div class="list">
        <FluxCard v-for="flux in fluxList" :key="flux.id" :flux="flux" 
          @edit="editFlux" @start="startFlux" @stop="stopFlux"
        />
      </div>
    </section>

    <section>
      <h2>
        Mes workers
        <span class="material-symbols-outlined">
          arrow_forward
        </span>
      </h2>
      <div class="list">
        <WorkerCard v-for="worker in workerList" :key="worker.id" :worker="worker" 
          @edit="editWorker" @start="startWorker" @stop="stopWorker"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import FluxCard from '@/components/FluxCard.vue'
import WorkerCard from '@/components/WorkerCard.vue'
// On peut import une méthode du service API
// import { getFluxList, getWorkerList } from '@/api/fluxService'

// Pour l’exemple, on utilise des données fictives en dur :
const fluxList = [
  { id: 1, name: 'Flux #1', status: 'Actif' },
  { id: 2, name: 'Flux #2', status: 'Arrêté' }
]

const workerList = [
  { id: 1, name: 'Worker #1', status: 'Running' },
  { id: 2, name: 'Worker #2', status: 'Idle' }
]

function createFlux() {
  alert('Créer un nouveau flux - Logique à implémenter')
}

function editFlux(flux) {
  alert(`Éditer le flux: ${flux.name}`)
}

function startFlux(flux) {
  alert(`Démarrer le flux: ${flux.name}`)
}

function stopFlux(flux) {
  alert(`Arrêter le flux: ${flux.name}`)
}

function editWorker(worker) {
  alert(`Éditer le worker: ${worker.name}`)
}

function startWorker(worker) {
  alert(`Démarrer le worker: ${worker.name}`)
}

function stopWorker(worker) {
  alert(`Arrêter le worker: ${worker.name}`)
}
</script>

<style scoped>
.hub-view {
  padding: 1rem;
}

.list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
</style>