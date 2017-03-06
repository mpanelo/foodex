
firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log('auth state changed');
    if (firebaseUser) {


    	console.log('I am a firebase user :)');
    	var user = firebase.auth().currentUser;
		var name, email, photoUrl, uid, emailVerified;

		if (user != null) {
		  name = user.displayName;
		  email = user.email;
		  photoUrl = user.photoURL;
		  emailVerified = user.emailVerified;
		  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
		                   // this value to authenticate with your backend server, if
		                   // you have one. Use User.getToken() instead.
		  //console.log(email);
		  //console.log(uid);



		}
		if (window.location.pathname == '/hw4/templates/login.html' ||
		    window.location.pathname == '/hw4/templates/signUp.html') {
		    console.log("logging in as", firebaseUser.email);
		    window.location = 'main.html';
		}
    } else {
		if (window.location.pathname != '/hw4/templates/login.html' &&
		    window.location.pathname != '/hw4/templates/signUp.html') {
		    console.log("not logged in");
		    window.location = 'login.html';
		}

    }

});

firebase.auth().onAuthStateChanged(function(user) {
  var name, email, photoUrl, uid, emailVerified;
  if (user) {
    // User is signed in.
    var name, email, photoUrl, uid, emailVerified;
    name = user.displayName;
	email = user.email;
	photoUrl = user.photoURL;
	emailVerified = user.emailVerified;
	uid = user.uid;
  } else {
    // No user is signed in.
    console.log('FML');
  }
  console.log('UID: ');
  console.log(uid);
  console.log('Email: ');
  console.log(email);
});