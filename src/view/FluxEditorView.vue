<template>
  <div class="flux-editor-view">
    <h1>Édition de Flux</h1>

    <div class="editor-layout">
      <section class="editor-layout__preview">
        <!-- Partie Gauche : Aperçu du flux rendu / Gestion des workers -->
        <FluxPreview />
        <div class="editor-actions">
          <button @click="saveFluxConfig">Enregistrer</button>
          <button @click="pushFluxConfig">Pousser vers le worker</button>
        </div>
      </section>

      <!-- Partie droite : Config du noeud sélectionné / Ajout de nouveau noeud -->
      <section class="editor-layout__sidebar">
        <!-- Config du noeud sélectionné -->
        <NodeEditForm v-if="nodeStore.selectedNode" :node="nodeStore.selectedNode" @updateNode="updateNodeData" />
        <!-- Sinon, on affiche la possibilité d’ajouter un noeud -->
        <NodeAddForm v-else @addNode="addNode" />
      </section>
    </div>
    <div class="editor-layout">
      <!-- Partie basse : Graphe de noeuds -->
      <section class="editor-layout__canvas">
        <NodeCanvas @nodeSelected="handleNodeSelected" @graphUpdated="handleGraphUpdated" @addNode="handleAddNodeFromCanvas" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NodeCanvas from '@/components/FluxEditor/FluxEditorNodeCanvas.vue'
import NodeEditForm from '@/components/FluxEditor/FluxEditorNodeEditForm.vue'
import FluxPreview from '@/components/FluxEditor/FluxEditorPreview.vue'
import NodeAddForm from '@/components/FluxEditor/FluxEditorNodeAddForm.vue'
import { useNodeStore } from '@/store/useNodeStore'
// import { saveFluxConfigAPI } from '@/api/fluxService' par exemple

const nodeStore = useNodeStore()
const selectedNode = ref(null)

function handleNodeSelected(node) {
  selectedNode.value = node
}

function handleGraphUpdated(graphData) {
  console.log('Graph updated:', graphData)
}

function handleAddNodeFromCanvas(newNode) {
  console.log('Noeud ajouté depuis Canvas (si implémenté) :', newNode)
  // Gérer la mise à jour de la liste de noeuds globale
}

function updateNodeData(updatedNode) {
  console.log('Mettre à jour le nœud sélectionné avec', updatedNode)
  selectedNode.value = updatedNode
}

function addNode(newNode) {
  // Logique pour ajouter réellement le noeud dans le graphe
  console.log('Nœud à ajouter :', newNode)
}

function saveFluxConfig() {
  alert('Configuration du flux sauvegardée !')
}

function pushFluxConfig() {
  alert('Configuration du flux envoyée au worker !')
}
</script>

<style scoped>
h1 {
  font-size: 2em;
}

.flux-editor-view {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Mise en page de la zone d’édition */
.editor-layout {
  display: flex;
  gap: 1rem;
  min-height: 33vh;
}

.editor-layout__preview {
  flex: 1;
  color: #242424;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  min-width: 40vw;
}

.editor-layout__canvas {
  flex: 1;
  color: #242424;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
}

.editor-layout__sidebar {
  flex: 2;
  color: #242424;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 50vw;
  min-height: 40vh;
}

.editor-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>