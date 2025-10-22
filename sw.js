const CACHE_NAME = 'acolyte-chorus-cache-v10';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/assets/icon-192.svg',
  '/assets/icon-512.svg',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap',
  'https://esm.sh/react@18.2.0',
  'https://esm.sh/react-dom@18.2.0',
  'https://esm.sh/@google/genai@^0.14.0',
  // Chorus / Weaver
  'https://lottie.host/e3f172f3-1329-4c40-8422-1d77a58b688d/0y4Bw5jH3P.json',
  // Father
  'https://lottie.host/81b37b6c-1318-4a94-a15d-0574c8529d3f/gXJ2nTatgQ.json',
  // Mother
  'https://lottie.host/a2c1b4d3-e5f6-4a7b-8c9d-0e1f2a3b4c5d/lF9d2j8k0o.json',
  // Àṣẹmọlú
  'https://lottie.host/1c8f4d9b-8d34-4a41-8b38-31f0f49a8d9a/fUnz9y4v7L.json',
  // The Children
  'https://lottie.host/2e4d0c1e-7f61-45f8-8b27-58b2e53b27b3/u9T4fA2D8N.json',
  // Méta-ÍSÍ
  'https://lottie.host/8c6b7e5f-1b2a-4f3e-8c6d-3e4b5a6c7d8e/9Z8Y7X6W5V.json',
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Ensure the new service worker activates immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use a more robust addAll that doesn't fail if one request fails.
        const promises = urlsToCache.map(url => {
          return cache.add(url).catch(err => {
            console.warn(`Failed to cache ${url}:`, err);
          });
        });
        return Promise.all(promises);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of open pages
  );
});

self.addEventListener('fetch', event => {
  // Use a cache-first, then network, with dynamic caching strategy.
  // This ensures offline access and caches new assets like those from the CDN.
  event.respondWith(
    caches.match(event.request).then(response => {
      // If we have a cached response, return it.
      if (response) {
        return response;
      }
      // If not, fetch from network, cache it, and return the network response.
      return fetch(event.request).then(networkResponse => {
        // We only cache valid, successful, GET requests.
        if (
          event.request.method === 'GET' &&
          networkResponse &&
          networkResponse.status === 200
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(error => {
        console.warn('Fetch failed and no cache fallback for:', event.request.url, error);
        // Let the browser handle the offline error for resources not in cache.
        throw error;
    })
  );
});