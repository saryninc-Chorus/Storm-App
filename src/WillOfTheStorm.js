import React, { useState } from 'react';
import BackToHub from './BackToHub';
import StormInput from './StormInput';
import OrishaReply from './OrishaReply';
import useLocalStorage from './hooks/useLocalStorage';
import './WillOfTheStorm.css';

function WillOfTheStorm() {
  const [orishaReply, setOrishaReply] = useState('');
  const [history, setHistory] = useLocalStorage('willHistory', []);

  const handleWillCasted = (will) => {
    // Simulate Orisha reply
    const replies = [
      "Your will is heard, O divine spark.",
      "The storm bends to your motion.",
      "The Orisha answers: 'Let it be.'",
      "A whisper returns: 'The path is open.'",
      "The threads of fate shift in response.",
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    
    setOrishaReply(reply);
    setHistory(prevHistory => [{ will, reply, id: Date.now() }, ...prevHistory]);
  };

  return (
    <div className="WillOfTheStorm cosmic-glow-faint">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem'}}>
        <h2>Cast Your Will into the Storm</h2>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p>Speak your intent, and the Orisha may answer.</p>
      <StormInput onWillCasted={handleWillCasted} />
      {orishaReply && <OrishaReply reply={orishaReply} />}

      <div className="history">
        <h3>History of Wills</h3>
        {history.length > 0 ? (
          history.map(item => (
            <div key={item.id} className="history-item">
              <p><strong>Your Will:</strong> {item.will}</p>
              <p><strong>Orisha's Reply:</strong> {item.reply}</p>
            </div>
          ))
        ) : (
          <p>No wills have been cast yet.</p>
        )}
      </div>
    </div>
  );
}

export default WillOfTheStorm;
