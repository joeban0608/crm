(function(i,r){typeof exports=="object"&&typeof module<"u"?r(exports):typeof define=="function"&&define.amd?define(["exports"],r):(i=typeof globalThis<"u"?globalThis:i||self,r(i.CRMFingerprint={}))})(this,function(i){"use strict";var Ft=Object.defineProperty;var at=i=>{throw TypeError(i)};var St=(i,r,u)=>r in i?Ft(i,r,{enumerable:!0,configurable:!0,writable:!0,value:u}):i[r]=u;var d=(i,r,u)=>St(i,typeof r!="symbol"?r+"":r,u),tt=(i,r,u)=>r.has(i)||at("Cannot "+u);var e=(i,r,u)=>(tt(i,r,"read from private field"),u?u.call(i):r.get(i)),h=(i,r,u)=>r.has(i)?at("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(i):r.set(i,u),g=(i,r,u,U)=>(tt(i,r,"write to private field"),U?U.call(i,u):r.set(i,u),u),H=(i,r,u)=>(tt(i,r,"access private method"),u);var S,V,D,T,it,rt,p,A,R,j,O,k,z,$,E,x,L,b,M,v,q,st;const r="http://192.168.0.73:5173";function u(a){function t(f,y){return f>>>y|f<<32-y}const n=new TextEncoder().encode(a),s=Array.from(n),o=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],l=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],w=s.length*8;for(s.push(128);(s.length*8+64)%512!==0;)s.push(0);const J=new Array(8).fill(0);for(let f=0;f<8;f++)J[7-f]=w>>>f*8&255;s.push(...J);const et=[];for(let f=0;f<s.length;f+=64)et.push(s.slice(f,f+64));return et.forEach(f=>{const y=new Array(64);for(let c=0;c<16;c++)y[c]=f[c*4]<<24|f[c*4+1]<<16|f[c*4+2]<<8|f[c*4+3];for(let c=16;c<64;c++){const Z=t(y[c-15],7)^t(y[c-15],18)^y[c-15]>>>3,W=t(y[c-2],17)^t(y[c-2],19)^y[c-2]>>>10;y[c]=y[c-16]+Z+y[c-7]+W|0}let[C,I,P,X,F,_,G,Y]=l;for(let c=0;c<64;c++){const Z=t(F,6)^t(F,11)^t(F,25),W=F&_^~F&G,nt=Y+Z+W+o[c]+y[c]|0,bt=t(C,2)^t(C,13)^t(C,22),vt=C&I^C&P^I&P,Ct=bt+vt|0;Y=G,G=_,_=F,F=X+nt|0,X=P,P=I,I=C,C=nt+Ct|0}l[0]=l[0]+C|0,l[1]=l[1]+I|0,l[2]=l[2]+P|0,l[3]=l[3]+X|0,l[4]=l[4]+F|0,l[5]=l[5]+_|0,l[6]=l[6]+G|0,l[7]=l[7]+Y|0}),l.map(f=>(f>>>0).toString(16).padStart(8,"0")).join("")}class U{constructor(){h(this,T);d(this,"name","Audio Feature");d(this,"enabled",!0);h(this,S,null);h(this,V,null);h(this,D,5e3)}async support(){const t=window.OfflineAudioContext||window.webkitOfflineAudioContext;return t?(g(this,S,new t(1,e(this,D),44100)),e(this,S)!==null):!1}async data(){if(e(this,S)===null)return null;const t=await H(this,T,it).call(this,e(this,S));return t===null?null:(g(this,V,t.toString()),{fingerprint:await u(e(this,V)),info:{audio:t}})}}S=new WeakMap,V=new WeakMap,D=new WeakMap,T=new WeakSet,it=function(t){return new Promise(n=>{const s=t.createOscillator();s.type="triangle",s.frequency.value=1e4;const o=t.createDynamicsCompressor();o.threshold.value=-50,o.knee.value=40,o.ratio.value=12,o.attack.value=0,o.release.value=.2,s.connect(o),o.connect(t.destination),s.start(),t.oncomplete=l=>{const w=l.renderedBuffer.getChannelData(0),J=H(this,T,rt).call(this,w);n(J)},t.startRendering()})},rt=function(t){let n=0;for(let s=0;s<t.length;++s)n+=Math.abs(t[s]);return n};class ot{constructor(){d(this,"name","Canvas Feature");d(this,"enabled",!0);h(this,p,null);h(this,A,null)}async support(){return document?(g(this,p,document.createElement("canvas").getContext("2d")),e(this,p)!==null):!1}async data(){return e(this,p)===null?null:(e(this,p).textBaseline="top",e(this,p).font="14px 'Arial'",e(this,p).textBaseline="alphabetic",e(this,p).fillStyle="#f60",e(this,p).fillRect(100,1,55,20),e(this,p).fillStyle="#069",e(this,p).fillText("Cyber Universe Canvas",2,15),e(this,p).fillStyle="rgba(102, 204, 0, 0.7)",e(this,p).fillText("Cyber Universe Canvas",4,17),g(this,A,e(this,p).canvas.toDataURL()),{fingerprint:await u(e(this,A)),info:{image:e(this,A)}})}}p=new WeakMap,A=new WeakMap;const B=class B{constructor(){d(this,"name","ColorGamut Feature");d(this,"enabled",!0);h(this,R,null);h(this,j,null)}async support(){return!0}async data(){for(const t of B.gamutList){const n=`(color-gamut: ${t})`;if(matchMedia(n).matches){g(this,R,`gamut: ${t}`),g(this,j,t);break}}return e(this,R)===null?null:{fingerprint:await u(e(this,R)),info:{colorGamut:e(this,j)}}}};R=new WeakMap,j=new WeakMap,d(B,"gamutList",["rec2020","p3","srgb"]);let Q=B;class ut{constructor(){d(this,"name","Hardware Concurrency Feature");d(this,"enabled",!0);h(this,O,null);h(this,k,null);h(this,z,null)}async support(){return!!navigator}async data(){return navigator.hardwareConcurrency&&(g(this,O,navigator.hardwareConcurrency.toString()),g(this,z,navigator.hardwareConcurrency)),e(this,O)?(g(this,k,"hardware concurrency: "+e(this,O)),{fingerprint:await u(e(this,k)),info:{hardwareConcurrency:e(this,z)}}):null}}O=new WeakMap,k=new WeakMap,z=new WeakMap;const N=class N{constructor(){d(this,"name","HDR Feature");d(this,"enabled",!0);h(this,$,null);h(this,E,null)}async support(){return!0}async data(){for(const t of N.hdrList){const n=`(dynamic-range: ${t})`;if(matchMedia(n).matches){g(this,$,`dynamic-range: ${t}`),g(this,E,t);break}}return e(this,$)===null?null:{fingerprint:await u(e(this,$)),info:{hdr:e(this,E)}}}};$=new WeakMap,E=new WeakMap,d(N,"hdrList",["high","standard"]);let K=N;class lt{constructor(){d(this,"name","Languages Feature");d(this,"enabled",!0);h(this,x,[]);h(this,L,null)}async support(){return!!navigator}async data(){var t;return navigator.language&&e(this,x).push([navigator.language]),Array.isArray(navigator.languages)&&e(this,x).push(navigator.languages),(t=e(this,x))!=null&&t.length?(g(this,L,JSON.stringify(e(this,x))),{fingerprint:await u(e(this,L)),info:{languages:e(this,L)}}):null}}x=new WeakMap,L=new WeakMap;class ct{constructor(){d(this,"name","Screen resolution Feature");d(this,"enabled",!0);h(this,b,null);h(this,M,null)}async support(){if(!(window.OfflineAudioContext||window.webkitOfflineAudioContext))return!1;const n=window.screen;return n?(g(this,b,n),e(this,b)!==null):!1}async data(){if(e(this,b)===null)return null;const t=`${e(this,b).width} x ${e(this,b).height}`;return g(this,M,t),{fingerprint:await u(e(this,M)),info:{screenResolution:t}}}}b=new WeakMap,M=new WeakMap;class ht{constructor(){h(this,q);d(this,"name","Timezone Feature");d(this,"enabled",!0);h(this,v,null)}async support(){return!0}async data(){if(Intl.DateTimeFormat){const t=new Intl.DateTimeFormat().resolvedOptions().timeZone;g(this,v,t)}else g(this,v,H(this,q,st).call(this));return e(this,v)===null?null:{fingerprint:await u(e(this,v)),info:{timezone:e(this,v)}}}}v=new WeakMap,q=new WeakSet,st=function(){const n=-new Date().getTimezoneOffset(),s=n>=0?"+":"-",o=Math.floor(Math.abs(n)/60).toString().padStart(2,"0"),l=(Math.abs(n)%60).toString().padStart(2,"0");return`UTC${s}${o}:${l}`};async function ft(a){const t=a.id;document&&t&&document.addEventListener("click",function(n){const s=n.target;if(!s)return;const o={visitorId:t,eventType:"click",eventTarget:s.tagName,eventData:{x:n.clientX,y:n.clientY},url:window.location.href};console.log("eventData",o),fetch(`${r}/api/log`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})})}const dt=async a=>a.enabled?await a.support()?await a.data():(console.log(`Feature ${a.name} is not supported`),null):(console.log(`Feature ${a.name} is disabled`),null),gt=async()=>{const a=await pt(),n=await(await mt(a)).json();return console.log("createVisitorRes",n),await n.data},pt=async()=>{const a=[new U,new ot,new Q,new K,new ut,new lt,new ct,new ht],t=[],n={},s={};for(const l of a){const w=await dt(l);await m(w,"audio","audio",n),await m(w,"canvas","image",n),await m(w,"color gamut","colorGamut",n),await m(w,"hdr","hdr",n),await m(w,"hardware concurrency","hardwareConcurrency",n),await m(w,"languages","languages",n),await m(w,"screen resolution","screenResolution",n),await m(w,"timezone","timezone",n),w!=null&&w.fingerprint&&t.push(w.fingerprint)}const o=await yt();return o&&await wt(s,t,o),{id:await u(JSON.stringify(t)),ip:(o==null?void 0:o.ip)||!1,useragent:(o==null?void 0:o.headers["user-agent"])||!1,headers:(o==null?void 0:o.headers)||!1,rawData:n,serverFeature:s}};function m(a,t,n,s){var o;(o=a==null?void 0:a.info)!=null&&o[n]&&(s[t]={hash:a.fingerprint,value:a.info[n]})}async function wt(a,t,n){if(n!=null&&n.ip){const s=await u(n.ip);a["client ip"]={hash:s,value:n.ip},t.push(s)}}async function yt(){try{const t=await(await fetch(`${r}/api/fingerprint`)).json();if(!t)throw new Error("failed to get user request info");return t.serverData}catch(a){console.error("failed to get user request info",a)}}async function mt(a){return fetch(`${r}/api/fingerprint`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})}i.fpPromise=gt,i.tracking=ft,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});
