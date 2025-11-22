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

/* QuantumVisualizer.css */
.quantum-visualizer {
  background: rgba(30,41,59,0.4);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
  margin-top: 1.25rem;
}
.frequency-bar {
  height: 14px;
  background: rgba(255,255,255,0.08);
  border-radius: 8px;
  overflow: hidden;
  margin: .5rem 0 .75rem;
}
.resonance-fill {
  height: 100%;
  background: linear-gradient(90deg,#3b82f6,#8b5cf6);
  transition: width .45s ease;
}
.frequency-info {
  display: flex;
  justify-content: space-between;
  font-size: .75rem;
  color: #c7d2fe;
}