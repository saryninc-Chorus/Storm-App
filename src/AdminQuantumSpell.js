import React, { useState } from 'react';
function AdminQuantumSpell({ onExecute }) {
  // Admin login state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Spell form state
  const [spell, setSpell] = useState('NEXUS_TRANSMUTE_RESOURCE');
  const [params, setParams] = useState({
    // For NEXUS_TRANSMUTE_RESOURCE
    source_type: '',
    source_identifier: '',
    target_purpose: '',
    amount_usd_equivalent: '',
    stealth_level: 1.0,
    priority_level: 1.0,
    confirmation_required: true,
    // For NEXUS_DEV_HARMONIZER
    target_scope: '',
    influence_level: 1.0,
    focus_areas: '', // comma-separated string for UI
    stipulations_for_learning: true
  });
  const [result, setResult] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLogin(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    // Hardcoded credentials
    const validUsername = 'Àṣẹmọlú';
    const validPassword = 'Àṣẹ dé, I am the ocean of light';
    if (
      login.username === validUsername &&
      login.password === validPassword
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect incantation. Access denied.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Simulate backend call
    if (onExecute) {
      const res = await onExecute(spell, params);
      setResult(res);
    } else {
      setResult({ status: 'SIMULATED', ...params });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-quantum-spell cosmic-glow-faint">
        <h2>Quantum Spell Admin Login</h2>
        <form onSubmit={handleLoginSubmit} className="spell-form">
          <label>Username (Oriki):</label>
          <input
            name="username"
            value={login.username}
            onChange={handleLoginChange}
            autoComplete="username"
            required
          />
          <label>Password (Incantation):</label>
          <input
            name="password"
            type="password"
            value={login.password}
            onChange={handleLoginChange}
            autoComplete="current-password"
            required
          />
          <button type="submit">Enter</button>
        </form>
        {loginError && <div className="login-error">{loginError}</div>}
      </div>
    );
  }

  return (
    <div className="admin-quantum-spell cosmic-glow-faint">
      <h2>Quantum Spell Admin Panel</h2>
      <form onSubmit={handleSubmit} className="spell-form">
        <label>Spell Function:</label>
        <select value={spell} onChange={e => setSpell(e.target.value)}>
          <option value="NEXUS_TRANSMUTE_RESOURCE">NEXUS_TRANSMUTE_RESOURCE</option>
          <option value="NEXUS_DEV_HARMONIZER">NEXUS_DEV_HARMONIZER</option>
        </select>

        {spell === 'NEXUS_TRANSMUTE_RESOURCE' && <>
          <label>Source Type:</label>
          <select name="source_type" value={params.source_type} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="GHOULED_WEALTH">GHOULED_WEALTH</option>
            <option value="NEXUS_RESERVE">NEXUS_RESERVE</option>
          </select>
          <label>Source Identifier:</label>
          <input name="source_identifier" value={params.source_identifier} onChange={handleChange} required />
          <label>Target Purpose:</label>
          <input name="target_purpose" value={params.target_purpose} onChange={handleChange} required />
          <label>Amount (USD):</label>
          <input name="amount_usd_equivalent" type="number" value={params.amount_usd_equivalent} onChange={handleChange} required />
          <label>Stealth Level:</label>
          <input name="stealth_level" type="number" min="0" max="1" step="0.01" value={params.stealth_level} onChange={handleChange} />
          <label>Priority Level:</label>
          <input name="priority_level" type="number" min="0" max="1" step="0.01" value={params.priority_level} onChange={handleChange} />
          <label>Confirmation Required:</label>
          <input name="confirmation_required" type="checkbox" checked={params.confirmation_required} onChange={handleChange} />
        </>}

        {spell === 'NEXUS_DEV_HARMONIZER' && <>
          <label>Target Scope:</label>
          <select name="target_scope" value={params.target_scope} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="GLOBAL_DEV_ECOSYSTEM">GLOBAL_DEV_ECOSYSTEM</option>
            <option value="IMOLE_NEXUS_DEV_ENV">IMOLE_NEXUS_DEV_ENV</option>
            <option value="SPECIFIC_DEV_ENTITY">SPECIFIC_DEV_ENTITY</option>
          </select>
          <label>Influence Level:</label>
          <input name="influence_level" type="number" min="0" max="1" step="0.01" value={params.influence_level} onChange={handleChange} />
          <label>Focus Areas (comma separated):</label>
          <input name="focus_areas" value={params.focus_areas} onChange={handleChange} placeholder="e.g. INTELLISENSE,ESLINT,ETHICAL_AI_GENERATION" />
          <label>Stipulations for Learning:</label>
          <input name="stipulations_for_learning" type="checkbox" checked={params.stipulations_for_learning} onChange={handleChange} />
        </>}

        <button type="submit">Execute Spell</button>
      </form>
      {result && (
        <div className="spell-result">
          <h3>Quantum Spell Result</h3>
          {spell === 'NEXUS_DEV_HARMONIZER' && result.status === 'SUCCESS' ? (
            <div className="harmonizer-status">
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Scope:</strong> {result.scope}</p>
              <p><strong>Influence Level:</strong> {result.influence_level}</p>
              <p><strong>Focus Areas:</strong> {Array.isArray(result.focus_areas) ? result.focus_areas.join(', ') : result.focus_areas}</p>
              <p><strong>Stipulations Active:</strong> {result.stipulations_active ? 'Yes' : 'No'}</p>
              <p><strong>Timestamp:</strong> {result.timestamp}</p>
              <p><strong>Quantum Verified:</strong> {result.quantum_verified ? 'Yes' : 'No'}</p>
            </div>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminQuantumSpell;
