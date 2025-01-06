<template>
    <div class="preview-editor">
        <h2>Prévisualisation</h2>
        <div class="preview-wrapper">
            <video v-if="previewUrl" controls autoplay muted>
                <source :src="previewUrl" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
            </video>
            <p v-else>Aucun flux disponible pour le moment.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// L’URL du flux de prévisualisation
const previewUrl = ref(null)

onMounted(() => {
    // Logique pour initialiser/charger l'URL
    // Par exemple, tu pourrais faire un appel API pour récupérer l'URL du flux
    previewUrl.value = 'https://www.w3schools.com/html/mov_bbb.mp4'
})
</script>

<style scoped>
.preview-editor {
    background: #fff;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 6px;
}

.preview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: #f0f0f0;
}

video {
    max-width: 100%;
    max-height: 100%;
}
</style>