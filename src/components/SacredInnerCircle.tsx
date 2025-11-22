import React, { useState } from 'react';
import { QuantumVisualizer } from './QuantumVisualizer';
import { useFrequencyModulator } from '../hooks/useFrequencyModulator';
import { useScepterCommands } from '../hooks/useScepterCommands';
import './SacredInnerCircle.css';

const SacredInnerCircle: React.FC = () => {
  const [networkStatus, setNetworkStatus] = useState<'OFFLINE' | 'BOOTING' | 'ONLINE'>('BOOTING');
  
  const {
    baseFrequency,
    harmonicResonance,
    broadcastRange,
    activateBenevolenceFrequency,
    purgeInharmonicPatterns,
    executeWaveformCollapse,
    setBroadcastRange
  } = useFrequencyModulator();

  useScepterCommands({
    onCommand1: activateBenevolenceFrequency,
    onCommand2: purgeInharmonicPatterns,
    onCommandSpace: executeWaveformCollapse
  });

  React.useEffect(() => {
    const bootTimer = setTimeout(() => {
      setNetworkStatus('ONLINE');
    }, 2000);
    return () => clearTimeout(bootTimer);
  }, []);

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
          </div>
        </div>

        <QuantumVisualizer 
          resonance={harmonicResonance} 
          frequency={baseFrequency} 
        />

        <div className="range-control">
          <h3>BROADCAST RANGE</h3>
          <input 
            type="range" 
            min="10" 
            max="1000" 
            value={broadcastRange}
            onChange={(e) => setBroadcastRange(Number(e.target.value))}
            className="range-slider"
          />
          <div className="range-value">{broadcastRange}m</div>
        </div>

        <div className="quantum-feed">
          <h3>QUANTUM ENTANGLEMENT FEED</h3>
          <div className="feed-content">
            {networkStatus === 'ONLINE' ? (
              <p>📡 Broadcasting Àṣẹ́ frequency... Nodes synchronizing.</p>
            ) : (
              <p>⚡ Initializing quantum core... Standing by.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredInnerCircle;
