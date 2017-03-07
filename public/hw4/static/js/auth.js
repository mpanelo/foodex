function saveUser(){
	var userRef = firebase.database().ref("users");
	console.log('checkpoint 1');
	firebase.auth().onAuthStateChanged(function(user) {
	  console.log('checkpoint 2');	
	  var email, uid;
	  if (user) {
	    // User is signed in.
	    console.log('checkpoint 3');
		email = user.email;
		uid = user.uid;
	  } else {
	    // No user is signed in.
	    console.log('FML');
	  }
	  var recipes = {};
	  console.log('checkpoint 4');
	  console.log(uid);
	  console.log(email);
	  var child = userRef.child(uid);
	  child.set({
          "uid": uid,
          "email" : email,
          "recipes": recipes
      });
	  console.log('checkpoint 5');
	});
}
/*
var userRef = firebase.database().ref();
function check(){
	userRef.on('value', function(snapshot){
		console.log('wtf');
		firebase.auth().onAuthStateChanged(function(user){
			console.log('im broken');
			var person = snapshot.val()['users'];
			var uid;
			if(user){
				// User is signed in.
				uid = user.uid;
				console.log(person);
				console.log(person[uid]);
				if(person[uid] == null){
					console.log('--inside check--');
					return true;

				}
			} else {
				// No user is signed in.
				console.log('FML');
			}
			return false;
		});
	}, function(error){
		console.log('Error: ' + error.code);
	});
}
*/
window.onload = function() {

    // Signup with email
    const btnSignup = document.getElementById('btnSignup');
    if (btnSignup != null) {
	  const signupUsername = document.getElementById('signupUsername');
	  const signupEmail = document.getElementById('signupEmail');
	  const signupPass = document.getElementById('signupPassword');
	  const signupPass2 = document.getElementById('signupPasswordRetype');

	  btnSignup.addEventListener('click', e => {
	    console.log('signUp clicked');
	    const email = signupEmail.value;
	    const username = signupUsername.value;
	    const pass = signupPass.value;
	    const pass2 = signupPass2.value;

	    // create user and log them in
	    if (pass === pass2 && email !== "" && username !== "") {
			const auth = firebase.auth();
			const promise = auth.createUserWithEmailAndPassword(email, pass);
			promise.catch(e => console.log(e.code, e.message));
	    }
	  });
    }


    // Login with email
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin != null) {
	const loginEmail = document.getElementById('loginEmail');
	const loginPass = document.getElementById('loginPassword');

	btnLogin.addEventListener('click', e => {
	    console.log('login clicked');
	    const email = loginEmail.value;
	    const pass = loginPass.value;

	    // log in an existing user
	    const auth = firebase.auth();
	    const promise = auth.signInWithEmailAndPassword(email, pass);
	    promise.catch(error => {
		console.log(error.message);
		alert(error.message);
	    });
	});
    }


    // Login with Google credentials
    const btnGoogleAuth = document.getElementById('btnGoogleAuth');
    if (btnGoogleAuth) {
	var provider = new firebase.auth.GoogleAuthProvider();
	btnGoogleAuth.addEventListener('click', e => {
	    console.log('google login clicked');
	    firebase.auth().signInWithRedirect(provider)
		.then(function() {
		    firebase.auth().getRedirectResult().then(function (result) {
			if (!user) {
			    // User not logged in, start login.
			    //firebase.auth().signInWithRedirect(provider);
			    console.log('google: not logged in');
			} else {
			    console.log('google:', user);
			}
		    }).catch(function (error) {
			console.log('google error caught:', error.code, error.message);
			alert(error.message);
		    });

		});
	});
    }


    // Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
	btnLogout.addEventListener('click', e => {
	    console.log("logout clicked, logging out");
	    firebase.auth().signOut();
	    window.location = 'login.html';
	});
    }


};

 // fires when user logs in or out
firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log('auth state changed');
    if (firebaseUser) {
	if (window.location.pathname == '/hw4/templates/login.html'){
		console.log("logging in as", firebaseUser.uid);
		/*
		console.log("omg");
		if(check()){
			console.log('GOOOOOOOOOOOOGGGGGGLLLLLLLEEEEEEEEEE')
			saveUser();
		}
		*/
	    window.location = 'main.html';
	}
	else if (window.location.pathname == '/hw4/templates/signUp.html'){
		saveUser();
	    console.log("logging in as", firebaseUser.uid);
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

