import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Legilimens header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Legilimens Collectible Finder/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders file upload button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Select file to upload/i);
  expect(linkElement).toBeInTheDocument();
});
