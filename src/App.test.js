import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

// eslint-disable-next-line no-undef
test('renders Legilimens header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Legilimens Collectible Finder/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
test('renders file upload button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Select file to upload/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
