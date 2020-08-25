import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import { getOrder } from '../controller/orders';
import firebase from '../firebase/firebase';
import deleteOrder from '../controller/ordersChef';

function OrdersChef() {
  const [orders, getOrders] = React.useState([]);

  React.useEffect(() => {
    getOrder((elements) => {
      getOrders(elements);
    });
  }, []);

  const completeOrder = (orderId) => {
    firebase.firestore().collection('pedidos').doc(orderId).update({
      status: 'ready',
      hourEnd: new Date().getTime(),
      timeToCook: new Date().getTime() - orders.find((o) => o.id === orderId).hourSend,
    });
  };

  const handleDeleteOrder = (removeOrder) => {
    swal({
      title: '¿Estas seguro que quieres eliminar este pedido?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Pedido eliminado con exito!', {
            icon: 'success',
          });
          deleteOrder(removeOrder);
        } else {
          swal('Continue');
        }
      });
  };

  return (
    <>
      <div className="container-kitchen">
        <div className="kitchen-detail">
          <section className="">
            <div className="kitchen-table">
              <table>
                <thead>
                  <tr>
                    <th>N° MESA</th>
                    <th>CLIENTE</th>
                    <th>HORA PEDIDO</th>
                    <th>PEDIDO</th>
                    <th>HORA TERMINO</th>
                    <th>TIEMPO PREPARACION (min)</th>
                    <th>ESTADO</th>
                    <th>CANCELAR</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.numberTable}</td>
                      <td>{order.client}</td>
                      <td>{moment(order.hourSend).format('LT')}</td>
                      <td>
                        <ul>
                          {order.products.map((product) => (
                            <li key={product.idProduct}>
                              {product.countProduct}
                              {product.nameProduct}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{order.hourEnd != null ? moment(order.hourEnd).format('LT') : ''}</td>
                      <td>{order.timeToCook !== '' ? moment(order.timeToCook).format('m') : ''}</td>
                      <td>{order.status === 'pending' ? <button onClick={() => completeOrder(order.id)}>Listo</button> : ''}</td>
                      <td>{order.status === 'pending' ? <button onClick={() => handleDeleteOrder(order.id)}>Cancelar</button> : ''}</td>
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

export default OrdersChef;
