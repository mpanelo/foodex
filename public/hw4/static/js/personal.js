Vue.use(VueFire);

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
        printUserID: function () {
          console.log(this.user.uid);
        }
      }
  });
});
