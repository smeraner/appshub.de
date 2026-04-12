const CACHE_NAME = 'appshub-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './assets/konky_dong_icon_1775982414871.png',
  './assets/runny_bunny_icon_1775982430842.png',
  './assets/leos_dino_icon_1775982445099.png',
  './assets/moonlander_icon_1775982461334.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
