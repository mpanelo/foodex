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
    days: "",
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
    var vm = new Vue({
        el: "#addEditApp",
        data: getDefaultData(),
        firebase: {
            db: ref
        },
        methods: {
            submitRecipeForm: function () {
                if (validateData(this.data)) {
                    var listOfIng = this.ingredients.split("\n");
                    var listOfInstr = this.instructions.split("\n");
                    ref.push({
                        "title": this.title,
                        "description": this.description,
                        "ingredients": listOfIng,
                        "instructions": listOfInstr,
                        "difficulty": this.difficulty,
                        "visibility": this.visibility,
                        "timeEstimate": {"days": this.days, "hours": this.hours, "minutes": this.minutes},
                        "imageName": this.fileName
                    });
                }
                Object.assign(this.$data, getDefaultData());
            },
            uploadFile: function (event) {
              selectedFile = event.target.files[0];
              this.fileName = selectedFile.name;
              var currImageRef = imageRef.child(this.fileName);
              var uploadTask = currImageRef.put(selectedFile);
              // Register three observers:
              // 1. 'state_changed' observer, called any time the state changes
              // 2. Error observer, called on failure
              // 3. Completion observer, called on successful completion
              uploadTask.on('state_changed', function(snapshot){
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
                var url = uploadTask.snapshot.downloadURL;
              });
            }
        }
    });
}

Vue.use(VueFire);

var ref = db.ref("recipes");
var imageRef = storage.ref("images");
window.addEventListener("load", init);
