import React from 'react';
import NavBar from '../components/NavBar';
import OrdersChef from '../components/OrdersChef';

function Kitchen() {
  return (
    <div>
      <NavBar title="COCINA" />
      <OrdersChef />
    </div>
  );
}

export default Kitchen;
