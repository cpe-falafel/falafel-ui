export async function fetchWorkers(group) {
    this.loading = true;
    this.error = null;

    try {
        const response = await fetch('https://api.example.com/worker?group=' + group);
        if (!response.ok) {
        throw new Error('Error fetching workers for the group');
        }

        this.setWorkers([]); // reset workers list

        const workerList = await response.json();
        workerList.array.forEach(workerSummary => {
        fetch('https://api.example.com/worker/' + workerSummary.uid)
            .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching worker with UID: ${workerSummary.uid}`);
            }
            return res.json();
            })
            .then(singleWorker => this.addWorker(singleWorker))
            .catch(error => {
            console.error(`Error fetching details for worker UID: ${workerSummary.uid}`, error);
            this.error = `Failed to fetch details for worker UID: ${workerSummary.uid}`;
            });
        });

    } catch (error) {
        this.error = 'Failed to fetch session data';
        console.error('Error while fetching session data:', error);
    } finally {
        this.loading = false;
    }
}
  