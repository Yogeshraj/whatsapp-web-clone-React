import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB3L5nzfQLPpl5P-70kguAjsQ0f3pt5nBQ",
    authDomain: "whatsapp-356c9.firebaseapp.com",
    databaseURL: "https://whatsapp-356c9.firebaseio.com",
    projectId: "whatsapp-356c9",
    storageBucket: "whatsapp-356c9.appspot.com",
    messagingSenderId: "841119027363",
    appId: "1:841119027363:web:36900b8ac54eff060aaf16",
    measurementId: "G-WKXW1JK377"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;