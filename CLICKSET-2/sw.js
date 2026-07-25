const CACHE='clickset-2.1.1-static';
const FILES=['./clickset-2.0.css?v=211','./clickset-2.0.js?v=211','./manifest.webmanifest','./cover.png','./logo-clickset.png','./logo-4l.jpg','./logo-h80.jpeg','./logo-pgs.png','./logo-tocipam.jpg','./claves-normal.wav','./claves-accent.wav','./cowbell-normal.wav','./cowbell-accent.wav','./rimshot-normal.wav','./rimshot-accent.wav','./clap-normal.wav','./clap-accent.wav','./click.wav'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',c));return r}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res})));
});
