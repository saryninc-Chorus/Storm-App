import React, { useState } from 'react';
import { simpleGenerate } from './services/aiService';

function App() {
  const [input, setInput] = useState('Say hello to Ghana Crystalline 5G');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    try {
      setLoading(true);
      const text = await simpleGenerate(input);
      setOutput(text);
    } catch (e: any) {
      setOutput(e?.message ?? 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Ghana Crystalline 5G Network</h1>
      <div style={{ marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: 8 }}
          placeholder="Enter a prompt"
        />
      </div>
      <button onClick={run} disabled={loading} style={{ marginTop: 12, padding: '8px 12px' }}>
        {loading ? 'Generating…' : 'Generate'}
      </button>
      <pre style={{ marginTop: 16, whiteSpace: 'pre-wrap' }}>{output}</pre>
    </main>
  );
}

export default App;