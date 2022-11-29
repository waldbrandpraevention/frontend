import React from 'react';
import { render, screen } from '@testing-library/react';
import Panel from '../components/Panel';

test('renders visible panel', () => {
  render(<Panel>foo</Panel>);
  const linkElement = screen.getByText(/foo/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders visible panel explicit', () => {
  render(<Panel visible>foo</Panel>);
  const linkElement = screen.getByText(/foo/i);
  expect(linkElement).toBeInTheDocument();
});

test('doesnt render invisible panel', () => {
  render(<Panel visible={false}>bar</Panel>);
  const linkElement = screen.queryByText(/bar/i);
  expect(linkElement).toBeNull();
});
