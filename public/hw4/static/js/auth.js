const auth = firebase.auth();


const btnSignup = document.getElementById('btnSignup');

if (btnSignup != null) {
    const signupUsername = document.getElementById('signupUsername');
    const signupEmail = document.getElementById('signupEmail');
    const signupPass = document.getElementById('singupPassword');
    const signupPass2 = document.getElementById('singupPasswordRetype');

    btnSignup.addEventListener('click', e => {
	const email = signupEmail.value;
	const username = singupUsername.value;
	const pass = signupPass.value;
	const pass2 = signupPass2.value;
	
	// create user and log them in
	if (pass == pass2) {
	    const promise = auth.createUserWithEmailAndPassword(email, pass);
	    promise.catch(e => console.log(e.message));
	}
    });
}

const btnLogin = document.getElementById('btnLogin');

if (btnLogin != null) {
    const loginUsername = document.getElementById('loginUsername');
    const loginEmail = document.getElementById('loginEmail');
    const loginPass = document.getElementById('loginPassword');

    btnSignup.addEventListener('click', e => {
	const email = loginEmail.value;
	const pass = loginPass.value;
	
	// log in an existing user
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
    });
}

// fires when user logs in or out
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser)
	console.log(firebaseUser);
    else
	console.log("not logged in");

});
