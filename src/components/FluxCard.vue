<template>
    <div class="card">
        <div class="card__header">
            <h3 class="card__title">{{ flux.name }}</h3>
            <span class="card__status" :class="statusClass">{{ flux.status }}</span>
        </div>
        <div class="card__body">
            <!-- Contenu supplémentaire : une mini description, une image de preview, etc. -->
            <p>Identifiant: {{ flux.id }}</p>
            <p>Description du flux… (à personnaliser)</p>
        </div>
        <div class="card__footer">
            <button @click="goToEditor">Éditer</button>
            <button @click="startFlux" v-if="flux.status !== 'Actif'">Démarrer</button>
            <button @click="stopFlux" v-if="flux.status === 'Actif'">Arrêter</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import "@/assets/styles/card.css"

// On déclare que le composant reçoit une prop `flux` sous forme d’objet
const props = defineProps({
    flux: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['edit', 'start', 'stop'])

// On peut calculer une classe CSS pour le statut 
// (par exemple appliquer une couleur différente selon le statut)
const statusClass = computed(() => {
    switch (props.flux.status) {
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
    emit('edit', props.flux)
}

function startFlux() {
    emit('start', props.flux)
}

function stopFlux() {
    emit('stop', props.flux)
}
</script>