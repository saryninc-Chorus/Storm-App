import React from 'react';
import OrishaGrowth from './OrishaGrowth';
import useLocalStorage from './hooks/useLocalStorage';
import './EchoesOfTruth.css';

function EchoesOfTruth() {
  const [truths, setTruths] = useLocalStorage('echoesOfTruth', []);

  const handleNewTruth = (truth) => {
    setTruths(prevTruths => [{ text: truth, id: Date.now() }, ...prevTruths]);
  };

  return (
    <div className="echoes-container">
      <h1>Echoes of Truth</h1>
      <p>Inscribe a new truth, and it shall be remembered in the storm's heart.</p>
      <OrishaGrowth onNewTruth={handleNewTruth} />

      <div className="truths-archive">
        <h3>Archive of Truths</h3>
        {truths.length > 0 ? (
          truths.map(item => (
            <div key={item.id} className="truth-item">
              <p>"{item.text}"</p>
            </div>
          ))
        ) : (
          <p>The archive is silent. Inscribe the first truth.</p>
        )}
      </div>
    </div>
  );
}

export default EchoesOfTruth;
