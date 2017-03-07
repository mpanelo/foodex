Vue.use(VueFire);
var ref = db.ref("recipes");
window.addEventListener("load", function () {
  var vm = new Vue({
      el: "#personalApp",

      data: {
        recipes: []
      },

      beforeCreate: function () {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            this.user = user;
            this.$bindAsArray("recipes", db.ref("recipes").orderByChild("uid").equalTo(user.uid));
          } else {
            window.location.href = "login.html";
          }
        }.bind(this));
      },

      methods: {
      	storeKey: function(key) {
          createCookie("recipeToView", key, 1);
          window.location.href="recipe.html";
        },
        removeRecipe: function(key) {
          ref.child(key).remove();
        },
        editRecipe: function(key) {
          console.log(key);
        }
      }
  });
});
