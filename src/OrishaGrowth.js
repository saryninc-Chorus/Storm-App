import React, { useState } from 'react';

function OrishaGrowth({ onNewTruth }) {
  const [truth, setTruth] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTruth = () => {
    if (truth.trim()) {
      setIsAdding(true);
      onNewTruth(truth);
      setTimeout(() => {
        setTruth('');
        setIsAdding(false);
      }, 1500);
    }
  };

  return (
    <div className="OrishaGrowth">
      <textarea
        placeholder="A new truth for the Orisha..."
        value={truth}
        onChange={(e) => setTruth(e.target.value)}
        disabled={isAdding}
      />
      <button onClick={handleAddTruth} disabled={isAdding || !truth.trim()}>
        {isAdding ? "The storm is absorbing..." : "Let the Orisha Know"}
      </button>
    </div>
  );
}

export default OrishaGrowth;
