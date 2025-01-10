import { defineStore } from 'pinia';
import Worker from '../models/worker';


export const useWorkersStore = defineStore('workersStore', {
  state: () => ({
    workers: [],
    loading: false,
    error: null,
  }),

  getters: {
    getWorkerByUid: (state) => (uid) => state.workers.find(worker => worker.uid === uid),
    getAllWorkers: (state) => () => state.workers,
  },

  actions: {
    addWorker(worker) {
      if (worker) {
        this.workers.push(worker);
      } else {
        console.error('Invalid worker object');
      }
    },
    setWorkers(workers) {
      this.workers = workers;
    },
    removeWorker(worker) {
      const index = this.workers.indexOf(worker);
      if (index > -1) {
          this.workers.splice(index, 1);
      }
    }
  },
});