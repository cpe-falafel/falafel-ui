<template>
  <div class="div-parent">
    <div class="div-flex">
        <h3>Workers assignés</h3>
        <button class="add-btn" @click="openModal()">
            <span class="material-symbols-outlined">add</span>
            <span>Add</span>
        </button>
    </div>
    <WorkerItems class="workerlist" :workers="workers" />

    <div v-if="show" class="modal-overlay" @click.self="closeModal()">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
              <span class="material-symbols-outlined modal-title-logo">token</span>
              <p>New Worker</p>
          </div>
        </div>
        <form class="modal-slot">
          <input type="text" name="worker" placeholder="Worker uri" required>
          <input type="text" name="api" placeholder="Api key" required>
          <input type="text" name="group" placeholder="Group" disabled>
          <div class="modal-form-btn">
            <button class="btn-cancel" @click="closeModal()">Cancel</button>
            <button class="btn-submit" type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  
  </div>
</template>

<script>
import WorkerItems from '@/components/WorkerItems.vue';

import Worker from "@/models/Worker";

export default {
  components: {
    WorkerItems,
  },
  data() {
    return {
      workers: [
        new Worker(
          "group-1",
          "config-123",
          "http://worker1.example.com",
          "apiKey1"
        ),
        new Worker(
          "group-2",
          "config-456",
          "http://worker2.example.com",
          "apiKey2"
        ),
        new Worker(
          "group-3",
          "config-789",
          "http://worker3.example.com",
          "apiKey3"
        ),
      ],
      show: {
        type: Boolean,
        required: true,
      },
    };
  },
  methods: {
    openModal(){
      this.show = true
    },
    closeModal() {
      this.show = false;
    },
  },
};

</script>

<style scoped>
div {
    text-align: left;
}

.div-parent{
    padding: 0 5%;
    padding-bottom: 5%;
}

.div-flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.add-btn {
  display: flex;
}

.add-btn .material-icons {
  font-size: 20px;
}

.workerlist{
  max-height: 100px;
  overflow-y: scroll;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2%;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-btn-div{
  display: flex;
  justify-content: end;
}

.close-btn {
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
}

.close-btn:focus,
.close-btn:focus-visible {
  outline: none;
}

.modal-title{
  font-size:x-large;
  font-weight: bold;
  display: flex;
}

.modal-title-logo{
  font-size: 200%;
  margin:auto 0;
}

.modal-slot {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-slot label {
  font-weight: bold;
}

.modal-slot input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #7e7d7d;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  background-color: white;
  color: black;
}

.modal-slot input[type=text]:disabled{
  background-color: rgb(180, 180, 180);
} 

.modal-slot input[type=text]:focus {
  border: 3px solid #555;
}

.modal-form-btn{
  text-align: end;
}

.btn-cancel{
  background-color: red;
}

.btn-submit{
  margin-left: 3%;
  background-color: green;
}
</style> 