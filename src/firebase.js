import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDh969ceo2AIIxAGiClep9ryUC6vBTBaKM",
    authDomain: "falsecrypts.firebaseapp.com",
    databaseURL: "https://falsecrypts.firebaseio.com",
    projectId: "falsecrypts",
    storageBucket: "falsecrypts.appspot.com",
    messagingSenderId: "738799336722"
};

firebase.initializeApp(config);
export default firebase;