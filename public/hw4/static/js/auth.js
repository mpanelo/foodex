// Signup with email
const btnSignup = document.getElementById('btnSignup');
if (btnSignup != null) {
    const signupUsername = document.getElementById('signupUsername');
    const signupEmail = document.getElementById('signupEmail');
    const signupPass = document.getElementById('signupPassword');
    const signupPass2 = document.getElementById('signupPasswordRetype');

     btnSignup.addEventListener('click', e => {
	const email = signupEmail.value;
	const username = signupUsername.value;
	const pass = signupPass.value;
	const pass2 = signupPass2.value;
	
	// create user and log them in
	 if (pass == pass2) {
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
	const email = loginEmail.value;
	const pass = loginPass.value;
	
	// log in an existing user
	const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
    });
}

// Login with Google credentials
const btnGoogleAuth = document.getElementById('btnGoogleAuth');
if (btnGoogleAuth) {
    btnGoogleAuth.addEventListener('click', e=> {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	    var token = result.credential.accessToken;
	    // The signed-in user info.
	    var user = result.user;
	    console.log(user);

	}).catch(function(error) {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    var email = error.email;
	    var credential = error.credential;
	    console.log(errorCode, errorMessage);
	    console.log(email, credential);
	});

    });
}


// Logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', e => {
	console.log("logging out");
	firebase.auth().signOut();
	window.location = 'login.html';
    });
}

// fires when user logs in or out
firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log('auth state changed');
    if (firebaseUser) {
		if (window.location.pathname != '/hw4/templates/main.html') {
	    	console.log("logging in");
	    	console.log(firebaseUser);
	    	window.location = 'main.html';
		}
    } else {
	console.log("not logged in");
    }

});
