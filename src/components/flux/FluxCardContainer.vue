<template>
    <div class="div-parent">
        <FluxCard v-for="flux in fluxList" :key="flux.uid" :flux="flux" 
         @deleteFlux="deleteFlux" @goToEditor="goToEditor"/>
    </div>
</template>

<script>
import { useFluxStore } from "@/store/fluxStore";
import { computed } from "vue";
import FluxCard from "./FluxCard.vue";
import { useRouter } from 'vue-router';

export default {
    components: {
        FluxCard,
    },
    setup(props, { emit }) {
        const fluxStore = useFluxStore();
        const fluxList = computed(() => fluxStore.getAllFlux());

        const router = useRouter();
        const goToEditor = (flux) => {
            router.replace('/flux-editor?uid='+flux.uid);
        }

        const deleteFlux = (flux) => {
            fluxStore.removeFlux(flux)
        }

        return {
            fluxList,
            goToEditor,
            deleteFlux
        }
    }
}
</script>

<style scoped>
.div-parent{
    height: 94%;
    max-height: 98%;
    width: 100%;
    max-width: 100%;
    overflow-y: scroll;
    display: grid;
    padding-top: 2%;
    padding-bottom: 2%;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center; 
    row-gap: 20px

}
</style>

