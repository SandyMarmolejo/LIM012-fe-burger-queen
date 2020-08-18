import React from 'react';
import { render, screen } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import Product from '../components/Product';

const product = {
  Menu: [
    {
      id: 'b1',
      name: 'Café americano',
      price: 5,
      count: 1,
      type: 'breakfast',
      subType: '',
      image: 'coffee.jpg',
    },
    {
      id: 'b4',
      name: 'Jugo de fruta natural',
      price: 7,
      count: 1,
      type: 'breakfast',
      subType: '',
      image: 'juice.jpg',
    },
  ],
};

fetchMock.get('../menuList.json', { product });

describe('Product', () => {
  test('Debería mostrarse el nombre del producto en el documento', () => {
    render(<Product />);

    expect(screen.getByText('Café americano')).toBeInTheDocument();
    expect(screen.getByText('Jugo de fruta natural')).toBeInTheDocument();
  });
});
