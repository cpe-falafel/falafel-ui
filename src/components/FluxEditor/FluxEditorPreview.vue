<template>
    <div class="notification-abs">
      <SaveNotification />
    </div>
    <div class="preview-editor">
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
    width: 100%;
    height: 100%;
}

.preview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

video {
    height: 100%;
    width: 100%;
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