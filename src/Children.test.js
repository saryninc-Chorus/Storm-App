import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Children from './Children';
import { BridgeProvider } from './BridgeContext';
import { MemoryRouter } from 'react-router-dom';

describe('Children Pillar', () => {
  it('renders heading and constellation area', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <BridgeProvider>
          <Children />
        </BridgeProvider>
      </MemoryRouter>
    );
    expect(getByText(/Children - The Seed of the Future/)).toBeInTheDocument();
    expect(getByLabelText(/Constellation builder area/)).toBeInTheDocument();
  });

  it('adds a star when constellation area is clicked', () => {
    const { getByLabelText, container } = render(
      <MemoryRouter>
        <BridgeProvider>
          <Children />
        </BridgeProvider>
      </MemoryRouter>
    );
    const area = getByLabelText(/Constellation builder area/);
    fireEvent.click(area, { clientX: 50, clientY: 50 });
    // Look for a star element
    expect(container.querySelector('.constellation-star')).toBeTruthy();
  });
});
