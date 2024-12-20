<template>
    <div class="flux-editor-view">
      <h1>Édition de Flux</h1>
      <div class="flux-editor-container">
        <!-- Cette div contiendra le graphe -->
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          class="flow-container"
          :fit-view="true"
        />
      </div>
      <button @click="saveFluxConfig">Enregistrer la configuration</button>
      <button @click="pushToWorker">Pousser vers le worker</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { VueFlow } from '@vue-flow/core' // Assure-toi du chemin correct selon ta config
  // import { saveFluxConfigAPI } from '@/api/fluxService' par exemple
  
  const nodes = ref([
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Media In' }, type: 'input' },
    { id: '2', position: { x: 200, y: 0 }, data: { label: 'Effet X' }},
    { id: '3', position: { x: 400, y: 0 }, data: { label: 'Media Out' }, type: 'output' }
  ])
  
  const edges = ref([
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' }
  ])
  
  function saveFluxConfig() {
    // Logique pour appeler l’API et sauvegarder la config
    console.log('Sauvegarde de la config')
  }
  
  function pushToWorker() {
    // Logique pour pousser la config vers le worker
    console.log('Envoi de la config au worker')
  }
  </script>
  
  <style scoped>
  .flux-editor-view {
    padding: 1rem;
  }
  .flux-editor-container {
    width: 100%;
    height: 500px;
    background: #f0f0f0;
    margin-bottom: 1rem;
  }
  .flow-container {
    width: 100%;
    height: 100%;
  }
  </style>
  