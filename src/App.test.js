import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bike mania link', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Bike Mania/i)[0];
  expect(linkElement).toBeInTheDocument();
});
