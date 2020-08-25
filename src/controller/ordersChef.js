/* eslint-disable no-console */
import firebase from '../firebase/firebase';

const deleteOrder = async (id) => {
  try {
    await firebase.firestore().collection('pedidos').doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

export default deleteOrder;
