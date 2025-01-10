<template>
  <div class="save-notification-container" :class="{'active' : active}">
    <p>Saved</p>
    <span class="material-symbols-outlined check-circle">check_circle</span>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(_, { expose }) {
    const active = ref(false);

    function showNotification() {
      active.value = true;
      setTimeout(() => (active.value = false), 1000);
    }

    function save() {
      showNotification();
    }

    expose({ save });

    return { active };
  },
};
</script>

<style>
.save-notification-container {
  height: 2em;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  background-color: white;
  width: 15vh;
  margin: auto;
  border-radius: 25px;
  color: black;
  transform: translateY(-2em);
  transition: transform 0.2s ease-in-out; 
  opacity: 0;
}

.check-circle {
  color: green;
}

.save-notification-container.active {
  transform: translateY(0); 
  opacity: 1;
}
</style>