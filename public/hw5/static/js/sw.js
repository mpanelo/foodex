importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
	caches.open('foodex').then(function(cache) {
	    return cache.addAll([
		'/',
		'/login.html',
		'../min.css/foodex.min.css',
	    ]);
	})
    );
});
