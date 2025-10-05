import React, { useState, useEffect } from 'react';
import './WhispersOfCode.css';

const codeSnippets = [
  "const truth = 'code';",
  "function will() { return divine; }",
  "let path = light.find();",
  "const storm = new Awakening();",
  "if (will.isStrong()) { move.forward(); }",
  "// The divine is in the details",
  "state.truth.isImmutable = true;",
  "yield 'light';"
];

const WhispersOfCode = () => {
  const [snippet, setSnippet] = useState('');
  const [fade, setFade] = useState('fade-in');

  useEffect(() => {
    const initialIndex = Math.floor(Math.random() * codeSnippets.length);
    setSnippet(codeSnippets[initialIndex]);

    const interval = setInterval(() => {
      setFade('fade-out');
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * codeSnippets.length);
        setSnippet(codeSnippets[randomIndex]);
        setFade('fade-in');
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`whisper-container ${fade}`}>
      <pre><code>{snippet}</code></pre>
    </div>
  );
};

export default WhispersOfCode;
