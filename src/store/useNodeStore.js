import { defineStore } from "pinia";
import { markRaw } from "vue";
import NodeItem from "@/components/FluxEditor/FluxEditorNodeItem.vue";

export const useNodeStore = defineStore("flow", {
  state: () => ({
    nodes: [
      {
        id: "1",
        type: "custom-node",
        position: { x: 50, y: 50 },
        data: { label: "Source", foo: "bar" },
      },
      {
        id: "2",
        type: "custom-node",
        position: { x: 300, y: 50 },
        data: { label: "Effet", param: 123, type: "custom" },
      },
      {
        id: "3",
        type: "custom-node",
        position: { x: 550, y: 50 },
        data: { label: "Output" },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
    ],

    nodeTypes: {
      "custom-node": markRaw(NodeItem),
      "image-node": markRaw(NodeItem),
      "text-node": markRaw(NodeItem),
      "border-node": markRaw(NodeItem),
    },

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
      }
    },
  },

  getters: {
    getNodeById: (state) => (id) => {
      return state.nodes.find((n) => n.id === id);
    },
  },
});
