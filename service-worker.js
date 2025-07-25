// STEMCity Labs - Service Worker for Performance Optimization
const CACHE_NAME = 'stemcity-labs-v1.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/solution.html',
    '/events.html',
    '/news.html',
    '/goals.html',
    '/get-involved.html',
    '/success-stories.html',
    '/resources.html',
    '/ERP.html',
    '/css/global.css',
    '/css/styles.css',
    '/css/standardized-layout.css',
    '/css/performance-optimized.css',
    '/css/bootstrap.min.css',
    '/js/global.js',
    '/js/standardized-layout.js',
    '/js/performance-optimizer.js',
    '/images/1E8A4886.jpg',
    '/images/20240826085129_1E8A6172 (1).JPG',
    '/images/Brian.jpeg',
    '/images/zillah.jpeg',
    '/images/arthur.jpeg',
    '/images/josh.JPG',
    '/images/may christian 2.jpg',
    '/images/may christian 3.jpg'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response for caching
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
