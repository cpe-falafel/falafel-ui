<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <span class="material-symbols-outlined modal-title-logo">air</span>
            <p>New Flux</p>
          </div>
        </div>
        <form class="modal-slot">
          <!-- UID -->
          <input
            type="text"
            v-model="flux.uid"
            placeholder="UID (autogenerated)"
            disabled
          />
  
          <!-- Name -->
          <input
            type="text"
            v-model="flux.name"
            placeholder="Name"
            required
          />
  
          <div class="modal-form-btn">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button class="btn-submit" @click="add()">Add</button>
            <button class="btn-submit" @click="addEdit()">Add & edit</button>
          </div>
        </form>
      </div>
    </div>
</template>
  
<script>
import { ref } from "vue";
import Flux from "@/models/flux";

export default {
    props: {
        showModal: {
        type: Boolean,
        required: true,
        },
    },
    setup(props, { emit }) {
        const flux = ref(new Flux());

        const resetForm = () => {
            flux.value = new Flux();
        }

        const closeModal = () => {
            emit("close:cancel");
            resetForm();
        };

        const add = () => {
            emit("close:create", flux.value);
            resetForm();
        };

        const addEdit = () => {
            emit("close:createEdit", flux.value);
            resetForm();
        };

        return {
            flux,
            closeModal,
            add,
            addEdit,
        };
    },
};
</script>
  
<style scoped>
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
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    font-size: x-large;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.modal-title-logo {
    font-size: 200%;
    margin-right: 10px;
}

.modal-slot {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.modal-slot input[type="text"] {
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

.modal-slot input:disabled {
    background-color: rgb(180, 180, 180);
}

.modal-slot input:focus {
    border: 3px solid #555;
}

.modal-form-btn {
    text-align: end;
}

.btn-cancel {
    background-color: red;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-submit {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
}
</style>
