import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

// Shared bridge state connecting hub and triad pages
// shape: { focus: 'mother'|'father'|'children'|null, intent: string, updatedAt: number }
const BridgeContext = createContext(null);

export function BridgeProvider({ children }) {
  const [bridge, setBridge] = useLocalStorage('bridge:v2', {
    focus: null,
    intent: '',
    recents: [], // array of strings (most recent first)
    updatedAt: Date.now(),
    user: {
      name: '',
      avatar: '',
      joined: Date.now(),
    },
    preferences: {
      theme: 'cosmic',
      language: 'en',
    },
    session: {
      visits: 0,
      lastVisited: Date.now(),
      history: [], // { pillar, timestamp }
    },
  });

  const value = useMemo(() => ({
    bridge,
    setFocus: (focus) => setBridge((b) => ({
      ...b,
      focus,
      updatedAt: Date.now(),
      session: {
        ...b.session,
        visits: (b.session.visits || 0) + 1,
        lastVisited: Date.now(),
        history: [...(b.session.history || []), { pillar: focus, timestamp: Date.now() }].slice(-20),
      },
    })),
    setIntent: (intent) => setBridge((b) => ({ ...b, intent, updatedAt: Date.now() })),
    saveIntent: (intent) => setBridge((b) => {
      const t = (intent || '').trim();
      if (!t) return { ...b, intent: t, updatedAt: Date.now() };
      const next = [t, ...(b.recents || [])].filter((v, i, arr) => v && arr.indexOf(v) === i).slice(0, 8);
      return { ...b, intent: t, recents: next, updatedAt: Date.now() };
    }),
    clearRecent: (intent) => setBridge((b) => ({
      ...b,
      recents: (b.recents || []).filter((x) => x !== intent),
      updatedAt: Date.now(),
    })),
    setUser: (user) => setBridge((b) => ({ ...b, user: { ...b.user, ...user } })),
    setPreferences: (prefs) => setBridge((b) => ({ ...b, preferences: { ...b.preferences, ...prefs } })),
    reset: () => setBridge({
      focus: null,
      intent: '',
      recents: [],
      updatedAt: Date.now(),
      user: { name: '', avatar: '', joined: Date.now() },
      preferences: { theme: 'cosmic', language: 'en' },
      session: { visits: 0, lastVisited: Date.now(), history: [] },
    }),
  }), [bridge, setBridge]);

  return (
    <BridgeContext.Provider value={value}>
      {children}
    </BridgeContext.Provider>
  );
}

export function useBridge() {
  const ctx = useContext(BridgeContext);
  if (!ctx) throw new Error('useBridge must be used within BridgeProvider');
  return ctx;
}
