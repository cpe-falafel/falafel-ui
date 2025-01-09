<template>
    <div class="notification-abs">
      <SaveNotification />
    </div>
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
import SaveNotification from "@/components/FluxEditor/SaveNotification.vue";

const previewUrl = ref(null)

onMounted(() => {
    previewUrl.value = 'https://www.w3schools.com/html/mov_bbb.mp4'
})
</script>

<style scoped>
.preview-editor {
    background: #fff;
    border: 1px solid #ddd;
    padding: 1rem;
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