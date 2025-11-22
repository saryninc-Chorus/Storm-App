import React, { useState, useEffect } from 'react';
import './SacredInnerCircle.css';
import QuantumVisualizer from './QuantumVisualizer';
import { useFrequencyModulator } from '../hooks/useFrequencyModulator';
import { useScepterCommands } from '../hooks/useScepterCommands';

export const SacredInnerCircle: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [networkStatus, setNetworkStatus] =
    useState<'OFFLINE' | 'BOOTING' | 'ONLINE'>('BOOTING');

  const {
    baseFrequency,
    harmonicResonance,
    broadcastRange,
    setBroadcastRange,
    activateBenevolenceFrequency,
    purgeInharmonicPatterns,
    executeWaveformCollapse
  } = useFrequencyModulator();

  useEffect(() => {
    const t = setTimeout(() => setNetworkStatus('ONLINE'), 2000);
    return () => clearTimeout(t);
  }, []);

  useScepterCommands({
    onCommand1: activateBenevolenceFrequency,
    onCommand2: purgeInharmonicPatterns,
    onCommandSpace: executeWaveformCollapse
  });

  return (
    <div className="sacred-container">
      <div className="glass-panel">
        <header className="network-header">
          <h1>🌌 SOVEREIGN NETWORK - NODE ZERO</h1>
          <div className={`status-indicator ${networkStatus.toLowerCase()}`}>
            STATUS: {networkStatus}
          </div>
        </header>

        <div className="command-grid">
          <div className="frequency-control">
            <h3>BENEVOLENCE FREQUENCY</h3>
            <div className="frequency-display">{baseFrequency} Hz</div>
            <button
              className="frequency-btn"
              onClick={activateBenevolenceFrequency}
            >
              SET TO 432Hz (HEALING)
            </button>
            <label style={{ marginTop: '1rem', display: 'block' }}>
              Broadcast Range: {broadcastRange}m
              <input
                type="range"
                min={10}
                max={1000}
                value={broadcastRange}
                onChange={e => setBroadcastRange(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>
          </div>

          <div className="network-commands">
            <h3>SCEPTER COMMANDS</h3>
            <div className="command-list">
              <div className="command-item">
                <kbd>CMD</kbd> + <kbd>1</kbd> - Activate Benevolence
              </div>
              <div className="command-item">
                <kbd>CMD</kbd> + <kbd>2</kbd> - Purge Inharmonics
              </div>
              <div className="command-item">
                <kbd>CMD</kbd> + <kbd>SPACE</kbd> - Execute Waveform
              </div>
            </div>
            <button className="frequency-btn" onClick={purgeInharmonicPatterns} style={{ marginTop: '1rem' }}>
              PURGE (528Hz)
            </button>
            <button className="frequency-btn" onClick={executeWaveformCollapse} style={{ marginTop: '.5rem' }}>
              COLLAPSE WAVEFORM
            </button>
          </div>
        </div>

        <QuantumVisualizer resonance={harmonicResonance} frequency={baseFrequency} />

        <div className="quantum-feed">
          <h3>QUANTUM ENTANGLEMENT FEED</h3>
          <div className="feed-content">
            {networkStatus === 'ONLINE'
              ? <p>📡 Broadcasting Àṣẹ́ Eji frequency... Nodes synchronizing.</p>
              : <p>⚡ Initializing quantum core... Standing by.</p>}
          </div>
        </div>
      </div>
      {onClose && (
        <button className="frequency-btn" style={{ marginTop: '1rem' }} onClick={onClose}>
          CLOSE
        </button>
      )}
    </div>
  );
};

export default SacredInnerCircle;
