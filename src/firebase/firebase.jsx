import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAE412yU8dJcA_SkVAYWKimKJ4jfdne9RQ',
  authDomain: 'burger-queen-65e7d.firebaseapp.com',
  databaseURL: 'https://burger-queen-65e7d.firebaseio.com',
  projectId: 'burger-queen-65e7d',
  storageBucket: 'burger-queen-65e7d.appspot.com',
  messagingSenderId: '617105145450',
  appId: '1:617105145450:web:db8a3b7b08722cf9701413',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
