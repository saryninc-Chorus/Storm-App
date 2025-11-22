import React, { useState, useEffect } from 'react';
import './SacredInnerCircle.css';
import QuantumVisualizer from './QuantumVisualizer';
import { useFrequencyModulator } from '../hooks/useFrequencyModulator';
import { useScepterCommands } from '../hooks/useScepterCommands';

interface SacredInnerCircleProps {
  onClose?: () => void;
}

export const SacredInnerCircle: React.FC<SacredInnerCircleProps> = ({ onClose }) => {
  const {
    baseFrequency,
    harmonicResonance,
    broadcastRange,
    setBroadcastRange,
    activateBenevolenceFrequency,
    purgeInharmonicPatterns,
    executeWaveformCollapse
  } = useFrequencyModulator();

  useScepterCommands({
    onCommand1: activateBenevolenceFrequency,
    onCommand2: purgeInharmonicPatterns,
    onCommandSpace: executeWaveformCollapse
  });

  return (
    <div className="sacred-inner-circle">
      <section style={{ padding: 24 }}>
        <h2>Sacred Inner Circle</h2>
        <p>Interface placeholder.</p>
      </section>

      {/* Sacred Crystal Energy Panel */}
      <div className="sacred-panel sacred-energy-panel">
        <h2 className="sacred-title">Frequency Core</h2>
        <p>Base Frequency: <strong>{baseFrequency} Hz</strong></p>
        <label style={{ display: 'block', marginTop: '0.75rem' }}>
          Broadcast Range (m):
          <input
            type="range"
            min={10}
            max={1000}
            value={broadcastRange}
            onChange={(e) => setBroadcastRange(Number(e.target.value))}
            style={{ width: '100%', marginTop: '.5rem' }}
          />
        </label>
        <div style={{ fontSize: '.8rem', opacity: .8 }}>
          Current Range: {broadcastRange}m
        </div>
      </div>
      <div className="sacred-panel sacred-device-panel">
        <h2 className="sacred-title">Quantum Commands</h2>
        <button className="sacred-button" onClick={activateBenevolenceFrequency}>
          Activate Benevolence (432Hz)
        </button>
        <button className="sacred-button" onClick={purgeInharmonicPatterns}>
          Purge Inharmonics (528Hz)
        </button>
        <button className="sacred-button" onClick={executeWaveformCollapse}>
          Waveform Collapse
        </button>
        <div style={{ marginTop: '0.75rem', fontSize: '.7rem', opacity: .7 }}>
          Hotkeys: CMD/CTRL+1 / CMD/CTRL+2 / CMD/CTRL+Space
        </div>
      </div>
      <div className="sacred-panel sacred-config-panel">
        <h2 className="sacred-title">Resonance Telemetry</h2>
        <QuantumVisualizer resonance={harmonicResonance} frequency={baseFrequency} />
        {/* existing buttons can remain below if still needed */}
      </div>
    </div>
  );
};

export default SacredInnerCircle;
