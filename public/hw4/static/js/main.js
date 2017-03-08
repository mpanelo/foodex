Vue.use(VueFire);
var recipeRef = db.ref("recipes");

window.addEventListener("load", function () {
	var mainVm = new Vue({
		el: "#homeApp",
		firebase: {
			recipes: recipeRef
		},
		methods: {
			storeKey: function(key) {
				createCookie("recipeToView", key, 1);
				window.location.href="recipe.html";
			},
			isPublic: function(vis) {
				return vis == "public";
			}
		}
	});
});
