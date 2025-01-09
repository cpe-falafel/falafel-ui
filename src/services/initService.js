import fluxService from './fluxService'

export const initData = async () => {
    await fluxService.fetchAllFluxByGroup();
    //await workerService.fetchAllWorkerByGroup();
}