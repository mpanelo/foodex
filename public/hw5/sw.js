importScripts('./static/js/cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
	caches.open('foodex').then(function(cache) {
	    return cache.addAll([
		'/hw5/templates/login.html',
		'/hw5/templates/signUp.html',
		'/hw5/templates/main.html',
		'/hw5/templates/personal.html',
		'/hw5/templates/recipe.html',
		'/hw5/templates/add.html',
		'/hw5/templates/edit.html',

		'/hw5/static/min.css/foodex.min.css',
		
		'/hw5/static/min.js/vue-and-vuefire.min.js',
		'/hw5/static/min.js/firebase-3.7.0.min.js',
		'/hw5/static/min.js/jquery.min.js',

		'/hw5/static/min.js/app-auth.min.js',
		'/hw5/static/min.js/addRecipe.min.js',
		'/hw5/static/min.js/editRecipe.min.js',
		'/hw5/static/min.js/main.min.js',
		'/hw5/static/min.js/personal.min.js',
		'/hw5/static/min.js/recipe.min.js',
		
	    ]);
	})
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
	caches.match(e.request).then(function(resp) {
	    return resp || fetch(e.request).then(function(response) {
		caches.open('foodex').then(function(cache) {
		    cache.put(e.request, response.clone());
		});
		return response;
	    });
	}).catch(function() {
	    return caches.match('/hw5/static/img/foodex.jpeg');
	})
    );
});
