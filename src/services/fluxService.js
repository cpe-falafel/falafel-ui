import { useFluxStore } from '../store/fluxStore';
import { useUserStore } from '../store/userStore';
import CreateFluxDTO from '../models/createFluxDto.js'

export default {

    /**
     * Fetch all user's group flux and store them.
    */
    async fetchAllFluxByGroup() {
        const userStore = useUserStore();
        const fluxStore = useFluxStore();

        this.loading = true;
        this.error = null;

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
                        } catch (error) {
                            console.error(`Error fetching details for flux UID: ${fluxSummary.uid}`, error);
                            this.error = `Failed to fetch details for flux UID: ${fluxSummary.uid}`;
                        }
                    });
                }
            }
        } catch (error) {
            this.error = 'Failed to fetch flux data';
            console.error('Error while fetching flux data:', error);
        } finally {
            this.loading = false;
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
};