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
		'/hw5/static/img/alpastor.jpg',
		'/hw5/static/img/aguachile.jpg',
		'/hw5/static/img/ceviche.jpg',
		'/hw5/static/img/kalbi.jpg',
		'/hw5/static/img/burger.jpg',
		'/hw5/static/img/foodex.jpeg'
	    ]);
	})
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
	caches.match(event.request).then(function(response) {
	    return response || fetch(event.request);
	})
    );
});
