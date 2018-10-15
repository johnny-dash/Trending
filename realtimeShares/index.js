const firebase = require('firebase');
const email = 'maodi101@gmail.com';
const password = '15150999623maodi'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBd89rWBDMUXHbuSf0bbhnbzhu5wtowKHk",
    authDomain: "sentiment-1538463118397.firebaseapp.com",
    databaseURL: "https://sentiment-1538463118397.firebaseio.com",
    projectId: "sentiment-1538463118397",
    storageBucket: "sentiment-1538463118397.appspot.com",
    messagingSenderId: "104689841333"
  };



const db =  firebase.initializeApp(config);

db.database().ref('/databases/securities').set({
    test: '1234'
}).catch(error => {
    console.log(error);
});



