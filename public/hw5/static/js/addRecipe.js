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
    var resized = "";
    var smallURL = "";
    var vm = new Vue({
        el: "#addApp",

        beforeCreate: function () {
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              this.user = user;
            } else {
              window.location.href = "login.html";
            }
          }.bind(this));
        },

        data: getDefaultData(),
        firebase: {
            recipes: recipesRef
        },

        methods: {
            readFile: function (event) {
              selectedFile = event.target.files[0];
              this.fileName = selectedFile.name;
              var MAX_WIDTH = 400;
              var MAX_HEIGHT = 1000;
              var reader = new FileReader();
              reader.readAsArrayBuffer(selectedFile);

              reader.onload = function (event) {
                var blob = new Blob([event.target.result]);
                window.URL = window.URL || window.webskitURL;
                var blobURL = window.URL.createObjectURL(blob);

                var img = new Image();
                img.src = blobURL;

                img.onload = function () {
                  var canvas = document.createElement('canvas');
                  var width = img.width;
                  var height = img.height;

                  if (width > height) {
                    if (width > MAX_WIDTH) {
                      height = Math.round(height *= MAX_WIDTH / width);
                      width = MAX_WIDTH;
                    }
                  } else {
                    if (height > MAX_HEIGHT) {
                      width = Math.round(width *= MAX_HEIGHT / height);
                      height = MAX_HEIGHT;
                    }
                  }

                  canvas.width = width;
                  canvas.height = height;
                  var ctx = canvas.getContext('2d');
                  ctx.drawImage(img,0,0,width,height);

                  canvas.toBlob(function(blob) {
                    imageRef.child("small_" + selectedFile.name).put(blob);
                  });
                  imageRef.child("small_" + selectedFile.name).getDownloadURL().then(function(url) {
                    console.log("url = " + url);

                  }).catch(function(error) {
                  });
                };
              };
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
                  listOfIng = listOfIng.filter(function(n) {
                    return n.length > 0;
                  });
                  listOfInstr = listOfInstr.filter(function(n) {
                    return n.length > 0;
                  });
                	console.log('checkpoint 2');
                	console.log(that.user.uid);
                  var recipeKey = recipesRef.push({
                   "title": that.title,
                   "description": that.description,
                   "ingredients": listOfIng,
                   "rawIngredients": that.ingredients,
                   "instructions": listOfInstr,
                   "rawInstructions": that.instructions,
                   "difficulty": that.difficulty,
                   "visibility": that.visibility,
                   "timeEstimate": that.hours + " hrs, " + that.minutes + " mins",
                   "hours": that.hours,
                   "minutes": that.minutes,
                   "imageName": that.fileName,
                   "imageUrl": downloadURL,
                   "uid": that.user.uid
                 });

                  window.location.href = "main.html";
                });
              }
            }
        }
    });
}

Vue.use(VueFire);

var recipesRef = db.ref("recipes");
var imageRef = storage.ref("images");
window.addEventListener("load", init);
