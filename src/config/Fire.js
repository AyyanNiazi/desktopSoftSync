import firebase from 'firebase';
import Rebase from 're-base'



  var config = {
    apiKey: "AIzaSyBOlXsZTIm-B6SC3DlffqxOdz_iAMHf6ew",
    authDomain: "softsyncdev-1409c.firebaseapp.com",
    databaseURL: "https://softsyncdev-1409c.firebaseio.com",
    projectId: "softsyncdev-1409c",
    storageBucket: "softsyncdev-1409c.appspot.com",
    messagingSenderId: "1070985270568"
  };

  const Firebase =  firebase.initializeApp(config);

const base = Rebase.createClass(Firebase.database())



export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage();
const app = Firebase; 
export {base}
export {app}
export default Firebase;







//                  name="password" type="email" ref={(input) => {this.emailPassword = passsword}}

//  <input
                 
//                  className="btn btn-primary"
//                   type="submit" value="Log In"
//                   />       
//       // 