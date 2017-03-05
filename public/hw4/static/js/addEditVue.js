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
    visibility: ""
  };
}

function init() {
    var vm = new Vue({
        el: "#addEditApp",
        data: getDefaultData(),
        firebase: {
            recipes: ref
        },
        methods: {
            submitRecipeForm: function() {
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
                        "timeEstimate": {"days": this.days, "hours": this.hours, "minutes": this.minutes}
                    });
                }
                Object.assign(this.$data, getDefaultData());
            }
        }
    });
}

Vue.use(VueFire);

var ref = db.ref("recipes");
window.addEventListener("load", init);
