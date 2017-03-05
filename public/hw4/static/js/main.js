/*
		<div class="row">
		  <div class="col-sm-4 col-md-3">
		    <h3>Kalbi</h3>
		    <img class="img img-responsive" src="../static/img/kalbi.jpg" onclick="location.href='recipe.html'" alt="Image of the recipe">
		    <p>Check out this awesome Korean steak recipe by ChangHatesKimbap</p>
		  </div>
		  <div class="col-sm-4 col-md-3">
		    <h3>Burger</h3>
		    <img class="img img-responsive" src="../static/img/burger.jpg" onclick="location.href='recipe.html'" alt="Image of the recipe">
		    <p>
		      Check out this burger by bigBoi420
		    </p>
		  </div>
		  <div class="col-sm-4 col-md-3">
		    <h3>Tacos</h3>
		    <img class="img img-responsive" src="../static/img/alpastor.jpg" onclick="location.href='recipe.html'" alt="Image of the recipe">
		    <p>Check out this awesome taco recipe made by jalapeno_man35</p>
		  </div>
		</div>
*/

var database = firebase.database().ref();

function loadPage(){
	database.on('value', function(snapshot){
		console.log(snapshot.val());

		var recipe = snapshot.val()['recipes'];
		//console.log(JSON.stringify(recipe));

		var main = document.getElementById('main');

		var count = 0;
		for(var item in recipe){
			//console.log(JSON.stringify(item));
			console.log(recipe[item]['visibility']);
			if(recipe[item]['visibility']==='public'){
				if(count==0){
					main.innerHTML += '<div class="row">';
				}
				main.innerHTML += '<div class="col-sm-4 col-md-3">';
				main.innerHTML += '<h3>'+recipe[item]['title']+'</h3>';
				main.innerHTML += '<img class="img img-responsive"'
								+' src="'+'../static/img/'+recipe[item]['imageName']+'"'
								+' onclick="location.href='+"'recipe.html'"+'"'
								+' alt="Image of the recipe">';
				main.innerHTML += '<p>'+recipe[item]['description']+'</p>'
				main.innerHTML += '</div>';
				if(count==2){
					main.innerHTML += '</div>';
				}
				count++%3;
			}
		}
		/*
		var recipeString = JSON.stringify(snapshot.val());
		console.log(recipeString);
		console.log('---------------------');
		var recipes = JSON.parse(recipeString);
		console.log(recipes);
		//for(var item in recipes){
		//	console.log(item);
		//}
		*/
	}, function(error){
		console.log('Error: ' + error.code);
	});
}

loadPage();