const CACHE_NAME = 'appshub-v5';
const urlsToCache = [
  './',
  './index.html',
  './impressum.html',
  './datenschutz.html',
  './manifest.json',
  './style.css',
  './fonts.css',
  './fonts/manrope-400.ttf',
  './fonts/manrope-500.ttf',
  './fonts/manrope-600.ttf',
  './fonts/manrope-700.ttf',
  './fonts/plus-jakarta-sans-400.ttf',
  './fonts/plus-jakarta-sans-500.ttf',
  './fonts/plus-jakarta-sans-600.ttf',
  './fonts/plus-jakarta-sans-700.ttf',
  './fonts/plus-jakarta-sans-800.ttf',
  './fonts/material-symbols-outlined.ttf',
  './assets/konky_dong_icon_1775982414871.png',
  './assets/runny_bunny_icon_1775982430842.png',
  './assets/leos_dino_icon_1775982445099.png',
  './assets/moonlander_icon_1775982461334.png',
  './assets/lidar-bot-web_icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
