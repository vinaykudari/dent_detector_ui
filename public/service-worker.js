if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,r,i)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const c={uri:location.origin+s.slice(1)};return Promise.all(r.map(s=>{switch(s){case"exports":return a;case"module":return c;default:return e(s)}})).then(e=>{const s=i(...e);return a.default||(a.default=s),a})}))}}define("./service-worker.js",["./workbox-432e0d0b"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/915-641433c598520b9ce13c.js",revision:"0b71dc47388e5fe8da96741eebf1fc50"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"ebfa7545bbc0cb03aa824de5bb5defe6"},{url:"/_next/static/chunks/main-87e06067f371dc6c7270.js",revision:"f2234e228a872a36c2dbcbf49c42d90c"},{url:"/_next/static/chunks/pages/_app-cac31722194ba299393d.js",revision:"466f0337d86b6ffa6dc317158d1bcf7e"},{url:"/_next/static/chunks/pages/_error-9faf4177fb4e528b4124.js",revision:"6422752dc51036ca967a6ca152401e0e"},{url:"/_next/static/chunks/pages/index-6d6cbc8b812e61e97ca3.js",revision:"31153b532a44803aecf4b7bdee72c5ea"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"61b1abffd6a05a761d0ca34120d2d043"},{url:"/_next/static/chunks/webpack-e6c1964abab17dafbea0.js",revision:"dfa49ffe4edc59fcc9bdf35a464393fa"},{url:"/_next/static/vSl_BQV8J-uhEWcG-dWD6/_buildManifest.js",revision:"648d30cdd49a31f2d4de55ac0d2557d3"},{url:"/_next/static/vSl_BQV8J-uhEWcG-dWD6/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"2f35c850177e9527bb287558de864d6a"},{url:"/images/camera.svg",revision:"1ffb83d52dd24b3acd8bf26acb79ef58"},{url:"/images/close.svg",revision:"5fba37b3c99bfae54f8a545e21e8a2cb"},{url:"/images/download.svg",revision:"1ec1dc215c9e261bf9819045ac93262e"},{url:"/images/minus.svg",revision:"30f6baf4a8056d790f729efd6a4ea7b8"},{url:"/images/next.svg",revision:"2092a5486f0876eff5d146d285782652"},{url:"/images/nutrixLogo.svg",revision:"2ccb4b5e5789dc2174dccce82dd75bcb"},{url:"/images/placeHolder.svg",revision:"bf2c62b8ab2f4a3902f3b8f84b59a620"},{url:"/images/plus.svg",revision:"99d906139884900f6194568e7ce6031e"},{url:"/images/prev.svg",revision:"7fbe892c55d3b2777c268cc81db3a49d"},{url:"/images/rotate.svg",revision:"18e79dc035237f497650c452cb493f31"},{url:"/images/uploadIcon.svg",revision:"1cedb6e919bfed6a2c1ec00b5d8ee620"},{url:"/logo.svg",revision:"70faa7e643b395e982e363b967199214"},{url:"/logo180.png",revision:"324d59b968fb571f8c216f8e4482cd08"},{url:"/logo192.png",revision:"d49caad8978b4e20d05ff77fec02ae24"},{url:"/logo384.png",revision:"5326c288eec6daa211d2932f724e74a1"},{url:"/logo512.png",revision:"12f9626e49887a846cadeda7c40f240a"},{url:"/logoWithText.svg",revision:"ba1375c17f78494648fa5655bd816666"},{url:"/manifest.json",revision:"2d015f62d21d32b9f5c3d238c1a076e1"},{url:"/mobileLogoWithText.svg",revision:"be0f6a473d9f0aa10b6f31997f6379c4"},{url:"/og.png",revision:"4746b9094762349b3fbbc12821571cc8"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));