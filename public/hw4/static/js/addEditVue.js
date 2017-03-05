function init() {
    var vm = new Vue({
        el: "recipeForm",
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
                if (this.title.trim() && this.description.trim()) {
                    ref.push({
                        "title": this.title,
                        "description": this.description,
                    })
                    this.title = "";
                    this.description = "";
                }
            }
        }
    });
}

Vue.use(VueFire);

var ref = db.ref("recipes");
window.addEventListener("load", init)
