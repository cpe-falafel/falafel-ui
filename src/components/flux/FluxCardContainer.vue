<template>
    <div v-if="fluxList.length > 0 || search !== undefined" class="div-not-empty">
        <div class="div-not-empty-header"> 
            <input
                type="text"
                v-model="search"
                placeholder="Name"
            />
            <button @click="openFluxCreationModal()">add</button>
        </div>
        <div class="div-grid">
            <FluxCard v-for="flux in fluxList" :key="flux.uid" :flux="flux" 
            @deleteFlux="deleteFlux" @goToEditor="goToEditor"/>
        </div>
    </div>

    
    <div class="div-empty">
        <div v-if="fluxList.length === 0 && search === undefined" class="div-not-found">
            <div class="div-flex">
                <span class="material-symbols-outlined not-found">error</span>
                <span>No flux was found.</span>
            </div>
            <span class="add-first-flux" @click="openFluxCreationModal()">Add first flux</span>
        </div>
    </div>

    <FluxModal
      :showModal="showModal"
      @close:cancel="handleCancel"
      @close:create="handleCreate"
      @close:createEdit="handleCreateEdit"
    />


</template>

<script>
import { useFluxStore } from "@/store/fluxStore";
import { computed } from "vue";
import FluxCard from "./FluxCard.vue";
import { useRouter } from 'vue-router';
import FluxModal from "@/components/flux/FluxModal.vue";
import { ref } from "vue";
import fluxService from "@/services/fluxService.js"

export default {
    components: {
        FluxCard,
        FluxModal
    },
    setup(props, { emit }) {
        const search = ref("")
        const fluxStore = useFluxStore();
        const fluxList = computed(() => fluxStore.getAllFluxFiltered(search.value));

        const router = useRouter();
        const goToEditor = (flux) => {
            router.replace('/flux-editor?uid='+flux.uid);
        }

        const deleteFlux = async (flux) => {
            await fluxService.deleteFluxAndRefreshStore(flux.uid);
        }

        // Modal
        const showModal = ref(false);

        const openFluxCreationModal = () =>{
            showModal.value = true;
        }

        const handleCancel = () => {
            showModal.value = false;
        };

        const handleCreate = async (newFlux) => {
            await fluxService.addFluxAndRefreshStore(newFlux);
            showModal.value = false;
        };

        const handleCreateEdit = async (newFlux) => {
            const savedFlux = await fluxService.addFluxAndRefreshStore(newFlux);
            router.replace('/flux-editor?uid='+ savedFlux.uid);
        };

        return {
            search,
            fluxList,
            goToEditor,
            deleteFlux,
            showModal,
            openFluxCreationModal,
            handleCancel,
            handleCreate,
            handleCreateEdit
        }
    }
}
</script>

<style scoped>
.div-not-empty-header{
    height: 10%;
    padding: 2%;
    display: flex;
    justify-content: space-between;
}

.div-not-empty{
    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

.div-grid{
    height: 82%;
    width: 100%;
    max-width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    display: grid;
    padding-top: 2%;
    padding-bottom: 2%;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center; 
    row-gap: 20px
}

.div-empty{
    min-width: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.div-not-found{
    display: block;
    width: 100%;
}

.div-flex{
    display: flex;
    justify-content: center;

}

.add-first-flux{
    background-color: transparent;
    color: blue;
    text-decoration: underline;
}

.add-first-flux:hover{
    border-color: transparent;
    text-decoration: none;
    cursor: pointer;
}

.not-found{
    margin-right: 1%;
}


.div-not-empty-header input[type="text"] {
  width: 50%;
  margin: 8px 0;
  box-sizing: border-box;
  border: none; 
  border-bottom: 3px solid #000000; 
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  background-color: transparent;
  color: black;
}

.div-not-empty-header input:disabled {
    background-color: rgb(180, 180, 180);
}

.div-not-empty-header input:focus {
    border-bottom: 3px solid #555;
}
</style>

