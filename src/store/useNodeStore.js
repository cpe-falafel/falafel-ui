import {defineStore} from "pinia";
import {MarkerType} from "@vue-flow/core";
import {optimizeNodePosition} from "@/utils/graphPosUtils.js";
import {storeFromSerialGraph} from "@/services/serialGraphService.js";

export const useNodeStore = defineStore("flow", {
  state: () => ({
    nodes: [
      {
        id: "1",
        type: "customFilter",
        position: { x: 50, y: 50 },
        data: { type: "_IN", properties: {_label: "Entrée",src:""} },
      },
      {
        id: "2",
        type: "customFilter",
        position: { x: 550, y: 50 },
        data: { type: "_OUT", properties: {_label: "Sortie", dst:""} },
      },
      {
        id: "3",
        type: "customFilter",
        position: { x: 300, y: 50 },
        data: { type: "drawbox", properties: {
          _label: "Ajout Cadre",
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

    updateNodesPositions(nodeChanges) {
      for (let {id, position} of nodeChanges) {
        const idx = this.nodes.findIndex(n => n.id === id);
        if (idx === -1) continue;
        this.nodes[idx].position = position;
      }
      this.nodes = [...this.nodes];
    },

    updateEdges(edges) {
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
    updateSelectedNodeProperties(props) {
      if (!this.selectedNode) return null;
      const idx = this.nodes.findIndex((n) => n.id === this.selectedNode.id);
      this.selectedNode = {...this.selectedNode, data:{...this.selectedNode.data, properties: props}};
      if (idx !== -1) {
        this.nodes[idx].data.properties = props;
        this.nodes = [...this.nodes];
      }
    },
    optimizeNodePositions() {
      this.nodes = optimizeNodePosition(this.nodes, this.edges).map(n => ({...n, computedPositions: undefined}));
    },
    /**
     *
     * @param {string} conf
     */
    loadConf(conf){
      const {nodes, edges} = storeFromSerialGraph(conf);
      this.nodes = nodes;
      this.edges = edges;
      this.optimizeNodePositions();
    }
  },

  getters: {
    getNodeById: (state) => (id) => {
      return state.nodes.find((n) => n.id === id);
    },
  },
});