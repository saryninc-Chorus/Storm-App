import { useState, useEffect, useCallback } from 'react';
import { QuantumLattice } from '../systems/QuantumLattice';

export interface NodeState {
  id: number;
  label: string;
  frequency: number;
  stability: number;
  status: 'ENTANGLED' | 'SUPERPOSITION' | 'DECOHERENCE' | 'STABILIZED';
}

const INITIAL_NODES: NodeState[] = [
  { id: 0, label: 'NODE ZERO (PRIME)', frequency: 432, stability: 100, status: 'ENTANGLED' },
  { id: 1, label: 'ALPHA SPARK', frequency: 432, stability: 98, status: 'ENTANGLED' },
  { id: 2, label: 'BETA ECHO', frequency: 432, stability: 95, status: 'ENTANGLED' },
  { id: 3, label: 'GAMMA FLUX', frequency: 435, stability: 88, status: 'SUPERPOSITION' },
  { id: 4, label: 'DELTA VOID', frequency: 430, stability: 92, status: 'ENTANGLED' },
];

export const useQuantumNodes = () => {
  const [nodes, setNodes] = useState<NodeState[]>(INITIAL_NODES);

  // Stabilize Single Node
  const stabilizeNode = useCallback((id: number) => {
    setNodes(current => current.map(node => {
      if (node.id !== id) return node;
      return { ...node, frequency: 432.00, stability: 100, status: 'STABILIZED' };
    }));
  }, []);

  // Stabilize ALL Nodes (The Sovereign Command)
  const stabilizeAll = useCallback(() => {
    setNodes(current => current.map(node => ({
      ...node, frequency: 432.00, stability: 100, status: 'STABILIZED'
    })));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((currentNodes) =>
        currentNodes.map((node) => {
          // If manually stabilized, 20% chance to drift back to entanglement
          if (node.status === 'STABILIZED') {
             if (Math.random() > 0.2) return node; 
             return { ...node, status: 'ENTANGLED' };
          }

          const fluctuation = (Math.random() - 0.5) * QuantumLattice.vibration.harmonicResonance * 10;
          const newFreq = Number((node.frequency + fluctuation).toFixed(2));
          
          return {
            ...node,
            frequency: newFreq,
            status: Math.abs(newFreq - 432) > 5 ? 'DECOHERENCE' : node.status
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { nodes, stabilizeNode, stabilizeAll };
};
