import React, { useState, useEffect } from 'react';

function StormVoice({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    };

    if (text && !isSpeaking) {
      speak();
    }
  }, [text]);

  return (
    <div className="StormVoice">
      <p>{isSpeaking ? "The storm is speaking..." : "The storm is silent."}</p>
    </div>
  );
}

export default StormVoice;
