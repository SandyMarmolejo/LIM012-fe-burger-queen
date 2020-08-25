/* eslint-disable max-len */
import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
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

// Para peticiones y consultas se mockea, cuando usamos fetch, axios, ajax
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(product),
}));

// Por cada peticion limpiar, para que en el navegador se muestren todo los productos y no solo los 2 del test
beforeEach(() => {
  fetch.mockClear();
});

describe('Product', () => {
  test('Debería mostrarse el nombre del producto en el documento', () => {
    render(<Product />);
    waitForElement(() => screen.queryAllBy('breakfast-item')).then((listNode) => {
      expect(listNode.children).toHaveLength(2);
    });
  });
});
