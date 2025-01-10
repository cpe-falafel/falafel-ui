import { useFluxStore } from '../store/fluxStore';
import { useUserStore } from '../store/userStore';
import CreateFluxDTO from '../models/createFluxDto.js'
import EditFluxDTO from '../models/editFluxDto.js'

export default {

    /**
     * Fetch all user's group flux and store them.
    */
    async fetchAllFluxByGroup() {
        const userStore = useUserStore();
        const fluxStore = useFluxStore();

        let loading = true;
        let error = null;

        try {
            const groupUid = userStore.group ?? 'null';

            const response = await fetch(`api/flux?group=${groupUid}`);

            if (!(response.ok || response.status === 404)){
                throw new Error('Error fetching flux data for the group');
            }

            fluxStore.setFlux([]); // Clear current flux list

            if (response.ok){
                const fluxList = await response.json();
                if (Array.isArray(fluxList) && fluxList.length > 0) {
                    fluxList.forEach(async (fluxSummary) => {
                        try {
                            const res = await fetch(`api/flux/${fluxSummary.uid}`);
                            
                            if (!res.ok) {
                                throw new Error(`Error fetching flux with UID: ${fluxSummary.uid}`);
                            }
                            
                            const singleFlux = await res.json();
                            fluxStore.addFlux(singleFlux);
                        } catch (e) {
                            console.error(`Error fetching details for flux UID: ${fluxSummary.uid}`, e);
                            error = `Failed to fetch details for flux UID: ${fluxSummary.uid}`;
                        }
                    });
                }
            }
        } catch (e) {
            this.error = 'Failed to fetch flux data';
            console.error('Error while fetching flux data:', e);
        } finally {
            loading = false;
        }
    },

    /**
     * Add a new flux to the user's group.
     * @param {Object} flux - The flux to add
     */
    async addFlux(flux) {
        try {
            const createFluxDTO = new CreateFluxDTO(flux.name);

            const response = await fetch('/api/flux', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createFluxDTO),
            });
        
            if (response.ok) {
                const singleFluxDTO = await response.json();
                console.log("New flux :" + JSON.stringify(singleFluxDTO))
                return singleFluxDTO;
            }
        } catch (error) {
            console.error('Failed to add flux:', error);
        }
    },

    /**
     * Add a new flux and refresh the flux store.
     * @param {Object} flux - The flux to add
     */
    async addFluxAndRefreshStore(flux){
        await this.addFlux(flux);
        await this.fetchAllFluxByGroup();
    },

    /**
     * Remove a flux from its group.
     * @param {string} uid - The UID of the flux to remove
     */
    async deleteFlux(uid) {
        try {
            const response = await fetch(`/api/flux/${uid}`, {
                method: 'DELETE',
            });
        
            if (response.ok) {
                console.log('Flux deleted successfully');
            } else if (response.status === 404) {
                console.log('Flux not found');
            } else {
                throw new Error('Failed to delete flux');
            }
        } catch (error) {
            console.error('Failed to remove flux:', error);
        }
    },

    /**
     * Remove a flux and refresh the flux store.
     * @param {string} uid - The UID of the flux to remove
     */
    async deleteFluxAndRefreshStore(uid){
        this.deleteFlux(uid);
        this.fetchAllFluxByGroup();
    },

    /**
     * Update a flux
     * @param {string} flux - The flux to update
     */
    async updateFlux(flux) {
        try {
            const editFluxDTO = new EditFluxDTO(flux.name, flux.value, flux.ressourceDependencies)

            const response = await fetch(`/api/flux/${flux.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFluxDTO, null, 2),
            });
        
            if (response.ok) {
                console.log('Flux updated successfully');
            } else if (response.status === 404) {
                console.log('Flux not found');
            } else {
                throw new Error('Failed to update flux');
            }
        } catch (error) {
            console.error('Failed to update flux:', error);
        }
    },

    /**
     * Update a flux and refresh the flux store.
     * @param {object} flux - The flux to update
     */
    async updateFluxAndRefreshStore(flux){
        this.updateFlux(flux);
        this.fetchAllFluxByGroup();
    },

    selectFlux(fluxUid){
        const fluxStore = useFluxStore();
        fluxStore.selectFlux(fluxUid);
    }
};