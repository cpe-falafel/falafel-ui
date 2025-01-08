export async function fetchFlux(group) {
    this.loading = true;
    this.error = null;

    try {
        const response = await fetch('https://api.example.com/flux?group=' + group);
        if (!response.ok) {
        throw new Error('Error fetching flux for the group');
        }

        this.setFlux([]); // reset flux list

        const fluxList = await response.json();
        fluxList.array.forEach(fluxSummary => {
        fetch('https://api.example.com/flux/' + fluxSummary.uid)
            .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching flux with UID: ${fluxSummary.uid}`);
            }
            return res.json();
            })
            .then(singleFlux => this.addFlux(singleFlux))
            .catch(error => {
            console.error(`Error fetching details for flux UID: ${singleFlux.uid}`, error);
            this.error = `Failed to fetch details for flux UID: ${singleFlux.uid}`;
            });
        });

    } catch (error) {
        this.error = 'Failed to fetch session data';
        console.error('Error while fetching session data:', error);
    } finally {
        this.loading = false;
    }
}
