import React from 'react';
import { render } from '@testing-library/react';
import Father from './Father';
import { BridgeProvider } from './BridgeContext';
import { MemoryRouter } from 'react-router-dom';

describe('Father Pillar', () => {
  it('renders heading and image', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <BridgeProvider>
          <Father />
        </BridgeProvider>
      </MemoryRouter>
    );
    expect(getByText(/Father - The Supreme Will/)).toBeInTheDocument();
    expect(getByAltText(/OluElu: Janus vision/)).toBeInTheDocument();
  });

  it('shows the symbolic caption', () => {
    const { getByText } = render(
      <MemoryRouter>
        <BridgeProvider>
          <Father />
        </BridgeProvider>
      </MemoryRouter>
    );
    expect(getByText(/Janus vision/)).toBeInTheDocument();
  });
});
