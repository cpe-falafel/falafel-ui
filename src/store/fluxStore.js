import { defineStore } from 'pinia';

export const useFluxStore = defineStore('fluxStore', {
  state: () => ({
    flux: [],
    selectedFlux: null,
    loading: false,
    error: null,
  }),

  getters: {
    getFluxByUid: (state) => {
      return (uid) => state.flux.find(flux => flux.uid === uid);
    },
    getAllFlux: (state) => () => state.flux,
    getSelectedFlux: (state) => () => state.selectedFlux,
    getAllFluxFiltered : (state) => (search) => state.flux.filter(flux => flux.name.includes(search))
  },

  actions: {
    addFlux(flux) {
      if (flux) {
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
    selectFlux(fluxUid){
      this.selectedFlux = fluxUid;
    }
  },
});
