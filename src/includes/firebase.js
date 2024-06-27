import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB62EqD0x5qhKJLz9JaEXeI9QuzjGrd_Xc',
  authDomain: 'melodify-8bb34.firebaseapp.com',
  projectId: 'melodify-8bb34',
  storageBucket: 'melodify-8bb34.appspot.com',
  //   messagingSenderId: '219273023498',
  appId: '1:219273023498:web:4443bf1ccf42b40117cff3'
}

export default firebase.initializeApp(firebaseConfig)
