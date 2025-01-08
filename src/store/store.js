import { useFluxStore } from './fluxStore'
import { useWorkersStore } from './workerStore'
import Worker from "@/models/Worker";
import Flux from "@/models/Flux";

export const initData = function(){
    const fluxStore = useFluxStore(); 
    const workerStore = useWorkersStore();
    
    // fluxStore.fetchFlux();
    // workerStore.fetchWorker();

    workerStore.setWorkers([
        new Worker(
          "group-1",
          "config-123",
          "http://worker1.example.com",
          "apiKey1"
        ),
        new Worker(
          "group-2",
          "config-456",
          "http://worker2.example.com",
          "apiKey2"
        ),
        new Worker(
          "group-3",
          "config-789",
          "http://worker3.example.com",
          "apiKey3"
        ),new Worker(
          "group-1",
          "config-123",
          "http://worker1.example.com",
          "apiKey1"
        ),
        new Worker(
          "group-2",
          "config-456",
          "http://worker2.example.com",
          "apiKey2"
        ),
        new Worker(
          "group-3",
          "config-789",
          "http://worker3.example.com",
          "apiKey3"
        ),new Worker(
          "group-1",
          "config-123",
          "http://worker1.example.com",
          "apiKey1"
        ),
        new Worker(
          "group-2",
          "config-456",
          "http://worker2.example.com",
          "apiKey2"
        ),
        new Worker(
          "group-3",
          "config-789",
          "http://worker3.example.com",
          "apiKey3"
        )
      ])

      fluxStore.setFlux([
        new Flux(
          "flux_001",
          "Basic Energy Flow",
          "user_123", 
          100,
          null,
          new Date("2025-01-01")
        ),
        
        new Flux(
          "flux_002",
          "Manufacturing Process",
          "factory_manager",
          500.75,
          ["raw_materials", "electricity", "labor"],
          new Date("2025-01-05")
        ),
        
        new Flux(
          "flux_003", 
          "Solar Panel Output",
          "energy_dept",
          250.5,
          ["sunlight", "panel_maintenance"],
          new Date("2025-01-07")
        ),
        
        new Flux(
          "flux_004",
          "Water Treatment Flow",
          "utility_manager",
          1000,
          ["raw_water", "chemicals", "filtration_system"],
          new Date("2025-01-03")
        ),
        
        new Flux(
          "flux_005",
          "Network Bandwidth",
          "it_admin",
          5000,
          ["server_capacity", "network_infrastructure"],
          new Date("2025-01-06")
        )
       ]);
}