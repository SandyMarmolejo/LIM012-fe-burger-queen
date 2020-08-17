import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from '../components/Product';

describe('Product', () => {
  test('Debería encontrar "DESAYUNO" en el componente', () => {
    render(<Product />);
    expect(screen.getByText('DESAYUNO')).toBeInTheDocument();
  });

  test('Debería encontrar "ALMUERZO/CENA" en el componente', () => {
    render(<Product />);
    expect(screen.getByText('ALMUERZO/CENA')).toBeInTheDocument();
  });
});
