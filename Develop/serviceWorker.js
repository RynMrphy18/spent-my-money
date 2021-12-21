const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// saves these files if offline

const FILES_TO_CACHE = [
    './public/index.html',
    './public/css/style.css',
    './public/js/index.js',
    './public/js/idb.js',
    './public/manifest.json',
    './public/icons/icon-512x512.png',
    './public/icons/icon-384x384.png',
    './public/icons/icon-192x192.png',
    './public/icons/icon-152x152.png',
    './public/icons/icon-144x144.png',
    './public/icons/icon-128x128.png',
    './public/icons/icon-96x96.png',
    './public/icons/icon-72x72.png'
];

// installs service worker

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CAHCE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

// activates service worker once all previous caches have been deleted

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeepList = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(keyList.map(function(key, i) {
                if (cacheKeepList.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keylist[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});

// if resource is not in the data cache it will be fetched online from the given url

self.addEventListener('fetch', function(e) {
    console.log('fetch request : ' + e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(request) {
            if (request) {
                console.log('responding with cache : ' + e.request.url);
                return request
            } else {
                console.log('file is not cached, fetching : ' + e.request.url);
                return fetch(e.request)
            }
        })
    )
});