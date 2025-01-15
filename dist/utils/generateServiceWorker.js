"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateServiceWorkerScript = void 0;
const generateServiceWorkerScript = (config) => {
    const cacheName = config.cacheName || 'static-cache';
    const version = config.version || 'v1';
    const cacheKey = `${cacheName}-${version}`;
    return `
// Generated Service Worker for react-static-cache
const CACHE_NAME = '${cacheKey}';
const URLS_TO_CACHE = ${JSON.stringify(config.urls)};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Failed to cache resources:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (URLS_TO_CACHE.includes(new URL(event.request.url).pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }

          return fetch(event.request).then((networkResponse) => {
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
          });
        })
        .catch((error) => {
          console.error('Failed to fetch resource:', error);
        })
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('${cacheName}') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
`;
};
exports.generateServiceWorkerScript = generateServiceWorkerScript;
