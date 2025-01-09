import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
        group:null
    },
  }),

  getters: {
    getUser : (state) => () => state.user
  },

  actions: {
  },
});