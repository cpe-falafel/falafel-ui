import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
        group:null
    },
    selectedHubNode: 'flux'
  }),

  getters: {
    getUser : (state) => () => state.user,
    getSelectedHubNode : (state) => () => state.selectedHubNode,
  },

  actions: {
    setSelectedHubNode(hubNode) {
      this.selectedHubNode = hubNode;
    },
  },
});