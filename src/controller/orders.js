/* eslint-disable no-console */
import firebase from '../firebase/firebase';

const addOrder = (newOrder) => firebase.firestore().collection('pedidos').add(newOrder);

const getOrder = (callback) => firebase.firestore().collection('pedidos')
  .orderBy('hourSend', 'desc')
  .onSnapshot({ includeMetadataChanges: true }, ((snap) => {
    const gettingOrders = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(gettingOrders);
  }));

export { addOrder, getOrder };
