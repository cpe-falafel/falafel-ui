import { defineStore } from "pinia";
import { MarkerType } from "@vue-flow/core";

export const useNodeStore = defineStore("flow", {
  state: () => ({
    nodes: [
      {
        id: "1",
        type: "customFilter",
        position: { x: 50, y: 50 },
        data: { label: "Entrée", type: "_IN", properties: {src:""} },
      },
      {
        id: "2",
        type: "customFilter",
        position: { x: 550, y: 50 },
        data: { label: "Sortie", type: "_OUT", properties: {dst:""} },
      },
      {
        id: "3",
        type: "customFilter",
        position: { x: 300, y: 50 },
        data: { label: "Ajout Cadre", type: "drawbox", properties: {
          color: "#000000",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          thickness: 1,
        } },
      },
    ],
    edges: [
      {
        id: "e1-3",
        source: "1",
        target: "3",
        sourceHandle: "source-1-v1",
        targetHandle: "target-3-v1",
        markerEnd: MarkerType.ArrowClosed,
        animated: true,
      },
      {
        id: "e3-2",
        source: "3",
        target: "2",
        sourceHandle: "source-3-v1",
        targetHandle: "target-2-v1",
        markerEnd: MarkerType.ArrowClosed,
        animated: true,
      },
    ],

    selectedNode: null,
  }),

  actions: {
    setSelectedNode(node) {
      this.selectedNode = node;
    },

    updateGraph(nodes, edges) {
      this.nodes = nodes;
      this.edges = edges;
    },

    addNode(newNode) {
      this.nodes.push(newNode);
    },

    updateNodeData(updatedNode) {
      const idx = this.nodes.findIndex((n) => n.id === updatedNode.id);
      if (idx !== -1) {
        this.nodes[idx] = updatedNode;
        this.nodes = [...this.nodes];
      }
    },
  },

  getters: {
    getNodeById: (state) => (id) => {
      return state.nodes.find((n) => n.id === id);
    },
  },
});
