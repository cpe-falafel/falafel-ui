<template>
  <div v-if="flux !== undefined" class="flux-editor-view">
    <div class="editor-layout">
      <div class="editor-layout-left">
        <div class="preview-grid">
          <PreviewEditor class="preview" />
        </div>
        <div class="worker-grid">
          <WorkerGrid :isFluxEdition="true" />
        </div>
      </div>

      <div class="editor-layout-right">
        <div class="edit-grid">
          <h2>Flux Edition ({{ flux.name }})</h2>
          <NodeEditForm
            v-if="nodeStore.selectedNode"
            :node="nodeStore.selectedNode"
            @updateNode="updateNodeData"
          />
          <NodeAddForm v-else @addNode="addNode" />
        </div>
        <div class="canvas-grid">
          <div class="canvas">
            <NodeCanvas
              @nodeSelected="handleNodeSelected"
              @graphUpdated="handleGraphUpdated"
              @addNode="handleAddNodeFromCanvas"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import NodeCanvas from "@/components/FluxEditor/FluxEditorNodeCanvas.vue";
import NodeEditForm from "@/components/FluxEditor/FluxEditorNodeEditForm.vue";
import NodeAddForm from "@/components/FluxEditor/FluxEditorNodeAddForm.vue";
import { useNodeStore } from "@/store/useNodeStore";
import PreviewEditor from "@/components/FluxEditor/FluxEditorPreview.vue";
import WorkerGrid from "@/components/worker/WorkerGrid.vue";
import { useRoute } from "vue-router";
import { useFluxStore } from "@/store/fluxStore";
import { useRouter } from "vue-router";

export default {
  components: {
    PreviewEditor,
    WorkerGrid,
    NodeEditForm,
    NodeCanvas,
    NodeAddForm,
  },
  setup(props, { emit }) {
    // Access route parameters
    const route = useRoute();
    const router = useRouter();
    const fluxUid = route.query.uid;
    if (!fluxUid) {
      router.replace("/");
    }

    const fluxStore = useFluxStore();
    const flux = computed(() => fluxStore.getFluxByUid(fluxUid));

    const nodeStore = useNodeStore();
    const selectedNode = ref(null);

    const handleNodeSelected = (node) => {
      selectedNode.value = node;
    };

    const handleGraphUpdated = (graphData) => {
      console.log("Graph updated:", graphData);
    };

    const handleAddNodeFromCanvas = (newNode) => {
      console.log("Nœud ajouté depuis Canvas (si implémenté) :", newNode);
    };

    const updateNodeData = (updatedNode) => {
      console.log("Mettre à jour le nœud sélectionné avec", updatedNode);
      selectedNode.value = updatedNode;
    };

    const addNode = (newNode) => {
      console.log("Nœud à ajouter :", newNode);
    };

    const saveFluxConfig = () => {
      alert("Configuration du flux sauvegardée !");
    };

    const pushFluxConfig = () => {
      alert("Configuration du flux envoyée au worker !");
    };

    return {
      handleNodeSelected,
      handleGraphUpdated,
      handleAddNodeFromCanvas,
      updateNodeData,
      addNode,
      saveFluxConfig,
      pushFluxConfig,
      nodeStore,
      flux,
    };
  },
};
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
  background-color: #d2d2d2;
  border-radius: 6px;
  border: 1px solid #2a802e;
  box-shadow: 0 0 8px 2px #49b26a;
  margin-top: 2%;
  height: 85vh;
  min-height: 20%;
  max-height: 50%;
  overflow-y: hidden;
  color: black;
}

.editor-layout {
  display: flex;
  gap: 2.5vh;
  height: 100%;
}

.preview {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
}

.editor-layout-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2.5vh;
  min-width: 40vw;
  gap: 2.5vh;
}

.editor-layout-right {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2.5vh;
  min-width: 40vw;
}

.preview-grid {
  height: 40vh;
}
.worker-grid {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  height: 45vh;
}

.canvas-grid {
  display: flex;

  min-height: 55vh;
}

.edit-grid {
  background-color: #f7f7f7;
  max-height: 30vh;
  height: 30vh;
  overflow-y: scroll;
}

.canvas {
  flex: 1;
  color: #242424;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
}

.editor-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
