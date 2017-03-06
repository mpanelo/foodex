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
/*
var recipeDb = firebase.database().ref();

/*
function loadPage(){
	recipeDb.on('value', function(snapshot){
		console.log(snapshot.val());

		var recipe = snapshot.val()['recipes'];

		console.log(recipe);

		var main = document.getElementById('main');

		var count = 0;
		for(var item in recipe){
			//console.log(recipe[item]['visibility']);
			if(recipe[item]['visibility']==='public'){
				if(count==0){
					main.innerHTML += '<div class="row">';
				}
				main.innerHTML += '<div class="col-sm-4 col-md-3">'
							 	+ '<h3>'+recipe[item]['title']+'</h3>'
								+ '<img class="img img-responsive"'
								+' src="'+'../static/img/'+recipe[item]['imageName']+'"'
								+' onclick="location.href='+"'recipe.html'"+'"'
								+' alt="Image of the recipe">'
								+ '<p>'+recipe[item]['description']+'</p>'
								+ '</div>';
				if(count==2){
					main.innerHTML += '</div>';
				}
				count++%3;
			}
		}
	}, function(error){
		console.log('Error: ' + error.code);
	});
}
loadPage();
<<<<<<< HEAD
*/
/*
=======

>>>>>>> fe021d68888fe52f21842f9e034c82aa5576a195
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
*/
