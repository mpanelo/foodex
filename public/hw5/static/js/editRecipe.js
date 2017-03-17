function getDefaultData() {
  return {
		title: "",
    description: "",
    hours: "",
    minutes: "",
    ingredients: "",
    instructions: "",
		rawIngredients: "",
		rawInstructions: "",
    difficulty: "",
    visibility: "",
		iName: ""
  };
}

Vue.use(VueFire);
var editRef = db.ref("recipes/" + readCookie("recipeToEdit"));
var imageRef = storage.ref("images");

window.addEventListener("load", function () {
	var selectedFile = "";
	var vm = new Vue({
		el: "#editApp",
    data: {
			recipe: {},
			iName: ""
		},
		beforeCreate: function () {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          this.$bindAsArray("recipe", editRef);
        } else {
          window.location.href = "login.html";
        }
      }.bind(this));
    },
		firebase: {
			recipe: {
				source: editRef,
				asObject: true,
				cancelCallback: function () {}
			}
		},
    methods: {
			validateData: function() {
					for (var prop in this.$data["recipe"]) {
    				if (this.$data["recipe"].hasOwnProperty(prop))  {
      				if (!this.$data['recipe'][prop]) return false;
    				}
  				}
  				return true;
			},
      updateRecipe: function (event) {
				this.$data.recipe[event.target.name] = event.target.value;
				/*
        var prop = event.target.name;
        var newText = event.target.value;
        editRef.child(prop).set(newText);
				*/
      },
      updateRadio: function (event) {
				this.$data.recipe[event.target.name] = event.target.value;
				/*
        var prop = event.target.name || event.srcElement.name;
        var newValue = event.target.value || event.srcElement.name;
        editRef.child(prop).set(newValue);
				*/
      },
      updateAsArray: function (event) {
        var prop = event.target.name;
        var rawProp = "raw" + event.target.name.charAt(0).toUpperCase() + event.target.name.substring(1);
        var asArray = event.target.value.split('\n');
        asArray = asArray.filter(function(n) {
          return n.length > 0;
        });

				this.$data.recipe[prop] = asArray;
				this.$data.recipe[rawProp] = event.target.value;
				/*
        editRef.child(rawProp).set(event.target.value);
        editRef.child(prop).set(asArray);
				*/
      },
			updateRecipeForm: function () {
				if (this.validateData()) {
				  var keys = Object.keys(this.$data.recipe);
					var values = Object.values(this.$data.recipe);

					var hrs = this.$data.recipe.hours;
					var mins = this.$data.recipe.minutes;

					if (selectedFile) {
						console.log("hello");
		        var uploadTask = imageRef.child(this.$data.recipe.imageName).put(selectedFile);
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
              console.log(error);
		        }, function() {
		          // Handle successful uploads on complete
		          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
							var fileName = that.iName;
              editRef.child("timeEstimate").set(hrs + " hrs, " + mins + " mins");
    					for (var i = 0; i < keys.length; i++) {
    						if (keys[i] !== ".key") {
    							editRef.child(keys[i]).set(values[i]);
    						}
    					}
							imageRef.child(that.$data.recipe['imageName']).delete().then(function () {
		          	var downloadURL = uploadTask.snapshot.downloadURL;
		          	editRef.child("imageName").set(fileName);
		          	editRef.child("imageUrl").set(downloadURL);
                window.location.href="personal.html";
			      	}).catch(function(error) {
			      	});
		        });

					} else {
  					editRef.child("timeEstimate").set(hrs + " hrs, " + mins + " mins");
  					for (var i = 0; i < keys.length; i++) {
  						if (keys[i] !== ".key") {
  							editRef.child(keys[i]).set(values[i]);
  						}
  					}
            window.location.href="personal.html";
          }
				}
			},
      readFile: function (oldSmallImage, event) {
				if (!event) return;
        selectedFile = event.target.files[0];
        var fileName = selectedFile.name;
        this.iName = fileName;

				var MAX_WIDTH = 600;
				var MAX_HEIGHT = 900;
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
							var upTask;
							if (blob.size > selectedFile.size) {
								upTask = imageRef.child("small_" + selectedFile.name).put(selectedFile);
							} else {
								upTask = imageRef.child("small_" + selectedFile.name).put(blob);
							}
							// Register three observers:
							// 1. 'state_changed' observer, called any time the state changes
							// 2. Error observer, called on failure
							// 3. Completion observer, called on successful completion
							upTask.on('state_changed', function(snapshot) {
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

		        		imageRef.child(oldSmallImage).delete().then(function () {
									var smallDownloadURL = upTask.snapshot.downloadURL;
									editRef.child("smallImageName").set("small_" + selectedFile.name);
									editRef.child("smallUrl").set(smallDownloadURL);
		        		}).catch(function(error) {
		        		});

							});
						}, 'image/jpeg', 0.95);
					};
				};
      }
    }
	});
});
