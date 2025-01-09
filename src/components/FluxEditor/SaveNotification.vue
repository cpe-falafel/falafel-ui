<script setup>
import {onMounted, reactive, ref} from "vue";
import {serializeStore} from "@/services/serialGraphService.js";
import {useNodeStore} from "@/store/useNodeStore.js";

let msg = ref("");
let active = ref(false)

function showNotification(message){
  msg.value = message;
  active.value = true;
  setTimeout(() => active.value = false, 1000);
}

const store = useNodeStore();

function save(){
  console.log(serializeStore({nodes: store.nodes, edges: store.edges}));
  showNotification("Saved!");
}

onMounted(() => {
  document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      save();
    }
  });
});

</script>

<template>
  <div class="save-notification-container">
    <p :class="active? 'notification-active':''" >{{ msg }}</p>
  </div>
</template>

<style>
  .save-notification-container{
    height: 2em;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .save-notification-container > p{
    transform: translateY(-2em);
    margin: 0.1em;
    text-align: center;
    width: fit-content;
    background: lightgreen;
    border: solid 1px green;
  }

  .save-notification-container > p.notification-active{
    transition: 0.1s ease-in-out;
    transform: translateY(0);

  }


</style>