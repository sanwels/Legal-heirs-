// ═══ SERVICE WORKER — Legal Heirs Calculator ═══
// Ye file app ko offline bhi kaam karne deti hai

const CACHE_NAME = 'heirs-calc-v1';
const FILES_TO_CACHE = [
  './',
  './index.html'
];

// Install — cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
