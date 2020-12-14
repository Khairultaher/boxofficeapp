let cachedata = "appv1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cachedata).then((cache) => {
      cache.addAll([
        "static/js/main.chunk.js",
        "static/js/0.chunk.js",
        "static/js/bundle.js",
        "index.html",
        "/",
        "/starred",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
