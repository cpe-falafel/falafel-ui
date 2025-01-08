<template>
  <div class="card">
    <div class="card__header">
      <h3 class="card__title">{{ flux.name }}</h3>
      <span class="card__status" :class="statusClass">{{ flux.status }}</span>
    </div>
    <div class="div-flex">
      <div class="card__body div-desc">
        <p>UID: {{ flux.uid }}</p>
        <p>Owner: {{ flux.owner }}</p>
      </div>
      <div class="div-preview">
        <img class="preview" src="../../assets/images/interruption-des-programmes_83_830830_1200.png">
      </div>
    </div>

    <div class="card__footer">
      <button @click="goToEditor">Edit</button>
      <button @click="deleteFlux">Delete</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import '../../assets/styles/card.css';

export default {
  props:{
    flux: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const statusClass = computed(() => {
      switch (props.flux.status) {
        case "Actif":
          return "status--active";
        case "Arrêté":
          return "status--stopped";
        default:
          return "status--unknown";
      }
    });

    
    const goToEditor = () => {
      emit("goToEditor", props.flux);
    }

    const deleteFlux = () => {
      emit("deleteFlux", props.flux);
    }

    return {
      statusClass,
      goToEditor,
      deleteFlux
    }
  }
}

</script>

<style scoped>

.div-flex {
  display: flex;
  justify-content: space-between;
}

.div-desc{
  width: 50%;
}

.div-preview{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
}

.preview{
  width: 110px;
  max-width: 110px;  
}
</style>