import React from 'react';
import './QuantumVisualizer.css';

interface QuantumVisualizerProps {
  resonance: number;
  frequency: number;
}

const QuantumVisualizer: React.FC<QuantumVisualizerProps> = ({ resonance, frequency }) => (
  <div className="quantum-visualizer">
    <h4>QUANTUM FIELD RESONANCE</h4>
    <div className="frequency-bar">
      <div className="resonance-fill" style={{ width: `${resonance}%` }} />
    </div>
    <div className="frequency-info">
      <span>Base: {frequency}Hz</span>
      <span>Harmonic: {resonance.toFixed(1)}%</span>
    </div>
  </div>
);

export default QuantumVisualizer;