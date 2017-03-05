// Initialize Firebase
var config = {
    apiKey: "AIzaSyAPnQcQGlvVwpBLkKk49gjnw6EPuur7Pls",
    authDomain: "foodex-d5655.firebaseapp.com",
    databaseURL: "https://foodex-d5655.firebaseio.com",
    storageBucket: "foodex-d5655.appspot.com",
    messagingSenderId: "774577145729"
};

var app = firebase.initializeApp(config);
var db = app.database();
