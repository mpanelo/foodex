Vue.use(VueFire);
var specificRecipeRef = db.ref("recipes/" + readCookie("recipeToView"));
window.addEventListener("load", function () {
	var mainVm = new Vue({
		el: "#recipeViewApp",
		firebase: {
			recipe: {
				source: specificRecipeRef,
				asObject: true,
				cancelCallback: function () {}
			}
		}
	});
});

var times;
