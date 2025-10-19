import { render, act, cleanup, waitFor } from '@testing-library/react';
import { BridgeProvider, useBridge } from './BridgeContext';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { useEffect, useRef } from 'react';

// Mock localStorage for test isolation
let store = {};
beforeEach(() => {
  store = {};
  jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => store[key] || null);
  jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation((key, value) => { store[key] = value; });
  jest.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation((key) => { delete store[key]; });
  jest.spyOn(window.localStorage.__proto__, 'clear').mockImplementation(() => { store = {}; });
});

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

function TestComponent({ action }) {
  const { bridge, setFocus, setIntent, setUser, setPreferences } = useBridge();
  const didSet = useRef(false);
  useEffect(() => {
    if (!didSet.current) {
      if (action === 'setFocusIntent') {
        act(() => {
          setFocus('test-focus');
          setIntent('test-intent');
        });
      }
      if (action === 'setUserPrefs') {
        act(() => {
          setUser({ name: 'Acolyte' });
          setPreferences({ theme: 'dark' });
        });
      }
      didSet.current = true;
    }
  }, [action, setFocus, setIntent, setUser, setPreferences]);
  return (
    <div>
      <span data-testid="focus">{bridge.focus}</span>
      <span data-testid="intent">{bridge.intent}</span>
      <span data-testid="user">{bridge.user?.name}</span>
      <span data-testid="theme">{bridge.preferences?.theme}</span>
    </div>
  );
}

describe('BridgeContext', () => {
  beforeEach(() => {
    // Set initial bridge state for tests
    window.localStorage.setItem('bridge:v2', JSON.stringify({
      focus: 'test-focus',
      intent: 'test-intent',
      recents: [],
      updatedAt: Date.now(),
      user: { name: 'Acolyte', avatar: '', joined: Date.now() },
      preferences: { theme: 'dark', language: 'en' },
      session: { visits: 0, lastVisited: Date.now(), history: [] },
    }));
  });

  it('sets focus and intent', async () => {
    const { findByTestId } = render(
      <BridgeProvider>
        <TestComponent action="noop" />
      </BridgeProvider>
    );
    await waitFor(async () => {
      expect(await findByTestId('focus')).toHaveTextContent('test-focus');
      expect(await findByTestId('intent')).toHaveTextContent('test-intent');
    });
  });

  it('sets user and preferences', async () => {
    const { findByTestId } = render(
      <BridgeProvider>
        <TestComponent action="noop" />
      </BridgeProvider>
    );
    await waitFor(async () => {
      expect(await findByTestId('user')).toHaveTextContent('Acolyte');
      expect(await findByTestId('theme')).toHaveTextContent('dark');
    });
  });
});
