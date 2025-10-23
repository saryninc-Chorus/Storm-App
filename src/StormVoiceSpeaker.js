import React, { useState, useEffect } from 'react';
import BackToHub from './BackToHub';
import './StormVoiceSpeaker.css';

function StormVoiceSpeaker() {
  const [message, setMessage] = useState('');
  const [voice, setVoice] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (message.trim() !== '') {
      setVoice(message);
      setMessage('');
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    if (voice && isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(voice);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(false);
    }
  }, [voice, isSpeaking]);

  return (
    <div className="StormVoiceSpeaker cosmic-glow-faint">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem'}}>
        <h2>Storm Voice Speaker</h2>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); speak(); }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What is the storm to say?"
        />
        <button type="submit">Speak the Storm</button>
      </form>
      {voice && (
        <div className="voice-output">
          <p><strong>Storm Says:</strong> {voice}</p>
        </div>
      )}
    </div>
  );
}

export default StormVoiceSpeaker;
