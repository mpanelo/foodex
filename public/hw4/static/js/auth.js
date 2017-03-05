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


const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    firebase.auth().signOut();
    //window.location('../../templates/login.html');
}


// fires when user logs in or out
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
	console.log(firebaseUser);
	window.location = '../../templates/main.html';
    } else {
	console.log("not logged in");
    }

});
