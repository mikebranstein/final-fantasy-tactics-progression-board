/*
 * Service worker: makes the board work offline once installed.
 * Bump CACHE when you change any cached asset to force an update.
 */
const CACHE = "fft-board-v10";
const ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "data.js",
  "app.js",
  "manifest.webmanifest",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isFont =
    url.host.includes("fonts.googleapis.com") || url.host.includes("fonts.gstatic.com");

  // Google Fonts: serve cached, refresh in the background.
  if (isFont) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Same-origin: cache-first, fall back to network, then to the app shell.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
            return res;
          })
          .catch(() => caches.match("index.html"))
    )
  );
});
