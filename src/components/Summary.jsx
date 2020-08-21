/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';
import { addOrder } from '../controller/orders';
import Clock from './Clock';
import iconMore from '../images/icon_more.png';
import iconLess from '../images/icon_less.png';
import iconDelete from '../images/icon_delete.png';

function Summary(props) {
  const [name, setName] = React.useState('');
  const [table, setTable] = React.useState('');
  const [, setResult] = React.useState(props.summary);

  const nameClient = (e) => {
    setName(e.target.value);
  };

  const numberTable = (e) => {
    setTable(e.target.value);
  };

  const btnMore = (item) => {
    const array = props.summary;
    const itemSelected = array.find((element) => element.idProduct === item.idProduct);

    itemSelected.countProduct += 1;
    setResult({ ...array, countProduct: itemSelected.countProduct });
  };

  const btnLess = (item) => {
    const array = props.summary;
    const itemSelected = array.find((element) => element.idProduct === item.idProduct);

    if (itemSelected.countProduct > 1) {
      itemSelected.countProduct -= 1;
    }
    setResult({ ...array, countProduct: itemSelected.countProduct });
  };

  const deleteItem = (e) => {
    const position = e.target.id;
    const array = props.summary.splice(position, 1);
    setResult(...array);
  };

  const initial = () => {
    setName('');
    setTable('');
    const arry = props.summary.length;
    const array = props.summary.splice(0, arry);
    setResult(...array);
  };

  // Enviando el pedido a Firebase
  const handleAddOrder = () => {
    if (!name.trim() || !table.trim()) {
      console.log('Campo(s) vacio(s). Verifique');
    } else {
      const newOrder = {
        products: props.summary,
        client: name,
        numberTable: table,
        status: 'pending',
        hourSend: new Date().getTime(),
        hourEnd: null,
        timeToCook: '',
      };
      addOrder(newOrder);
      initial();
    }
  };

  const btnCancel = () => {
    initial();
  };

  return (
    <div className="">
      <div className="breakfast-ticket">

        <div className="ticket-header">
          <div className="">
            <p>
              Ciente :
              <input type="text" onChange={nameClient} placeholder="Nombre de cliente" value={name} className="validaty input-client" pattern="([a-zA-ZÁÉÍÓÚñáéíóúÑ]{1,30}\\s*)+" />
            </p>
          </div>
          <div className="">
            <p>
              Hora de atención:
              <Clock />
            </p>
            <p>
              Número de Mesa :
              <input type="text" onChange={numberTable} placeholder="N° mesa" value={table} className="validaty input-table" pattern="" />
            </p>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" />
                <th scope="col">Cant.</th>
                <th scope="col">Producto</th>
                <th scope="col">P/U</th>
                <th scope="col">Total</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                props.summary.map((item, i) => (
                  <tr key={item.idProduct} id={item.idProduct}>
                    <th scope="col"><button className="no-style" onClick={() => btnMore(item)}><img src={iconMore} alt="" /></button></th>
                    <th scope="col"><button className="no-style" onClick={() => btnLess(item)}><img src={iconLess} alt="" /></button></th>
                    <th scope="col"><p className="">{item.countProduct}</p></th>
                    <th scope="col">{item.nameProduct}</th>
                    <th scope="col">
                      S/
                      {item.priceProduct}
                    </th>
                    <th scope="col">
                      S/
                      {item.priceProduct * item.countProduct}
                    </th>
                    <th scope="col"><button className="no-style" id={i} onClick={deleteItem}><img src={iconDelete} alt="" /></button></th>
                  </tr>
                ))
              }
              <tr>
                <th colSpan={7}>
                  <p>
                    Total: S/
                    {props.summary.reduce((acum, item) => acum + item.priceProduct * item.countProduct, 0)}
                  </p>
                </th>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div className="menu-btns-active">
        <button id="confirm" onClick={handleAddOrder}>CONFIRMAR</button>
        <button id="cancel" onClick={btnCancel}>CANCELAR</button>
      </div>
    </div>
  );
}

export default Summary;
