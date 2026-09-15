const C="bdor-v6";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
const r=e.request;
if(r.method!=="GET")return;
const u=new URL(r.url),own=u.origin===location.origin;
const put=res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res};
if(own||u.hostname.endsWith("wikipedia.org"))e.respondWith(fetch(r,own?{cache:"no-cache"}:{}).then(put).catch(()=>caches.match(r,{ignoreSearch:own}).then(m=>m||caches.match("./index.html"))));
else e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put)));
});
