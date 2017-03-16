Vue.use(VueFire);
var editRef = db.ref("recipes/" + readCookie("recipeToEdit"));
var imageRef = storage.ref("images");

window.addEventListener("load", function () {
	var vm = new Vue({
		el: "#editApp",
    data: {
      iName: ""
    },
		firebase: {
			recipe: {
				source: editRef,
				asObject: true,
				cancelCallback: function () {}
			}
		},
    computed: {
        getIngredients: function () {
          var ing = this.recipe.ingredients;
          ing = ing.join('\n');
          return ing;
        }
    },
    methods: {
      updateRecipe: function (event) {
        var prop = event.target.name;
        var newText = event.target.value;
        editRef.child(prop).set(newText);
      },
      updateRadio: function (event) {
        var prop = event.target.name || event.srcElement.name;
        var newValue = event.target.value || event.srcElement.name;
        editRef.child(prop).set(newValue);
      },
      updateAsArray: function (event) {
        var prop = event.target.name;
        var rawProp = "raw" + event.target.name.charAt(0).toUpperCase() + event.target.name.substring(1);
        var asArray = event.target.value.split('\n');
        asArray = asArray.filter(function(n) {
          return n.length > 0;
        });
        editRef.child(rawProp).set(event.target.value);
        editRef.child(prop).set(asArray);
      },
      updateImage: function (oldImage,oldSmallImage, event) {
				if (!event) return;
				console.log(oldImage);
				console.log(oldSmallImage);
        var selectedFile = event.target.files[0];
        var fileName = selectedFile.name;
        this.iName = fileName;

        imageRef.child(oldImage).delete().then(function () {
        }).catch(function(error) {
        });
        imageRef.child(oldSmallImage).delete().then(function () {
        }).catch(function(error) {
        });

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
								var smallDownloadURL = upTask.snapshot.downloadURL;
								editRef.child("smallImageName").set("small_" + selectedFile.name);
								editRef.child("smallUrl").set(smallDownloadURL);
							});
						}, 'image/jpeg', 0.95);
					};
				};
        var newImageRef = imageRef.child(fileName);
        var uploadTask = newImageRef.put(selectedFile);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
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
          editRef.child("imageName").set(fileName);
          editRef.child("imageUrl").set(downloadURL);
        });
      }
    }
	});
});
