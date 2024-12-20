<template>
    <div class="preview-view">
        <h1>Prévisualisation du Flux</h1>
        <p>Voici le lien RTMP à fournir aux plateformes de streaming :</p>
        <pre>{{ rtmpUrl }}</pre>

        <!-- Si tu as un lien HLS, tu peux tenter un simple player HTML5 -->
        <video v-if="hlsUrl" controls autoplay style="width: 100%; max-width: 600px;">
        <source :src="hlsUrl" type="application/x-mpegURL" />
        Votre navigateur ne supporte pas le HLS.
        </video>

        <p v-else>En attente d’un lien HLS pour prévisualiser le flux.</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const rtmpUrl = ref('rtmp://example.com/live/stream_key')
const hlsUrl = ref('http://example.com/live/stream_key.m3u8')
// Tu récupéreras ces URLs depuis l’API ou la config utilisateur plus tard.
</script>

<style scoped>
.preview-view {
padding: 1rem;
}
</style>
