Vue.use(VueFire);
var editRef = db.ref("recipes/" + readCookie("recipeToEdit"));

window.addEventListener("load", function () {
	var vm = new Vue({
		el: "#editApp",
    data: {
      difficulty: "",
      visibility: "",
      fileName: ""
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
        var prop = event.target.name;
        var newValue = event.target.value;
        editRef.child(prop).set(newValue);
      },
      updateAsArray: function (event) {
        var prop = event.target.name;
        var rawProp = "raw" + event.target.name.charAt(0).toUpperCase() + event.target.name.substring(1);
        var asArray = event.target.value.split('\n');
        editRef.child(rawProp).set(event.target.value);
        editRef.child(prop).set(asArray);
      }
    }
	});
});
