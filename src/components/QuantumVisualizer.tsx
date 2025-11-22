import React from 'react';
import './QuantumVisualizer.css';

interface QuantumVisualizerProps {
  resonance: number;
  frequency: number;
}

export const QuantumVisualizer: React.FC<QuantumVisualizerProps> = ({ 
  resonance, 
  frequency 
}) => {
  return (
    <div className="quantum-viz">
      <h3>QUANTUM RESONANCE VISUALIZER</h3>
      <div className="viz-container">
        <div className="frequency-bar">
          <div 
            className="frequency-fill"
            style={{ width: `${(frequency / 1000) * 100}%` }}
          ></div>
        </div>
        <div className="resonance-display">
          <span>Harmonic Resonance: {resonance.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default QuantumVisualizer;
