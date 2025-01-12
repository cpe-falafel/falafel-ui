<template>
  <div class="card">
    <div class="card-header">
      <p class="card-title">{{ flux.name }}</p>
      <div class="div-preview">
        <img class="preview" src="../../assets/images/interruption-des-programmes_83_830830_1200.png">
      </div>
    </div>
    <div class="card-content">
        <p><span class="strong">UID:</span> {{ flux.uid }}</p>
        <p><span class="strong">Group:</span> {{ flux.owner }}</p>
    </div>

    <div class="card-footer">
      <button @click="goToEditor">Edit</button>
      <button @click="deleteFlux">Delete</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

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
.card {
  background-color: rgba(23, 23, 23, 0.68);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  overflow: hidden;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  width: 300px;
  height: 35vh;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-title{
  font-weight: 700;
  font-size: 120%;
  color: #1aa34a;
}

.card-header{
  display: flex;
  justify-content: space-between;
  height: 20%;
  padding: 10% 10% 0;
}

.card-content{
  display: flex;
  flex-direction: column;
  text-align: start;
  height: 45%;
  padding-left: 10%;
  padding-right: 10%;
}

.card-footer{
  display: flex;
  justify-content: center;
  gap: 5%;
  height: 15%;
  padding: 4%;
}

button {
  width: 120px;
  background-color: #1db954;
  border-radius: 50px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 80%;
}

button:hover {
  background-color: #1aa34a;
}

.div-preview {
  width: 80px;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.strong{
  font-weight: 700;
}

</style>