Vue.use(VueFire);
var recipeRef = db.ref("recipes");

var mainVm = new Vue({
	el: "homeApp",
	firebase: {
		recipes: recipeRef
	},
	methods: {
		printKey: function(key) {
			console.log(key);
			var recipe = recipeRef.child(key);
		}
	}
});

function loadPage(){
	recipeRef.on('value', function(snapshot){
		console.log(snapshot.val());

		var recipe = snapshot.val()['recipes'];

		var main = document.getElementById('main');

		var count = 0;
		for(var item in recipe){
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

/*
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
