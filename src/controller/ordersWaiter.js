/* eslint-disable no-console */
import firebase from '../firebase/firebase';

const deliverOrder = async (id) => {
  try {
    await firebase.firestore().collection('pedidos').doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

export default deliverOrder;
