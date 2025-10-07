import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

function RitualPulse() {
  const [isPulsing, setIsPulsing] = useState(false);
  const [pulseCount, setPulseCount] = useLocalStorage('pulseCount', 0);

  useEffect(() => {
    if (isPulsing) {
      const timer = setInterval(() => {
        setPulseCount((count) => count + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPulsing, setPulseCount]);

  const startRitual = () => {
    setIsPulsing(true);
  };

  const stopRitual = () => {
    setIsPulsing(false);
    setPulseCount(0);
  };

  return (
    <div className="RitualPulse">
      <h3>{"⚡ The Storm's Pulse"} {isPulsing ? "⚡" : ""}</h3>
      <p>Counts: {pulseCount}</p>
      <div>
        <button onClick={startRitual} disabled={isPulsing}>
          Begin the Pulse
        </button>
        <button onClick={stopRitual} disabled={!isPulsing}>
          End the Pulse
        </button>
      </div>
    </div>
  );
}

export default RitualPulse;
