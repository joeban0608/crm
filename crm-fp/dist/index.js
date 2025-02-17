var ft = Object.defineProperty;
var at = (e) => {
  throw TypeError(e);
};
var dt = (e, t, n) => t in e ? ft(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => dt(e, typeof t != "symbol" ? t + "" : t, n), K = (e, t, n) => t.has(e) || at("Cannot " + n);
var a = (e, t, n) => (K(e, t, "read from private field"), n ? n.call(e) : t.get(e)), l = (e, t, n) => t.has(e) ? at("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), h = (e, t, n, i) => (K(e, t, "write to private field"), i ? i.call(e, n) : t.set(e, n), n), W = (e, t, n) => (K(e, t, "access private method"), n);
const rt = "http://192.168.0.73:5173";
function w(e) {
  function t(u, g) {
    return u >>> g | u << 32 - g;
  }
  const n = new TextEncoder().encode(e), i = Array.from(n), r = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], s = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], f = i.length * 8;
  for (i.push(128); (i.length * 8 + 64) % 512 !== 0; )
    i.push(0);
  const P = new Array(8).fill(0);
  for (let u = 0; u < 8; u++)
    P[7 - u] = f >>> u * 8 & 255;
  i.push(...P);
  const et = [];
  for (let u = 0; u < i.length; u += 64)
    et.push(i.slice(u, u + 64));
  return et.forEach((u) => {
    const g = new Array(64);
    for (let o = 0; o < 16; o++)
      g[o] = u[o * 4] << 24 | u[o * 4 + 1] << 16 | u[o * 4 + 2] << 8 | u[o * 4 + 3];
    for (let o = 16; o < 64; o++) {
      const H = t(g[o - 15], 7) ^ t(g[o - 15], 18) ^ g[o - 15] >>> 3, Q = t(g[o - 2], 17) ^ t(g[o - 2], 19) ^ g[o - 2] >>> 10;
      g[o] = g[o - 16] + H + g[o - 7] + Q | 0;
    }
    let [p, V, L, _, y, U, N, G] = s;
    for (let o = 0; o < 64; o++) {
      const H = t(y, 6) ^ t(y, 11) ^ t(y, 25), Q = y & U ^ ~y & N, nt = G + H + Q + r[o] + g[o] | 0, ut = t(p, 2) ^ t(p, 13) ^ t(p, 22), ct = p & V ^ p & L ^ V & L, ht = ut + ct | 0;
      G = N, N = U, U = y, y = _ + nt | 0, _ = L, L = V, V = p, p = nt + ht | 0;
    }
    s[0] = s[0] + p | 0, s[1] = s[1] + V | 0, s[2] = s[2] + L | 0, s[3] = s[3] + _ | 0, s[4] = s[4] + y | 0, s[5] = s[5] + U | 0, s[6] = s[6] + N | 0, s[7] = s[7] + G | 0;
  }), s.map((u) => (u >>> 0).toString(16).padStart(8, "0")).join("");
}
var v, $, j, T, st, ot;
class gt {
  constructor() {
    l(this, T);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    l(this, v, null);
    l(this, $, null);
    l(this, j, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (h(this, v, new t(1, a(this, j), 44100)), a(this, v) !== null) : !1;
  }
  async data() {
    if (a(this, v) === null) return null;
    const t = await W(this, T, st).call(this, a(this, v));
    return t === null ? null : (h(this, $, t.toString()), {
      fingerprint: await w(a(this, $)),
      info: {
        audio: t
      }
    });
  }
}
v = new WeakMap(), $ = new WeakMap(), j = new WeakMap(), T = new WeakSet(), st = function(t) {
  return new Promise((n) => {
    const i = t.createOscillator();
    i.type = "triangle", i.frequency.value = 1e4;
    const r = t.createDynamicsCompressor();
    r.threshold.value = -50, r.knee.value = 40, r.ratio.value = 12, r.attack.value = 0, r.release.value = 0.2, i.connect(r), r.connect(t.destination), i.start(), t.oncomplete = (s) => {
      const f = s.renderedBuffer.getChannelData(0), P = W(this, T, ot).call(this, f);
      n(P);
    }, t.startRendering();
  });
}, ot = function(t) {
  let n = 0;
  for (let i = 0; i < t.length; ++i)
    n += Math.abs(t[i]);
  return n;
};
var d, A;
class wt {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    l(this, d, null);
    l(this, A, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (h(this, d, document.createElement("canvas").getContext("2d")), a(this, d) !== null) : !1;
  }
  async data() {
    return a(this, d) === null ? null : (a(this, d).textBaseline = "top", a(this, d).font = "14px 'Arial'", a(this, d).textBaseline = "alphabetic", a(this, d).fillStyle = "#f60", a(this, d).fillRect(100, 1, 55, 20), a(this, d).fillStyle = "#069", a(this, d).fillText("Cyber Universe Canvas", 2, 15), a(this, d).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, d).fillText("Cyber Universe Canvas", 4, 17), h(this, A, a(this, d).canvas.toDataURL()), {
      fingerprint: await w(a(this, A)),
      info: {
        image: a(this, A)
      }
    });
  }
}
d = new WeakMap(), A = new WeakMap();
var x, E;
const q = class q {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    l(this, x, null);
    l(this, E, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of q.gamutList) {
      const n = `(color-gamut: ${t})`;
      if (matchMedia(n).matches) {
        h(this, x, `gamut: ${t}`), h(this, E, t);
        break;
      }
    }
    return a(this, x) === null ? null : {
      fingerprint: await w(a(this, x)),
      info: {
        colorGamut: a(this, E)
      }
    };
  }
};
x = new WeakMap(), E = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(q, "gamutList", ["rec2020", "p3", "srgb"]);
let X = q;
var O, I, M;
class pt {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    l(this, O, null);
    l(this, I, null);
    l(this, M, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, O, navigator.hardwareConcurrency.toString()), h(this, M, navigator.hardwareConcurrency)), a(this, O) ? (h(this, I, "hardware concurrency: " + a(this, O)), {
      fingerprint: await w(a(this, I)),
      info: {
        hardwareConcurrency: a(this, M)
      }
    }) : null;
  }
}
O = new WeakMap(), I = new WeakMap(), M = new WeakMap();
var R, z;
const B = class B {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    l(this, R, null);
    l(this, z, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of B.hdrList) {
      const n = `(dynamic-range: ${t})`;
      if (matchMedia(n).matches) {
        h(this, R, `dynamic-range: ${t}`), h(this, z, t);
        break;
      }
    }
    return a(this, R) === null ? null : {
      fingerprint: await w(a(this, R)),
      info: {
        hdr: a(this, z)
      }
    };
  }
};
R = new WeakMap(), z = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(B, "hdrList", ["high", "standard"]);
let Y = B;
var C, k;
class yt {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    l(this, C, []);
    l(this, k, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && a(this, C).push([navigator.language]), Array.isArray(navigator.languages) && a(this, C).push(navigator.languages), (t = a(this, C)) != null && t.length ? (h(this, k, JSON.stringify(a(this, C))), {
      fingerprint: await w(a(this, k)),
      info: {
        languages: a(this, k)
      }
    }) : null;
  }
}
C = new WeakMap(), k = new WeakMap();
var b, D;
class mt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    l(this, b, null);
    l(this, D, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const n = window.screen;
    return n ? (h(this, b, n), a(this, b) !== null) : !1;
  }
  async data() {
    if (a(this, b) === null) return null;
    const t = `${a(this, b).width} x ${a(this, b).height}`;
    return h(this, D, t), {
      fingerprint: await w(a(this, D)),
      info: {
        screenResolution: t
      }
    };
  }
}
b = new WeakMap(), D = new WeakMap();
var S, J, lt;
class bt {
  constructor() {
    l(this, J);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    l(this, S, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      h(this, S, t);
    } else
      h(this, S, W(this, J, lt).call(this));
    return a(this, S) === null ? null : {
      fingerprint: await w(a(this, S)),
      info: {
        timezone: a(this, S)
      }
    };
  }
}
S = new WeakMap(), J = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
lt = function() {
  const n = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), i = n >= 0 ? "+" : "-", r = Math.floor(Math.abs(n) / 60).toString().padStart(2, "0"), s = (Math.abs(n) % 60).toString().padStart(2, "0");
  return `UTC${i}${r}:${s}`;
};
let tt;
const Z = [], F = new WebSocket("ws://localhost:8080");
F.onopen = () => {
  console.log("WebSocket 連線建立");
};
F.onmessage = (e) => {
  console.log("後端回應:", e.data);
};
F.onerror = (e) => {
  console.error("❌ WebSocket 錯誤:", e);
};
F.onclose = () => {
  console.log("❌ WebSocket 連線已關閉");
};
function St(e) {
  if (window.pako)
    return window.pako.deflate(JSON.stringify(e));
  throw new Error("pako is not defined");
}
async function vt(e) {
  F && F.readyState === WebSocket.OPEN ? (F.send(JSON.stringify({ message: St(e) })), console.log("📤 訊息已發送:", e)) : console.error(e ? "❌ WebSocket 尚未連線" : "❌ 訊息發送失敗: " + e);
}
async function kt(e) {
  const t = e.id;
  if (!t) throw new Error("visitorId is required when tracking");
  tt = Date.now(), console.log("sendPageView init"), it(t, "init"), window.addEventListener("beforeunload", () => {
    console.log("beforeunload"), it(t, "beforeunload");
  });
}
function it(e, t) {
  const n = Date.now(), i = Math.round((n - tt) / 1e3);
  Z.push({
    type: "pageView",
    createAt: (/* @__PURE__ */ new Date()).toISOString(),
    details: {
      url: window.location.href,
      // referrer: document.referrer,
      duration: i,
      viewType: t
    }
  }), vt({ visitorId: e, eventLogs: Z }), Z.length = 0, tt = Date.now();
}
const Ct = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), Tt = async () => {
  const e = await Ft();
  return await (await (await Ot(e)).json()).data;
}, Ft = async () => {
  const e = [
    new gt(),
    new wt(),
    new X(),
    new Y(),
    new pt(),
    new yt(),
    new mt(),
    new bt()
  ], t = [], n = {}, i = {};
  for (const s of e) {
    const f = await Ct(s);
    await m(f, "audio", "audio", n), await m(f, "canvas", "image", n), await m(f, "color gamut", "colorGamut", n), await m(f, "hdr", "hdr", n), await m(
      f,
      "hardware concurrency",
      "hardwareConcurrency",
      n
    ), await m(f, "languages", "languages", n), await m(f, "screen resolution", "screenResolution", n), await m(f, "timezone", "timezone", n), f != null && f.fingerprint && t.push(f.fingerprint);
  }
  const r = await xt();
  return r && await At(i, t, r), {
    id: await w(JSON.stringify(t)),
    ip: (r == null ? void 0 : r.ip) || !1,
    useragent: (r == null ? void 0 : r.headers["user-agent"]) || !1,
    headers: (r == null ? void 0 : r.headers) || !1,
    rawData: n,
    serverFeature: i
  };
};
function m(e, t, n, i) {
  var r;
  (r = e == null ? void 0 : e.info) != null && r[n] && (i[t] = {
    hash: e.fingerprint,
    value: e.info[n]
  });
}
async function At(e, t, n) {
  if (n != null && n.ip) {
    const i = await w(n.ip);
    e["client ip"] = {
      hash: i,
      value: n.ip
    }, t.push(i);
  }
}
async function xt() {
  try {
    const t = await (await fetch(`${rt}/api/fingerprint`)).json();
    if (!t)
      throw new Error("failed to get user request info");
    return t.serverData;
  } catch (e) {
    console.error("failed to get user request info", e);
  }
}
async function Ot(e) {
  return fetch(`${rt}/api/fingerprint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  });
}
export {
  Tt as fpPromise,
  kt as tracking
};
