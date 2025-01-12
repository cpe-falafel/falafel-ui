<template>
    <div v-if="fluxList.length > 0 || search !== undefined" class="flux-card-container">
        <div class="flux-card-container-header">

          <div class="styled-input-div">
            <input type="text" class="styled-input" placeholder="Search" v-model="search">
            <div class="underline"></div>
          </div>


          <button class="btn-add-flux" @click="openFluxCreationModal()">Add Flux</button>
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
          let savedFlux = await fluxService.addFlux(newFlux);
          if (savedFlux){
            await router.replace('/flux-editor?uid=' + savedFlux.uid);
          }
          await fluxService.fetchAllFluxByGroup();
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

.flux-card-container{
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.flux-card-container-header{
    height: 5%;
    padding: 4%;
    display: flex;
    justify-content: space-between;
}

.styled-input-div {
  width: 70%;
  position: relative;
}

input.styled-input {
  border: none;
  outline: none;
  font-size: 16px;
  padding: 5px 0;
  background-color: transparent;
  color: white;
  width: 100%;
}

input.styled-input:focus {
  color: #2ecc71;
}

input.styled-input:focus::placeholder {
  color: #2ecc71;
}

input.styled-input:focus ~ .underline {
  width: 100%;
}

input.styled-input::placeholder {
  color: rgba(255, 255, 255, 0.65);
  transition: color 0.3s ease;
}

.underline {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #2ecc71;
  transition: width 0.4s ease;
}


.btn-add-flux {
  width: 120px;
  background-color: #1db954;
  border-radius: 50px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-add-flux:hover {
  background-color: #1aa34a;
}

.div-grid {
  border-radius: 8px;
  height: 69%;
  width: 90%;
  max-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  row-gap: 20px;
  margin: 1%;
  padding: 2px 3% 3%;
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



</style>

