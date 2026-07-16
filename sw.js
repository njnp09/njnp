const CACHE="clickset-v0200";
const APP_SHELL=["./","./index.html","./styles.css?v=0201","./app.js?v=0201","./manifest.webmanifest","./cover.png","./click.wav?v=0200","./logo-4l.jpg","./logo-h80.jpeg","./logo-tocipam.jpg","./logo-pgs.png","./logo-clickset.png"];
self.addEventListener("install",event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const url=new URL(event.request.url);
 if(event.request.mode==="navigate"){
  event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put("./index.html",copy));return response}).catch(()=>caches.match("./index.html")));return;
 }
 if(url.origin===self.location.origin){
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>cached||fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})));return;
 }
 event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request)));
});
