import MockFirebase from 'mock-cloud-firestore';
import { addOrder, getOrder } from '../controller/orders';

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
