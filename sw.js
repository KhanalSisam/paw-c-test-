
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("v2").then(cache => {
            console.log("cache opened")
            return cache.addAll([
                "pages/home/home.html",
                "pages/home/home.js",
                "pages/home/home.css",
                "pages/text/text.css",
                "pages/text/text.html",
                "pages/text/text.js",
                "pages/text/text.json",
                "assets/pawprint192x192.svg",
                "assets/pawprint512x512.svg",
            ])
        })
    )
})

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                return res || fetch(event.request)
            })
    )
})