(function(e,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(e=typeof globalThis<"u"?globalThis:e||self,n(e.CRMFingerprint={}))})(this,function(e){"use strict";var V=Object.defineProperty;var M=e=>{throw TypeError(e)};var W=(e,n,r)=>n in e?V(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var L=(e,n,r)=>W(e,typeof n!="symbol"?n+"":n,r),P=(e,n,r)=>n.has(e)||M("Cannot "+r);var w=(e,n,r)=>(P(e,n,"read from private field"),r?r.call(e):n.get(e)),T=(e,n,r)=>n.has(e)?M("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,r),U=(e,n,r,E)=>(P(e,n,"write to private field"),E?E.call(e,r):n.set(e,r),r),C=(e,n,r)=>(P(e,n,"access private method"),r);var u,v,d,O,_,$,H;const n=()=>navigator.userAgent;function r(g){function t(o,h){return o>>>h|o<<32-h}const s=new TextEncoder().encode(g),i=Array.from(s),c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],l=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],F=i.length*8;for(i.push(128);(i.length*8+64)%512!==0;)i.push(0);const m=new Array(8).fill(0);for(let o=0;o<8;o++)m[7-o]=F>>>o*8&255;i.push(...m);const y=[];for(let o=0;o<i.length;o+=64)y.push(i.slice(o,o+64));return y.forEach(o=>{const h=new Array(64);for(let a=0;a<16;a++)h[a]=o[a*4]<<24|o[a*4+1]<<16|o[a*4+2]<<8|o[a*4+3];for(let a=16;a<64;a++){const R=t(h[a-15],7)^t(h[a-15],18)^h[a-15]>>>3,j=t(h[a-2],17)^t(h[a-2],19)^h[a-2]>>>10;h[a]=h[a-16]+R+h[a-7]+j|0}let[f,b,S,A,p,x,D,I]=l;for(let a=0;a<64;a++){const R=t(p,6)^t(p,11)^t(p,25),j=p&x^~p&D,B=I+R+j+c[a]+h[a]|0,z=t(f,2)^t(f,13)^t(f,22),G=f&b^f&S^b&S,Q=z+G|0;I=D,D=x,x=p,p=A+B|0,A=S,S=b,b=f,f=B+Q|0}l[0]=l[0]+f|0,l[1]=l[1]+b|0,l[2]=l[2]+S|0,l[3]=l[3]+A|0,l[4]=l[4]+p|0,l[5]=l[5]+x|0,l[6]=l[6]+D|0,l[7]=l[7]+I|0}),l.map(o=>(o>>>0).toString(16).padStart(8,"0")).join("")}class E{constructor(){T(this,d);L(this,"name","Canvas Feature");L(this,"enabled",!0);T(this,u,null);T(this,v,null)}async support(){return document?(U(this,u,document.createElement("canvas").getContext("2d")),w(this,u)!==null):!1}async data(){if(w(this,u)===null)return null;await C(this,d,O).call(this,w(this,u).canvas,w(this,u));const t=await C(this,d,$).call(this,w(this,u).canvas),s=C(this,d,H).call(this,t);return U(this,v,await C(this,d,_).call(this,s)),{fingerprint:await r(w(this,v)),info:{image:w(this,v)}}}}u=new WeakMap,v=new WeakMap,d=new WeakSet,O=function(t,s){const i="Cyber Universe Canvas";t.width=300,t.height=75,s.fillStyle="#fff",s.fillRect(0,0,s.canvas.width,s.canvas.height),s.imageSmoothingEnabled=!1,s.font="14px 'Arial'",s.textBaseline="alphabetic",s.fillStyle="#f60",s.fillRect(100,1,55,20),s.fillStyle="#069",s.fillText(i,2,15),s.fillStyle="rgba(102, 204, 0, 0.7)",s.fillText(i,4,17)},_=function(t){return t.toDataURL()},$=function(t){const i=document.createElement("canvas");i.width=t.width*3,i.height=t.height*3;const c=i.getContext("2d");if(!c)throw new Error("Failed to get 2D _ctx");c.imageSmoothingEnabled=!1,c.scale(3,3),c.drawImage(t,0,0);const l=c.getImageData(0,0,i.width,i.height),F=new ImageData(t.width,t.height);for(let m=0;m<t.height;m+=1)for(let y=0;y<t.width;y+=1){const o=(m*t.width+y)*4,h=(m*3*i.width+y*3+1)*4;for(let f=0;f<4;f+=1)F.data[o+f]=l.data[h+f]}return F},H=function(t){const s=document.createElement("canvas");s.width=t.width,s.height=t.height;const i=s.getContext("2d");if(!i)throw new Error("Failed to get 2D context");return i.putImageData(t,0,0),s};const J=async g=>g.enabled?await g.support()?await g.data():(console.log(`Feature ${g.name} is not supported`),null):(console.log(`Feature ${g.name} is disabled`),null),K=async()=>{var s;const g=[new E],t=[];for(const i of g){const c=await J(i);console.log(i.name,c==null?void 0:c.fingerprint),console.log((s=c==null?void 0:c.info)==null?void 0:s.image),t.push((c==null?void 0:c.fingerprint)||"")}return await r(JSON.stringify(t))},N=n(),q=async()=>({useragent:N,id:await K()});e.fpPromise=q,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
