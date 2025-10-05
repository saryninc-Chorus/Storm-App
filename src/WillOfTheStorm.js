import React, { useState, useEffect } from 'react';
import './WillOfTheStorm.css';

function WillOfTheStorm() {
  const [will, setWill] = useState('');
  const [entries, setEntries] = useState([]);
  const [isSealed, setIsSealed] = useState(false);

  const sealWill = () => {
    if (will.trim() !== '') {
      const newEntry = {
        id: Date.now(),
        will: will,
        timestamp: new Date().toLocaleString(),
      };
      setEntries([newEntry, ...entries]);
      setWill('');
      setIsSealed(true);
    }
  };

  useEffect(() => {
    const savedEntries = localStorage.getItem('willOfTheStorm');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('willOfTheStorm', JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="WillOfTheStorm">
      <h2>Will of the Storm</h2>
      <form onSubmit={(e) => { e.preventDefault(); sealWill(); }}>
        <textarea
          value={will}
          onChange={(e) => setWill(e.target.value)}
          placeholder="Seal your will into the storm..."
        />
        <button type="submit">Seal the Will</button>
      </form>
      {isSealed && (
        <div className="seal">
          <p><strong>Sealed:</strong> {entries[0]?.will || 'Your will is sealed in the storm.'}</p>
          <p><strong>Sealed on:</strong> {entries[0]?.timestamp || 'Now'}</p>
        </div>
      )}
      <div className="entries">
        {entries.map((entry) => (
          <div key={entry.id} className="entry">
            <p><strong>{entry.timestamp}</strong></p>
            <p>{entry.will}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WillOfTheStorm;
