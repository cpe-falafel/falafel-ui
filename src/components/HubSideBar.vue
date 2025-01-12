<template>
  <div class="div-hub-side-bar">
    <div class="side-bar-logo">
      <img id="falafel-logo" src="@/assets/images/logo.png" alt="Falafel Logo" />
      <div class="side-bar-user-name">
        <p>Welcome Théo !</p>
      </div>
    </div>
    <div class="side-bar-link">
      <button class="side-bar-button link" :class="{'side-bar-button-active' : selectedHubNode === 'flux'}" @click="selectedFluxHubNode">Flux</button>
      <button class="side-bar-button link" :class="{'side-bar-button-active' : selectedHubNode === 'worker'}" @click="selectedWorkerGridHubNode">Workers</button>
    </div>
    <div class="side-bar-disconnect">
      <button class="side-bar-button">
        <span class="material-symbols-outlined">logout</span>
        <p class="logout">Logout</p>
      </button>
    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/store/userStore.js";
import {computed} from "vue";

export default {
  name: "HubSideBar",
  setup(props, { emit }){
    const userStore = useUserStore();
    const selectedHubNode = computed(() => userStore.getSelectedHubNode());
    const selectedFluxHubNode = () =>{
      userStore.setSelectedHubNode( "flux");
    }
    const selectedWorkerGridHubNode = () =>{
      userStore.setSelectedHubNode( "worker");
    }
    return{
      selectedHubNode,
      selectedFluxHubNode,
      selectedWorkerGridHubNode
    }
  }
}
</script>

<style scoped>
.div-hub-side-bar{
  background-color: rgba(0, 0, 0, 0.44);
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.side-bar-logo {
  display: flex;
  padding: 2% 4%;
  align-items: center;
  height: 10%;
}

#falafel-logo{
  height: 40px;
  width: auto;
  vertical-align: middle;
}

.side-bar-user-name{
  font-weight: 600;
  padding-left: 4%;
}

.side-bar-link{
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.side-bar-disconnect{
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.side-bar-button{
  width: 100%;
  height: 50px;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white;
  cursor: pointer;
}

.link{
  font-weight: 700;
  font-size: 110%;
  justify-content: start;
  padding-left: 20px;
}

.side-bar-button:hover{
  background-color: #052510;
}

.side-bar-button-active{
  background-color: rgba(46, 204, 113, 0.26);
}
.side-bar-button-active:hover{
  background-color: rgba(46, 204, 113, 0.26);
}

.logout{
  margin-left: 2%;
}



</style>