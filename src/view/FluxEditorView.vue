<template>
  <div v-if="flux !== undefined" class="flux-editor-view">
    <div class="editor-layout">
      <div class="editor-layout-left">
        <div class="preview-grid">
          <PreviewEditor class="preview" />
        </div>
        <div class="worker-grid">
          <WorkerGrid :isFluxEdition="true" :flux="flux" />
        </div>
      </div>

      <div class="editor-layout-right">
        <div class="name-grid"> 
          <div v-if="!isEditingTitle" class="div-title">
            <p class="title">Flux name : {{ flux.name }}</p>
            <span class="material-symbols-outlined title-edit-btn" @click="toggleEditingTitle">edit</span>
          </div>
          <div v-if="isEditingTitle" class="div-title-editing">
            <p class="title">Flux name :</p>
            <input
              type="text"
              v-model="flux.name"
            /> 
            <span class="material-symbols-outlined title-edit-btn" @click="toggleEditingTitle">check</span>
          </div>
          <button v-if="!isEditingTitle" class="save-btn" @click="save">
            <span class="material-symbols-outlined save-btn-logo">save</span>
            <span>Save</span>
          </button>
        </div>
        <div class="edit-grid">
          <h2>Flux Edition ({{ flux.name }})</h2>
          <NodeEditForm
            v-if="nodeStore.selectedNode"
            :node="nodeStore.selectedNode"
            @updateNode="updateNodeData"
          />
        </div>
        <div class="canvas-grid">
          <div class="canvas">
            <NodeCanvas @nodeSelected="handleNodeSelected" @graphUpdated="handleGraphUpdated"
              @addNode="handleAddNodeFromCanvas" />
          </div>
        </div>
      </div>
    </div>
    <div class="notification-abs"> 
      <SaveNotification ref="saveNotifyer"/>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import NodeCanvas from "@/components/FluxEditor/FluxEditorNodeCanvas.vue";
import NodeEditForm from "@/components/FluxEditor/FluxEditorNodeEditForm.vue";
import NodeAddForm from "@/components/FluxEditor/FluxEditorNodeAddForm.vue";
import { useNodeStore } from "@/store/useNodeStore";
import PreviewEditor from "@/components/FluxEditor/FluxEditorPreview.vue";
import WorkerGrid from "@/components/worker/WorkerGrid.vue";
import { useRoute, useRouter } from "vue-router";
import { useFluxStore } from "@/store/fluxStore";
import SaveNotification from '@/components/FluxEditor/SaveNotification.vue'
import { serializeStore } from "@/services/serialGraphService.js";
import fluxService from '../services/fluxService';

export default {
  components: {
    PreviewEditor,
    WorkerGrid,
    NodeEditForm,
    NodeCanvas,
    NodeAddForm,
    SaveNotification
  },
  setup(props, { emit }) {

    /* Stores */
    const nodeStore = useNodeStore();
    const fluxStore = useFluxStore();

    /* Router */
    const route = useRoute();
    const router = useRouter();

    /* Url params check */
    const fluxUid = route.query.uid;
    if (!fluxUid) {
      router.replace("/");
    }else{
      fluxService.selectFlux(fluxUid);
    }

    /* Variables */
    const flux = computed(() => fluxStore.getFluxByUid(fluxUid));
    const isEditingTitle = ref(false);
    const saveNotifyer = ref(null);
    const selectedNode = ref(null);

    setTimeout(() => {
      nodeStore.loadConf(fluxStore.getFluxByUid(fluxUid).value);
    }, 500)

    /* Initialization */
    onMounted(() => {

      document.addEventListener("keydown", function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
          event.preventDefault();
          save();
        }
      });
    });

    /* Methods */
    const toggleEditingTitle = () => {
      isEditingTitle.value = ! isEditingTitle.value;
    }

    const saveNotify = () => {
      if (saveNotifyer.value) {
        saveNotifyer.value.save();
      }
    }

    const save = () =>{
      const newValue = serializeStore({ nodes: nodeStore.nodes, edges: nodeStore.edges });
      flux.value.value = newValue;
      fluxService.updateFluxAndRefreshStore(flux.value);
      saveNotify();
    }

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
      isEditingTitle,
      toggleEditingTitle,
      saveNotifyer,
      save
    };
  },
};
</script>

<style scoped>
.title{
  font-weight: 600;
  font-size : 3vh;
}

.div-title{
  display: flex;
  align-content: center;

}

.div-title-editing{
  display: flex;
  height: 100%;
  width: 100%;
}

input[type="text"] {
    width: 50%;
    padding: 12px 20px;
    margin: 8px 0;
    margin-left: 2%;
    margin-right: 2%;
    box-sizing: border-box;
    border: 3px solid #7e7d7d;
    transition: 0.5s;
    outline: none;
    background-color: white;
    color: black;
    font-size: 120%;
}

input:disabled {
    background-color: rgb(180, 180, 180);
}

input:focus {
    border: 3px solid #555;
}


.title-edit-btn{
  margin: auto 0;
  display: flex;
  margin-left: 1vh;
  color: #797979;
  cursor: pointer;
}

.save-btn{
  margin: auto 0;
  height: 60%;
  display: flex;
}

.save-btn-logo{
  margin-right: 10%;
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
  background-color: #f7f7f7;
}

.worker-grid {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  height: 45vh;
}

.name-grid{
  background-color: #f7f7f7;
  text-align: left;
  padding-left: 4%;
  padding-right: 4%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 11vh;
}

.edit-grid {
  background-color: #f7f7f7;
  max-height: 30vh;
  height: 30vh;
}

.canvas-grid {
  display: flex;
  min-height: 40vh;
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

.notification-abs{
  z-index: 1000;
  position: absolute;
  top: 70px;
  width: 100%;
  height: 300px;
  left: 0px;
  pointer-events: none;
}
</style>
