function validateData(data) {
  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (!data[prop]) return false;
    }
  }
  return true;
}

function resetData(data) {
  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      data[prop] = "";
    }
  }
}

function init() {
    var vm = new Vue({
        el: "#addEditApp",
        data: {
            title: "",
            description: "",
            days: "",
            hours: "",
            minutes: "",
            ingredients: "",
            instructions: "",
            difficulty: "",
            visibility: ""
        },
        firebase: {
            recipes: ref
        },
        methods: {
            submitRecipeForm: function() {
                if (validateData(this.data)) {
                    var listOfIng = ingredients.split("\n");
                    var listOfInstr = instructions.split("\n");
                    ref.push({
                        "title": this.title,
                        "description": this.description,
                        "ingredients": listOfIng,
                        "instructions": listOfInstr,
                        "difficulty": this.difficulty,
                        "visibility": this.visibility,
                        "timeEstimate": {"days": this.days, "hours": this.hours, "minutes": this.minutes}
                    });
                }
                resetData(data);
            }
        }
    });
}

Vue.use(VueFire);

var ref = db.ref("recipes");
window.addEventListener("load", init);
