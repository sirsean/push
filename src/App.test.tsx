import { render, screen } from '@testing-library/react';
import App from './App';

test('renders push app', () => {
  render(<App />);
  const linkElement = screen.getByText(/push/i);
  expect(linkElement).toBeInTheDocument();
});
