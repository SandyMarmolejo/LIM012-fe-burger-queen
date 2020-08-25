import React from 'react';
import DeliverWaiter from '../components/DeliverWaiter';
import NavBar from '../components/NavBar';

function Deliver() {
  return (
    <div>
      <NavBar title="PEDIDOS POR ENTREGAR" />
      <DeliverWaiter />
    </div>
  );
}

export default Deliver;
