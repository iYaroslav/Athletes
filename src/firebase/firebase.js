import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyCOKFOMsbEXBt6FZ0ptEsGp0uFtRiast_Q',
  authDomain: 'judoists-uz.firebaseapp.com',
  databaseURL: 'https://judoists-uz.firebaseio.com',
  projectId: 'judoists-uz',
  storageBucket: 'judoists-uz.appspot.com',
  messagingSenderId: '239370700682',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()
const auth = firebase.auth()

export { auth, db }
