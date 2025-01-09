import * as dagre from 'dagre';

/**
 * @param {{id:string}} nodes
 * @param {{source:string, target:string}} edges
 * @return {{id:string, position:{x:number, y:number}}}
 */
export function optimizeNodePosition(nodes, edges) {
    const g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(() => ({}));

    // Ajouter les nœuds au graphe
    nodes.forEach(node => {
        g.setNode(node.id, { width: 600, height: 300 }); // Vous pouvez ajuster la taille des nœuds
    });

    // Ajouter les arêtes au graphe
    edges.forEach(edge => {
        g.setEdge(edge.source, edge.target);
    });

    // Configurer la mise en page
    dagre.layout(g, { rankdir: 'LR' });

    // Extraire les positions des nœuds
    const nodePositions = nodes.map(node => {
        const graphNode = g.node(node.id);
        return {
            ...node,
            position: {
                x: graphNode.x,
                y: graphNode.y
            }
        };
    });

    console.log("POSPOS", nodePositions)
    return nodePositions;
}
