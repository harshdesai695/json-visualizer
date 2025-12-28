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
      
      const xSpacing = 350;
      const ySpacing = 50;
      let nodeIdCounter = 0;
      let leafIndex = 0;

      const traverseAndCalculatePositions = (key, value, depth) => {
        const isObject = value !== null && typeof value === 'object';
        const hasChildren = isObject && Object.keys(value).length > 0;
        
        const currentId = `node-${nodeIdCounter++}`;
        const labelText = isObject 
          ? (Array.isArray(value) ? `${key} []` : `${key} {}`) 
          : `${key}: ${String(value)}`;

        const nodeData = {
          id: currentId,
          key,
          label: labelText,
          isObject,
          x: depth * xSpacing,
          y: 0,
          childrenIds: []
        };

        if (hasChildren) {
          let firstChildY = null;
          let lastChildY = null;

          Object.entries(value).forEach(([childKey, childValue]) => {
            const childNode = traverseAndCalculatePositions(childKey, childValue, depth + 1);
            nodeData.childrenIds.push(childNode.id);
            
            if (firstChildY === null) firstChildY = childNode.y;
            lastChildY = childNode.y;
            
            newEdges.push({
              id: `edge-${currentId}-${childNode.id}`,
              source: currentId,
              target: childNode.id,
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#888', strokeWidth: 1.5 }
            });
          });

          nodeData.y = (firstChildY + lastChildY) / 2;
        } else {
          nodeData.y = leafIndex * ySpacing;
          leafIndex++;
        }

        newNodes.push({
          id: nodeData.id,
          data: { label: nodeData.label },
          position: { x: nodeData.x, y: nodeData.y },
          type: 'default',
          className: nodeData.isObject ? 'is-object' : '',
          title: nodeData.label 
        });

        return nodeData;
      };

      traverseAndCalculatePositions('Root', parsedData, 0);
      
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
      const timer = setTimeout(() => {
        rfInstance.fitView({ padding: 0.1, duration: 800 });
      }, 50);
      return () => clearTimeout(timer);
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
        <Background color="#e0e0e0" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default JsonGraph;