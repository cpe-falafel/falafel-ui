import { defineStore } from 'pinia';
import { fetchFlux } from './actions/fluxActions';

export const useFluxStore = defineStore('fluxStore', {
  state: () => ({
    flux: [],
    loading: false,
    error: null,
  }),

  getters: {
    getFluxByUid: (state) => {
      return (uid) => state.flux.find(flux => flux.uid === uid);
    },
    getAllFlux: (state) => () => state.flux
  },

  actions: {
    fetchFlux,
    addFlux(flux) {
      if (flux instanceof Flux) {
        this.flux.push(flux);
      } else {
        console.error('Invalid flux object');
      }
    },
    setFlux(flux) {
      this.flux = flux;
    },
    removeFlux(flux) {
      this.flux = this.flux.filter(flux => flux.uid !== flux.uid);
    },
  },
});
