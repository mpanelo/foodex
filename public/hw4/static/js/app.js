function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAPnQcQGlvVwpBLkKk49gjnw6EPuur7Pls",
    authDomain: "foodex-d5655.firebaseapp.com",
    databaseURL: "https://foodex-d5655.firebaseio.com",
    storageBucket: "foodex-d5655.appspot.com",
    messagingSenderId: "774577145729"
};

var app = firebase.initializeApp(config);
var storage = firebase.storage();
var db = app.database();
