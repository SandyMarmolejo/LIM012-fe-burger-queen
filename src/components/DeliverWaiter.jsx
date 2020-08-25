/* eslint-disable max-len */
import React from 'react';
import swal from 'sweetalert';
import firebase from '../firebase/firebase';
import deliverOrder from '../controller/ordersWaiter';

function DeliverWaiter() {
  const [orders, getOrders] = React.useState([]);

  React.useEffect(() => {
    const confirmedOrders = firebase.firestore().collection('pedidos');
    confirmedOrders
      .where('status', '==', 'ready')
      .onSnapshot({ includeMetadataChanges: true }, ((snap) => {
        const gettingOrders = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        getOrders(gettingOrders);
      }));
  }, []);

  const handleDeliverOrder = async (completed) => {
    swal({
      title: '¿Estas seguro que quieres eliminarlo?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Pedido eliminado con exito!', {
            icon: 'success',
          });
          deliverOrder(completed);
        } else {
          swal('Continue');
        }
      });
  };

  return (
    <>
      <div className="container-deliver">
        <div className="deliver-detail">
          <section className="">
            <div className="deliver-table">
              <table>
                <thead>
                  <tr>
                    <th>N° MESA</th>
                    <th>CLIENTE</th>
                    <th>PEDIDO</th>
                    <th>ENTREGADO</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i}>
                      <td>{order.numberTable}</td>
                      <td>{order.client}</td>
                      <td>
                        <ul>
                          {order.products.map((product, j) => (
                            <li key={j}>
                              {product.countProduct}
                              {product.nameProduct}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td><button onClick={() => handleDeliverOrder(order.id)}>Entregado</button></td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default DeliverWaiter;
