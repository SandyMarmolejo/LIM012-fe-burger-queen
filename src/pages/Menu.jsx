import React from 'react';
import Product from '../components/Product';
import NavBar from '../components/NavBar';

function Menu() {
  return (

    <div>
      <NavBar title="ORDEN DE PEDIDO" />
      <Product />
    </div>
  );
}

export default Menu;
