import React from 'react';
import { render, screen } from '@testing-library/react';
import Panel from '../components/Panel';

test('renders learn react link', () => {
  render(<Panel />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

