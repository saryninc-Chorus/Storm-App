import { useState, useEffect } from 'react';
export const useFrequencyModulator = () => {
  const [baseFrequency, setBaseFrequency] = useState(432);
  const [harmonicResonance, setHarmonicResonance] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setHarmonicResonance(p => (p + Math.random() * 10) % 100);
    }, 500);
    return () => clearInterval(id);
  }, []);
  return { baseFrequency, harmonicResonance, setBaseFrequency };
};
