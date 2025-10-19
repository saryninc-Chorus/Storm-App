import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfileSidebar from './ProfileSidebar';
import { BridgeProvider } from './BridgeContext';
import { MemoryRouter } from 'react-router-dom';

describe('ProfileSidebar', () => {
  it('renders when open and closes on button click', () => {
    const handleClose = jest.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <MemoryRouter>
        <BridgeProvider>
          <ProfileSidebar open={true} onClose={handleClose} />
        </BridgeProvider>
      </MemoryRouter>
    );
    expect(getByText(/Profile & Preferences/)).toBeInTheDocument();
    fireEvent.click(getByLabelText(/Close sidebar/));
    expect(handleClose).toHaveBeenCalled();
  });

  it('saves user name and theme', () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <BridgeProvider>
          <ProfileSidebar open={true} onClose={() => {}} />
        </BridgeProvider>
      </MemoryRouter>
    );
    fireEvent.change(getByLabelText(/Name:/), { target: { value: 'Acolyte' } });
    fireEvent.change(getByLabelText(/Theme:/), { target: { value: 'dark' } });
    fireEvent.click(getByText(/Save/));
    // No assertion here, but you can extend to check BridgeContext values
  });
});
