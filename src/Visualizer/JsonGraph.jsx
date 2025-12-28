import React, { useEffect, useState } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './JsonGraph.css';

const JsonGraph = ({ data }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState(null);
  const [rfInstance, setRfInstance] = useState(null);
  
  const processGraph = (jsonString) => {
    try {
      const parsedData = JSON.parse(jsonString);
      const newNodes = [];
      const newEdges = [];
      let nodeId = 0;
      const xSpacing = 250;
      const ySpacing = 80;

      const createNode = (key, value, x, y, parentId = null) => {
        const currentId = `node-${nodeId++}`;
        const isObject = value !== null && typeof value === 'object';
        const label = isObject 
          ? (Array.isArray(value) ? `${key} []` : `${key} {}`) 
          : `${key}: ${String(value)}`;

        newNodes.push({
          id: currentId,
          data: { label },
          position: { x, y },
          type: 'default',
          style: { 
            background: isObject ? '#f0f0f0' : '#fff',
            border: '1px solid #777',
            borderRadius: '5px',
            padding: '10px',
            fontSize: '12px',
            minWidth: '150px'
          }
        });

        if (parentId) {
          newEdges.push({
            id: `edge-${parentId}-${currentId}`,
            source: parentId,
            target: currentId,
            animated: true,
            style: { stroke: '#555' }
          });
        }

        if (isObject) {
          let childIndex = 0;
          Object.entries(value).forEach(([childKey, childValue]) => {
            createNode(
              childKey, 
              childValue, 
              x + xSpacing, 
              y + (childIndex * ySpacing) - (Object.keys(value).length * ySpacing / 2), 
              currentId
            );
            childIndex++;
          });
        }
      };

      createNode('Root', parsedData, 50, 50);
      
      setNodes(newNodes);
      setEdges(newEdges);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (data) {
      processGraph(data);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (rfInstance && !error) {
      window.requestAnimationFrame(() => {
        rfInstance.fitView({ padding: 0.2, duration: 800 });
      });
    }
  }, [data, rfInstance, error]);

  if (error) {
    return (
      <div className="graph-error">
        <h3>Invalid JSON</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="json-graph-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={setRfInstance}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default JsonGraph;