import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from '../App';
import Product from '../components/Product';

test('renders the correct content', async () => {
  render(<Product />);
  const bntAdd = await screen.findByRole('button');

  expect(bntAdd.textContent).toBe('Agregar');
});
