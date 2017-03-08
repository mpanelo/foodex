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
    methods: {
      updateRecipe: function (event) {
        var prop = event.target.name;
        var newText = event.target.value;
        editRef.child(prop).set(newText);
      }
    }
	});
});
