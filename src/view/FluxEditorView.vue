<template>
  <div class="flux-editor-view">
    <h1>Édition de Flux</h1>

    <div class="editor-layout">
      <section class="editor-layout__preview">
        <!-- Aperçu du flux rendu -->
        <PreviewEditor />
        <div class="editor-actions">
          <button @click="saveFluxConfig">Enregistrer</button>
          <button @click="pushFluxConfig">Pousser vers le worker</button>
        </div>
      </section>

      <!-- Partie droite : Config du nœud sélectionné et Preview -->
      <section class="editor-layout__sidebar">
        <!-- Config du nœud sélectionné -->
        <NodeConfig v-if="selectedNode" :node="selectedNode" @updateNode="updateNodeData" />
        <!-- Sinon, on affiche la possibilité d’ajouter un nœud -->
        <NodeAddForm v-else @addNode="addNode" />
      </section>
    </div>
    <div class="editor-layout">
      <!-- Partie basse : Graphe de nœuds -->
      <section class="editor-layout__canvas">
        <NodeCanvas @nodeSelected="handleNodeSelected" @graphUpdated="handleGraphUpdated" @addNode="handleAddNodeFromCanvas" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NodeCanvas from '@/components/NodeEditor/NodeCanvas.vue'
import NodeConfig from '@/components/NodeEditor/NodeConfig.vue'
import PreviewEditor from '@/components/NodeEditor/PreviewEditor.vue'
import NodeAddForm from '@/components/NodeEditor/NodeAddForm.vue'
// import { saveFluxConfigAPI } from '@/api/fluxService' par exemple

// On garde en mémoire le nœud sélectionné
const selectedNode = ref(null)

// Exemples de méthodes pour gérer les events
function handleNodeSelected(node) {
  selectedNode.value = node
}

function handleGraphUpdated(graphData) {
  console.log('Graph updated:', graphData)
}

function handleAddNodeFromCanvas(newNode) {
  console.log('Nœud ajouté depuis Canvas (si implémenté) :', newNode)
  // Ici tu peux gérer la mise à jour de ta liste de nœuds globale
}

function updateNodeData(updatedNode) {
  // Logique pour modifier le nœud dans le store ou le state global
  console.log('Mettre à jour le nœud sélectionné avec', updatedNode)
  selectedNode.value = updatedNode
}

function addNode(newNode) {
  // Logique pour ajouter réellement le nœud dans le graphe
  // Par exemple, le passer à NodeCanvas via un store, ou un event global
  console.log('Nœud à ajouter :', newNode)
}

function saveFluxConfig() {
  // Appel API pour sauvegarder
  alert('Configuration du flux sauvegardée !')
}

function pushFluxConfig() {
  // Appel pour pousser la config au worker
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