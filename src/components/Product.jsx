/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import Summary from './Summary';

function Product() {
  const [data, setData] = useState([0]);
  const [summary, setSummary] = useState([]);
  const [type, setType] = useState('breakfast');
  const [subType, setSubType] = useState('');

  // Lee los datos alojados en menuList.json
  useEffect(() => {
    fetch('../menuList.json')
      .then((response) => {
        try {
          return response.json();
        } catch (e) {
          return Promise.reject(new Error('No se encontró los productos'));
        }
      })
      .then((datos) => {
        setData(datos.Menu);
      })
      .catch(() => new Error('No se encontró el archivo'));
  });

  const selecType = (typee, subTypee) => {
    setType(typee);
    setSubType(subTypee);
  };

  const addProducto = (item) => {
    const idProduct = item.id;
    const nameProduct = item.name;
    const priceProduct = parseInt(item.price, 10);
    const countProduct = item.count;

    const findProduct = summary.find((s) => s.idProduct === idProduct);

    if (findProduct == null) {
      summary.push({
        idProduct, nameProduct, priceProduct, countProduct,
      });
    } else {
      findProduct.countProduct += 1;
    }

    setSummary([
      ...summary,
    ]);
  };

  return (
    <>
      <div className="order-btns">
        <button className="btns-menu" onClick={() => selecType('breakfast', '')}>DESAYUNO</button>
        <button className="btns-menu" onClick={() => selecType('lunch', 'burger')}>ALMUERZO/CENA</button>

        {type === 'lunch'
          ? (
            <div className="sub-order-btns">
              <div>
                <button className="btns-bonus" onClick={() => selecType('lunch', 'burger')}>HAMBURGUESAS</button>
              </div>
              <div>
                <button className="btns-bonus" onClick={() => selecType('lunch', 'accompaniments')}>ACOMPAÑAMIENTOS</button>
              </div>
              <div>
                <button className="btns-bonus" onClick={() => selecType('lunch', 'drinks')}>BEBIDAS</button>
              </div>
              <div>
                <button className="btns-bonus" onClick={() => selecType('lunch', 'additional')}>ADICIONALES</button>
              </div>
            </div>
          )
          : ''}

      </div>
      <div className="container-menu">
        <div className="breakfast-menu">
          {data.filter((item) => item.type === type && item.subType === subType).map((item) => (
            <div className="breakfast-item" key={item.id}>
              <figure><img className="breakfast-product" src={`${process.env.PUBLIC_URL}/imagesProduct/${item.image}`} alt="imagen" /></figure>
              {item.name}
              <p>
                S./
                {item.price}
              </p>
              <button
                onClick={() => addProducto(item)}
                value={item.price}
                name={item.name}
                id={item.id}
                type="button"
                className="btn-add"
                key={item.id}
              >
                AGREGAR
              </button>
            </div>
          ))}
        </div>
        <Summary summary={summary} />
      </div>
    </>
  );
}
export default Product;
