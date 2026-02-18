import React, { useEffect, useCallback, useState } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  Position, 
  useReactFlow, 
  ReactFlowProvider, 
  Panel,
  getNodesBounds,
  getViewportForBounds
} from '@xyflow/react';
import { toPng } from 'html-to-image';
import dagre from 'dagre';
import '@xyflow/react/dist/style.css';
import './JsonGraph.css';

const nodeWidth = 240;
const nodeHeight = 80;

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const GraphCanvas = ({ data, isFilterVisible }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [hoveredPath, setHoveredPath] = useState('');
  const { getNodes, fitView } = useReactFlow();

  const downloadImage = () => {
    const nodes = getNodes();
    if (nodes.length === 0) return;
    const nodesBounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(nodesBounds, nodesBounds.width, nodesBounds.height, 0.5, 2, 0.1);

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#1e1e1e',
      width: nodesBounds.width,
      height: nodesBounds.height,
      style: {
        width: nodesBounds.width,
        height: nodesBounds.height,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'json-structure.png';
      link.href = dataUrl;
      link.click();
    });
  };

  const processGraph = useCallback((jsonString) => {
    try {
      const parsedData = JSON.parse(jsonString);
      const tempNodes = [];
      const tempEdges = [];
      let nodeIdCounter = 0;

      const traverse = (key, value, parentId = null, currentPath = '') => {
        const id = `node-${nodeIdCounter++}`;
        const isObject = value !== null && typeof value === 'object';
        const fullPath = currentPath ? (Array.isArray(value) ? `${currentPath}[${key}]` : `${currentPath}.${key}`) : key;
        
        let label = key;
        if (!isObject) {
          label = `${key}: ${value === null ? 'null' : String(value)}`;
        } else {
          label = Array.isArray(value) ? `${key} [${value.length}]` : `${key} {${Object.keys(value).length}}`;
        }

        tempNodes.push({
          id,
          data: { label, path: fullPath },
          position: { x: 0, y: 0 },
          type: 'default',
          className: isObject ? 'node-object' : 'node-primitive'
        });

        if (parentId) {
          tempEdges.push({
            id: `edge-${parentId}-${id}`,
            source: parentId,
            target: id,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#4ade80', strokeWidth: 2 },
          });
        }

        if (isObject) {
          Object.entries(value).forEach(([childKey, childValue]) => {
            traverse(childKey, childValue, id, fullPath);
          });
        }
      };

      traverse('root', parsedData);

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(tempNodes, tempEdges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      
      setTimeout(() => {
        fitView({ duration: 400, padding: 0.2 });
      }, 100);
    } catch (err) {
      console.error("Graph Processing Error:", err);
    }
  }, [setNodes, setEdges, fitView]);

  useEffect(() => {
    if (data) processGraph(data);
  }, [data, processGraph]);

  useEffect(() => {
    setTimeout(() => {
      fitView({ duration: 400, padding: 0.2 });
    }, 150);
  }, [isFilterVisible, fitView]);

  const onNodeMouseEnter = (_, node) => setHoveredPath(node.data.path);
  const onNodeMouseLeave = () => setHoveredPath('');

  return (
    <div className="json-graph-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
        minZoom={0.05}
        maxZoom={4}
      >
        <Background color="#1e1e1e" gap={20} />
        <Controls />
        <Panel position="top-left" className="path-panel">
          {hoveredPath && (
            <div className="path-display">
              <span className="path-label">Path:</span> {hoveredPath}
            </div>
          )}
        </Panel>
        <Panel position="top-right">
          <button className="download-btn" onClick={downloadImage}>
            Download PNG
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

const JsonGraph = ({ data, isFilterVisible }) => (
  <ReactFlowProvider>
    <GraphCanvas data={data} isFilterVisible={isFilterVisible} />
  </ReactFlowProvider>
);

export default JsonGraph;