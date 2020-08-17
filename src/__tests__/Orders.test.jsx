import MockFirebase from 'mock-cloud-firestore';
import { addOrder, getOrder } from '../controller/orders';

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Product from '../components/Product';

// test('renders the correct content', async () => {
//   render(<Product />);
//   const bntAdd = await screen.findByRole('button');

//   expect(bntAdd.textContent).toBe('Agregar');
// });

const fixtureData = {
  __collection__: {
    pedidos: {
      __doc__: {
        Order001: {
          products: '',
          client: 'Cliente Uno',
          numberTable: '1',
          status: 'pending',
          hourSend: '',
          hourEnd: '',
          timeToCook: '',
          // client: 'Cliente Uno',
          // numberTable: '1',
          // status: 'ready',
          // timeToCook: '',
          // hourEnd: '',
          // hourSend: '',
          // products: {
          //   idProduct: 'b1',
          //   nameProduct: 'Café americano',
          //   priceProduct: '5',
          //   countProduct: '1',
        },
      },
    },
  },
};

const listOrder = {
  products: '',
  client: 'Cliente Dos',
  numberTable: '',
  status: 'pending',
  hourSend: '',
  hourEnd: '',
  timeToCook: '',
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe.only('addOrder', () => {
  it('Deberia de poder agregar una orden', (done) => addOrder(listOrder)
    .then(() => {
      const callback = (order) => { // order => gettingOrder
        const result = order.find((element) => element.client === 'Cliente Dos');
        expect(result.client).toBe('Cliente Dos');
        done();
      };
      getOrder(callback);
      // console.log(callback);
    }));
});

// it('works with async/await', async () => {
//   expect.assertions(1);
//   const data = await user.getUserName(4);
//   expect(data).toEqual('Mark');
// });
