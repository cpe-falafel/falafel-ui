import fluxService from './fluxService'
import workerService from './workerService'

export const initData = async () => {
    await fluxService.fetchAllFluxByGroup();
    await workerService.fetchAllWorkerByGroup();
}