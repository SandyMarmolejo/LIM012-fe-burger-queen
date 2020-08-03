import React from 'react';
import firebase from '../firebase/firebase';
import './styleComponents/Summary.scss';
import iconMore from '../images/icon_more.png';
import iconLess from '../images/icon_less.png';
import iconDelete from '../images/icon_delete.png';

const Summary = (props) => {
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

  // Enviando el pedido a Firebase
  const addOrder = async (e) => {
    try {
      const newOrder = {
        order: props.summary,
        client: name,
        numMesa: table,
        status: 'pending',
        hourSend: new Date().getTime(),
      };
      firebase.firestore().collection('pedidoss').add(newOrder);
      setName('');
      setTable('');
    } catch (error) {
      console.log(error);
    }
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
              {/* {clock} */}
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
                    <tr key={i} id={item.idProduct}>
                      <th scope="col"><img src={iconMore} onClick={(e) => btnMore(item)} alt="" /></th>
                      <th scope="col"><img src={iconLess} onClick={(e) => btnLess(item)} alt="" /></th>
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
                      <th scope="col"><img src={iconDelete} id={i} onClick={deleteItem} alt="" /></th>
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
        <button className="btn-accept" onClick={addOrder}>CONFIRMAR</button>
        <button className="btn-cancel">CANCELAR</button>
      </div>

    </div>
  );
};

export default Summary;