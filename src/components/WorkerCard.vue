<template>
    <div class="card">
        <div class="card__header">
            <h3 class="card__title">{{ worker.name }}</h3>
            <span class="card__status" :class="statusClass">{{ worker.status }}</span>
        </div>
        <div class="card__body">
            <!-- Contenu supplémentaire : une mini description, une image de preview, etc. -->
            <p>Identifiant: {{ worker.id }}</p>
            <p>Description du worker… (à personnaliser)</p>
        </div>
        <div class="card__footer">
            <button @click="goToEditor">Éditer</button>
            <button @click="startworker" v-if="worker.status !== 'Actif'">Démarrer</button>
            <button @click="stopworker" v-if="worker.status === 'Actif'">Arrêter</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import "@/assets/styles/card.css"

// On déclare que le composant reçoit une prop `worker` sous forme d’objet
const props = defineProps({
    worker: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['edit', 'start', 'stop'])

// On peut calculer une classe CSS pour le statut 
// (par exemple appliquer une couleur différente selon le statut)
const statusClass = computed(() => {
    switch (props.worker.status) {
        case 'Actif':
            return 'status--active'
        case 'Arrêté':
            return 'status--stopped'
        default:
            return 'status--unknown'
    }
})

// Méthodes pour émettre des événements au parent
function goToEditor() {
    emit('edit', props.worker)
}

function startworker() {
    emit('start', props.worker)
}

function stopworker() {
    emit('stop', props.worker)
}
</script>