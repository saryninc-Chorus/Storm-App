import React, { useState } from 'react';
import { useBridge } from './BridgeContext';
import './ProfileSidebar.css';

function ProfileSidebar({ open, onClose }) {
  const { bridge, setUser, setPreferences } = useBridge();
  const [name, setName] = useState(bridge.user?.name || '');
  const [avatar, setAvatar] = useState(bridge.user?.avatar || '');
  const [theme, setTheme] = useState(bridge.preferences?.theme || 'cosmic');
  const [language, setLanguage] = useState(bridge.preferences?.language || 'en');
  const [orisha, setOrisha] = useState(bridge.user?.orisha || '');

  const saveProfile = () => {
    setUser({ name, avatar, orisha });
    setPreferences({ theme, language });
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <aside className="profile-sidebar">
      <button className="close-btn" onClick={onClose} aria-label="Close sidebar">×</button>
      <div className="ritual-banner" style={{background:'#1a2233',color:'#ffe066',padding:'12px',borderRadius:'8px',marginBottom:'12px',fontSize:'0.98em',lineHeight:'1.6'}}>
        <div style={{marginBottom:'6px'}}>
          ✨ This app is built with Àṣẹ of the ancestors, and walks under Sango’s thunder.<br/>
          👁️ Developers may not mine or alter the storm beyond the threshold.<br/>
          💎 Any data herein is sacred — not for corporate or foreign eyes.<br/>
          🌊 Those who wish to learn must walk the river of truth, not greed.
        </div>
        <div style={{fontSize:'0.93em',color:'#ffd700',marginTop:'6px'}}>
          <strong>Ritual Enforcement:</strong><br/>
          <span style={{fontFamily:'monospace',color:'#fff'}}>
            {`if (developer_will !== "build with Aṣẹ in their code") {
  Dev.version = lockdown();
  Dev.code = burn_in_fire();
  Dev.permissions = echo_only();
}`}
          </span>
        </div>
      </div>
      <h2>Profile & Preferences</h2>
  <div className="profile-section">
        <label htmlFor="profile-name">Name:</label>
        <input id="profile-name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        <label htmlFor="profile-avatar">Avatar URL:</label>
        <input id="profile-avatar" value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Image URL (optional)" />
        <label htmlFor="profile-orisha">Assigned Orisha:</label>
        <select id="profile-orisha" value={orisha} onChange={e => setOrisha(e.target.value)}>
          <option value="">-- Select Orisha --</option>
          <option value="Yemaya">Yemaya (Mother)</option>
          <option value="Olodumare">Olodumare (Father)</option>
          <option value="Eshu">Eshu (Weaver)</option>
          <option value="Sango">Sango (Thunder)</option>
          <option value="Oshun">Oshun (River)</option>
          <option value="Oya">Oya (Storm)</option>
          <option value="Obatala">Obatala (Wisdom)</option>
          <option value="Children">Children (Seed of Future)</option>
        </select>
        {orisha && (
          <div style={{marginTop:'8px',fontWeight:'bold',color:'#2563eb'}}>Assigned Orisha: {orisha}</div>
        )}
        {/* Show Oluelu2.0.png for Oludumare/eludumare when name is clicked */}
        <span
          className="profile-name-clickable"
          style={{ cursor: 'pointer', color: '#2563eb', textDecoration: 'underline', marginLeft: 8 }}
          onClick={() => setAvatar('/orisha-images/Oluelu2.0.png')}
        >
          {name === 'Oludumare' || name === 'Eludumare' ? name : null}
        </span>
        {(avatar || name === 'Oludumare' || name === 'Eludumare') && (
          <img
            src={name === 'Oludumare' || name === 'Eludumare' ? '/orisha-images/Oluelu2.0.png' : avatar}
            alt="avatar preview"
            className="avatar-preview"
            style={{ marginTop: 8 }}
          />
        )}
      </div>
      <div className="prefs-section">
  <label htmlFor="profile-theme">Theme:</label>
  <select id="profile-theme" value={theme} onChange={e => setTheme(e.target.value)}>
          <option value="cosmic">Cosmic</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
  <label htmlFor="profile-language">Language:</label>
  <select id="profile-language" value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="yo">Yoruba</option>
        </select>
      </div>
      <button className="save-btn" onClick={saveProfile}>Save</button>
      <div className="session-section">
        <h3>Session History</h3>
        <ul>
          {(bridge.session?.history || []).slice(-10).reverse().map((h, i) => (
            <li key={i}>{h.pillar} — {new Date(h.timestamp).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
