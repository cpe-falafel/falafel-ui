import { useWorkersStore } from '../store/workerStore.js';
import { useUserStore } from '../store/userStore';
import CreateWorkerDTO from '../models/createWorkerDto.js'

export default {

    /**
     * Fetch all user's group workers and store them.
    */
    async fetchAllWorkerByGroup() {
        const userStore = useUserStore();
        const workerStore = useWorkersStore();

        let loading = true;
        let error = null;

        try {
            const groupUid = userStore.group ?? 'null';

            const response = await fetch(`api/workers?group=${groupUid}`);

            if (!(response.ok || response.status === 404)){
                throw new Error('Error fetching worker data for the group');
            }

            workerStore.setWorkers([]); // Clear current worker list

            if (response.ok){
                const workers = await response.json();
                if (Array.isArray(workers.values) && workers.values.length > 0) {
                    workers.values.forEach(async (workerSummary) => {
                        try {
                            const res = await fetch(`api/workers/${workerSummary.uid}`);
                            
                            if (!res.ok) {
                                throw new Error(`Error fetching worker with UID: ${workerSummary.uid}`);
                            }
                            
                            const singleWorker = await res.json();
                            workerStore.addWorker(singleWorker);
                        } catch (e) {
                            console.error(`Error fetching details for worker UID: ${workerSummary.uid}`, e);
                            error = `Failed to fetch details for worker UID: ${workerSummary.uid}`;
                        }
                    });
                }
            }
        } catch (e) {
            error = 'Failed to fetch worker data';
            console.error('Error while fetching worker data:', e);
        } finally {
            loading = false;
        }
    },

    /**
     * Add a new worker to the user's group.
     * @param {Object} worker - The worker to add
     * @param {Object} flux - The flux linked
     */
    async addWorker(worker, flux) {
        try {
            const createWorkerDTO = new CreateWorkerDTO(flux.owner, flux.value, worker.uri, worker.apiKey, flux.uid);

            const response = await fetch('/api/workers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createWorkerDTO),
            });
        
            if (response.ok) {
                const singleWorkerDTO = await response.json();
                console.log("New Worker :" + JSON.stringify(singleWorkerDTO))
                return singleWorkerDTO;
            }
        } catch (e) {
            console.error('Failed to add worker:', e);
        }
    },

    /**
     * Add a new worker and refresh the worker store.
     * @param {Object} worker - The worker to add
     * @param {Object} flux - The worker linked
     */
    async addWorkerAndRefreshStore(worker, flux){
        await this.addWorker(worker, flux);
        await this.fetchAllWorkerByGroup();
    },

    /**
     * Remove a worker from its group.
     * @param {string} uid - The UID of the work to remove
     */
    async deleteWorker(uid) {
        try {
            const response = await fetch(`/api/workers/${uid}`, {
                method: 'DELETE',
            });
        
            if (response.ok) {
                console.log('Worker deleted successfully');
            } else if (response.status === 404) {
                console.log('Worker not found');
            } else {
                throw new Error('Failed to delete worker');
            }
        } catch (e) {
            console.error('Failed to remove worker:', e);
        }
    },

    /**
     * Remove a worker and refresh the worker store.
     * @param {string} uid - The UID of the worker to remove
     */
    async deleteWorkerAndRefreshStore(uid){
        this.deleteWorker(uid);
        this.fetchAllWorkerByGroup();
    },

    /**
     * Commit a flux in a worker and refresh the worker store.
     * @param {string} workerUid - The UID of the worker
     * @param {string} fluxUid - The UID of the flux
     */
    async commit(workerUid, fluxUid){
        try {
            const response = await fetch(`/api/workers/${workerUid}/flux/${fluxUid}`, {
                method: 'PUT',
            });
        
            if (response.ok) {
                console.log(`Flux (${fluxUid}) has been commited successfully in Worker (${workerUid})`);
            } else if (response.status === 404) {
                console.log('Worker not found');
            } else {
                throw new Error(`Failed to commit Flux (${fluxUid}) in  Worker (${workerUid})`);
            }
        } catch (e) {
            console.error('Failed to commit worker:', e);
        } 
    },
        
    /**
     * Commit a flux in a worker and refresh the worker store.
     * @param {string} workerUid - The UID of the worker
     * @param {string} fluxUid - The UID of the flux
     */
    async commitAndRefreshStore(workerUid, fluxUid){
        this.commit(workerUid, fluxUid);
        this.fetchAllWorkerByGroup();
    },
};