import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB62EqD0x5qhKJLz9JaEXeI9QuzjGrd_Xc',
  authDomain: 'melodify-8bb34.firebaseapp.com',
  projectId: 'melodify-8bb34',
  storageBucket: 'melodify-8bb34.appspot.com',
  //   messagingSenderId: '219273023498',
  appId: '1:219273023498:web:4443bf1ccf42b40117cff3'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export { auth, db, storage, songsCollection, usersCollection };
