import React, { useState, useEffect } from 'react';
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
    <div className="StormVoiceSpeaker">
      <h2>Storm Voice Speaker</h2>
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
