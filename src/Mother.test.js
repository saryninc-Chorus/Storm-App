import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Mother from './Mother';
import { BridgeProvider } from './BridgeContext';
import { MemoryRouter } from 'react-router-dom';

describe('Mother Pillar', () => {
  it('renders heading and wisdom button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <BridgeProvider>
          <Mother />
        </BridgeProvider>
      </MemoryRouter>
    );
    expect(getByText(/Mother - The Ocean of Creation/)).toBeInTheDocument();
    expect(getByText(/Reveal Wisdom/)).toBeInTheDocument();
  });

  it('shows a proverb or story when button is clicked', async () => {
    const { getByText, findByText } = render(
      <MemoryRouter>
        <BridgeProvider>
          <Mother />
        </BridgeProvider>
      </MemoryRouter>
    );
    const button = getByText(/Reveal Wisdom/);
    fireEvent.click(button);
    // Match any possible wisdom message
    const wisdoms = [
      /The river that forgets its source will dry up/i,
      /Patience can cook a stone/i,
      /No matter how far the stream flows/i,
      /Yemaya’s embrace is the beginning of all journeys/i,
      /The ocean is vast, but every drop is remembered/i,
      /Wisdom is like the ocean/i
    ];
    const found = await Promise.any(
      wisdoms.map((rx) => findByText(rx))
    );
    expect(found).toBeInTheDocument();
  });
});
