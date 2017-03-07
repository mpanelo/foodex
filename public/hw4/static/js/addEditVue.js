function validateData(data) {
  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (!data[prop]) return false;
    }
  }
  return true;
}

function getDefaultData() {
  return {
    title: "",
    description: "",
    hours: "",
    minutes: "",
    ingredients: "",
    instructions: "",
    difficulty: "",
    visibility: "",
    fileName: "",
  };
}

function init() {
    var selectedFile = "";
    var vm = new Vue({
        el: "#addEditApp",
        data: getDefaultData(),
        firebase: {
            recipes: ref
        },
        methods: {
            setImageFile: function (event) {
              selectedFile = event.target.files[0];
              this.fileName = selectedFile.name;
            },
            submitRecipeForm: function () {
              if (this.fileName && selectedFile && validateData(this.data)) {
                var currImageRef = imageRef.child(this.fileName);
                var uploadTask = currImageRef.put(selectedFile);
                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                var that = this;
                uploadTask.on('state_changed', function(snapshot) {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                      console.log('Upload is paused');
                      break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                      console.log('Upload is running');
                      break;
                  }
                }, function(error) {
                  // Handle unsuccessful uploads
                }, function() {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                   var downloadURL = uploadTask.snapshot.downloadURL;
                   var listOfIng = that.ingredients.split("\n");
                   var listOfInstr = that.instructions.split("\n");



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
                	  console.log('checkpoint 4');
                	  console.log(uid);
                	  console.log(email);

                    var recipeKey = ref.push({
                     "title": that.title,
                     "description": that.description,
                     "ingredients": listOfIng,
                     "instructions": listOfInstr,
                     "difficulty": that.difficulty,
                     "visibility": that.visibility,
                     "timeEstimate": that.hours + " hrs, " + that.minutes + " mins",
                     "imageName": that.fileName,
                     "imageUrl": downloadURL,
                     "uid": uid
                   }).key;

                   var updates = {};
                   updates["users/" + uid + "/recipes"] = recipeKey;
                   firebase.database().ref().update(updates);
                	  console.log('checkpoint 5');
                    window.location.href = "main.html";
                	});






                });
              }
            }
        }
    });
}

Vue.use(VueFire);

var ref = db.ref("recipes");
var userRef = db.ref("users");
var imageRef = storage.ref("images");
window.addEventListener("load", init);
