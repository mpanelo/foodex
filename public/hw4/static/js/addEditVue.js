function validateData(data) {
  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] === "") return false;
    }
  }
  return true;
}

function init() {
    var vm = new Vue({
        el: "#addEditApp",
        data: {
            title: "",
            description: "",
            difficulty: "",
            visibility: "",
        },
        firebase: {
            recipes: ref
        },
        methods: {
            submitRecipeForm: function() {
                if (validateData(this.data)) {
                    ref.push({
                        "title": this.title,
                        "description": this.description,
                        "difficulty": this.difficulty,
                        "visibility": this.visibility
                    });
                    this.title = "";
                    this.description = "";
                }
            }
        }
    });
}

Vue.use(VueFire);

var ref = db.ref("recipes");
window.addEventListener("load", init);
