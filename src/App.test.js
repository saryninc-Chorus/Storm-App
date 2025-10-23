import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders the ritual hub link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Méta-ÍSÍ \(The Bridge\)/i);
  expect(linkElement).toBeInTheDocument();
});
