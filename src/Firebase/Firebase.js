import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: 'todos-auth.firebaseapp.com',
  databaseURL: 'https://todos-auth.firebaseio.com',
  projectId: 'todos-auth',
  storageBucket: 'todos-auth.appspot.com',
  messagingSenderId: '843182406370',
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
