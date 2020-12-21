let CACHE_NAME = "appv1";
const urlToCache = [
  "static/js/main.chunk.js",
  "static/js/0.chunk.js",
  "static/js/bundle.js",
  "index.html",
  "offline.html",
  "/",
  "/starred",
];
//const self = this;

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened Cache...");
      return cache.addAll(urlToCache);
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );

  // if (!navigator.onLine) {
  //   event.respondWith(
  //     caches.match(event.request).then((res) => {
  //       if (res) {
  //         return res;
  //       }
  //       let requestUrl = event.request.clone();
  //       fetch(requestUrl);
  //     })
  //   );
  // }
});

this.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
