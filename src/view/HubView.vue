<template>
    <div class="hub-view">
      <h1>Hub</h1>
      <section>
        <h2>Mes flux</h2>
        <ul>
          <!-- Exemple statique, à remplacer par des données venant de l’API -->
          <li v-for="flux in fluxList" :key="flux.id">
            {{ flux.name }} ({{ flux.status }})
          </li>
        </ul>
        <button @click="createFlux">Créer un nouveau flux</button>
      </section>
  
      <section>
        <h2>Workers</h2>
        <ul>
          <!-- Exemple statique, à remplacer par des données venant de l’API -->
          <li v-for="worker in workerList" :key="worker.id">
            {{ worker.name }} - {{ worker.status }}
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script setup>
  // Ici, tu pourrais importer une méthode de ton service API
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
    // Logique pour créer un flux, pourrait ouvrir un formulaire modal
    alert('Créer un nouveau flux - Logique à implémenter')
  }
  </script>
  
  <style scoped>
  .hub-view {
    padding: 1rem;
  }
  </style>
  