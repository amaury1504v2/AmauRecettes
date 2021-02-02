import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBlVMwKTjCGeER4JWRr9snXNN22pSS06rs",
  authDomain: "amaurecettes.firebaseapp.com",
  databaseURL: "https://amaurecettes-default-rtdb.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
