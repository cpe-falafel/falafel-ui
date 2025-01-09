<template>
  <div v-if="flux !== undefined" class="flux-editor-view">
    <h1>Flux Edition ({{ flux.name }})</h1>

    <div class="editor-layout">
      <section class="editor-layout__preview">
        <!-- Aperçu du flux rendu -->
        <PreviewEditor class="preview"/>

        <div class="workergrid">
          <WorkerGrid :isFluxEdition="true"/>
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
  <div v-if="flux === undefined">
  </div>
</template>

<script>
import { ref } from 'vue'
import NodeCanvas from '@/components/FluxEditor/FluxEditorNodeCanvas.vue'
import NodeEditForm from '@/components/FluxEditor/FluxEditorNodeEditForm.vue'
import NodeAddForm from '@/components/FluxEditor/FluxEditorNodeAddForm.vue'
import { useNodeStore } from '@/store/useNodeStore'
import PreviewEditor from '@/components/FluxEditor/FluxEditorPreview.vue';
import WorkerGrid from '@/components/worker/WorkerGrid.vue';
import { useRoute } from 'vue-router';
import { useFluxStore } from "@/store/fluxStore";

export default {
  components: {
    PreviewEditor,
    WorkerGrid,
    NodeEditForm,
    NodeCanvas,
    NodeAddForm
  },
  setup(props, { emit }) {
    // Access route parameters
    const route = useRoute();
    const fluxUid = route.query.uid;

    const fluxStore = useFluxStore();
    const flux = fluxStore.getFluxByUid(fluxUid);


    const nodeStore = useNodeStore()
    const selectedNode = ref(null)


    const handleNodeSelected = (node) => {
      selectedNode.value = node
    }

    const handleGraphUpdated = (graphData) => {
      console.log('Graph updated:', graphData)
    }

    const handleAddNodeFromCanvas = (newNode) => {
      console.log('Nœud ajouté depuis Canvas (si implémenté) :', newNode)
    }

    const updateNodeData = (updatedNode) => {
      console.log('Mettre à jour le nœud sélectionné avec', updatedNode)
      selectedNode.value = updatedNode
    }

    const addNode = (newNode) => {
      console.log('Nœud à ajouter :', newNode)
    }

    const saveFluxConfig = () => {
      alert('Configuration du flux sauvegardée !')
    }

    const pushFluxConfig = () => {
      alert('Configuration du flux envoyée au worker !')
    }

    return {
      handleNodeSelected,
      handleGraphUpdated,
      handleAddNodeFromCanvas,
      updateNodeData,
      addNode,
      saveFluxConfig,
      pushFluxConfig,
      nodeStore,
      flux
    }
  }
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

.preview{
  background-color: #f7f7f7;
  border: 1px solid #ddd;
}

.workergrid{
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  margin-top : 1rem;
  height: 40vh;
}

.editor-layout__preview {
  flex: 1;
  color: #242424;
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