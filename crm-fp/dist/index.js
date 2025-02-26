var ht = Object.defineProperty;
var at = (e) => {
  throw TypeError(e);
};
var ft = (e, t, n) => t in e ? ht(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => ft(e, typeof t != "symbol" ? t + "" : t, n), K = (e, t, n) => t.has(e) || at("Cannot " + n);
var a = (e, t, n) => (K(e, t, "read from private field"), n ? n.call(e) : t.get(e)), u = (e, t, n) => t.has(e) ? at("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), h = (e, t, n, i) => (K(e, t, "write to private field"), i ? i.call(e, n) : t.set(e, n), n), U = (e, t, n) => (K(e, t, "access private method"), n);
const tt = "http://192.168.0.73:5173";
function p(e) {
  function t(l, g) {
    return l >>> g | l << 32 - g;
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
  const D = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    D[7 - l] = f >>> l * 8 & 255;
  i.push(...D);
  const et = [];
  for (let l = 0; l < i.length; l += 64)
    et.push(i.slice(l, l + 64));
  return et.forEach((l) => {
    const g = new Array(64);
    for (let o = 0; o < 16; o++)
      g[o] = l[o * 4] << 24 | l[o * 4 + 1] << 16 | l[o * 4 + 2] << 8 | l[o * 4 + 3];
    for (let o = 16; o < 64; o++) {
      const H = t(g[o - 15], 7) ^ t(g[o - 15], 18) ^ g[o - 15] >>> 3, Q = t(g[o - 2], 17) ^ t(g[o - 2], 19) ^ g[o - 2] >>> 10;
      g[o] = g[o - 16] + H + g[o - 7] + Q | 0;
    }
    let [w, L, V, _, y, M, P, G] = s;
    for (let o = 0; o < 64; o++) {
      const H = t(y, 6) ^ t(y, 11) ^ t(y, 25), Q = y & M ^ ~y & P, nt = G + H + Q + r[o] + g[o] | 0, ut = t(w, 2) ^ t(w, 13) ^ t(w, 22), lt = w & L ^ w & V ^ L & V, ct = ut + lt | 0;
      G = P, P = M, M = y, y = _ + nt | 0, _ = V, V = L, L = w, w = nt + ct | 0;
    }
    s[0] = s[0] + w | 0, s[1] = s[1] + L | 0, s[2] = s[2] + V | 0, s[3] = s[3] + _ | 0, s[4] = s[4] + y | 0, s[5] = s[5] + M | 0, s[6] = s[6] + P | 0, s[7] = s[7] + G | 0;
  }), s.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var C, $, q, O, rt, st;
class dt {
  constructor() {
    u(this, O);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    u(this, C, null);
    u(this, $, null);
    u(this, q, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (h(this, C, new t(1, a(this, q), 44100)), a(this, C) !== null) : !1;
  }
  async data() {
    if (a(this, C) === null) return null;
    const t = await U(this, O, rt).call(this, a(this, C));
    return t === null ? null : (h(this, $, t.toString()), {
      fingerprint: await p(a(this, $)),
      info: {
        audio: t
      }
    });
  }
}
C = new WeakMap(), $ = new WeakMap(), q = new WeakMap(), O = new WeakSet(), rt = function(t) {
  return new Promise((n) => {
    const i = t.createOscillator();
    i.type = "triangle", i.frequency.value = 1e4;
    const r = t.createDynamicsCompressor();
    r.threshold.value = -50, r.knee.value = 40, r.ratio.value = 12, r.attack.value = 0, r.release.value = 0.2, i.connect(r), r.connect(t.destination), i.start(), t.oncomplete = (s) => {
      const f = s.renderedBuffer.getChannelData(0), D = U(this, O, st).call(this, f);
      n(D);
    }, t.startRendering();
  });
}, st = function(t) {
  let n = 0;
  for (let i = 0; i < t.length; ++i)
    n += Math.abs(t[i]);
  return n;
};
var d, F;
class gt {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    u(this, d, null);
    u(this, F, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (h(this, d, document.createElement("canvas").getContext("2d")), a(this, d) !== null) : !1;
  }
  async data() {
    return a(this, d) === null ? null : (a(this, d).textBaseline = "top", a(this, d).font = "14px 'Arial'", a(this, d).textBaseline = "alphabetic", a(this, d).fillStyle = "#f60", a(this, d).fillRect(100, 1, 55, 20), a(this, d).fillStyle = "#069", a(this, d).fillText("Cyber Universe Canvas", 2, 15), a(this, d).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, d).fillText("Cyber Universe Canvas", 4, 17), h(this, F, a(this, d).canvas.toDataURL()), {
      fingerprint: await p(a(this, F)),
      info: {
        image: a(this, F)
      }
    });
  }
}
d = new WeakMap(), F = new WeakMap();
var A, E;
const B = class B {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    u(this, A, null);
    u(this, E, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of B.gamutList) {
      const n = `(color-gamut: ${t})`;
      if (matchMedia(n).matches) {
        h(this, A, `gamut: ${t}`), h(this, E, t);
        break;
      }
    }
    return a(this, A) === null ? null : {
      fingerprint: await p(a(this, A)),
      info: {
        colorGamut: a(this, E)
      }
    };
  }
};
A = new WeakMap(), E = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(B, "gamutList", ["rec2020", "p3", "srgb"]);
let W = B;
var x, k, I;
class pt {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    u(this, x, null);
    u(this, k, null);
    u(this, I, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, x, navigator.hardwareConcurrency.toString()), h(this, I, navigator.hardwareConcurrency)), a(this, x) ? (h(this, k, "hardware concurrency: " + a(this, x)), {
      fingerprint: await p(a(this, k)),
      info: {
        hardwareConcurrency: a(this, I)
      }
    }) : null;
  }
}
x = new WeakMap(), k = new WeakMap(), I = new WeakMap();
var R, j;
const J = class J {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    u(this, R, null);
    u(this, j, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of J.hdrList) {
      const n = `(dynamic-range: ${t})`;
      if (matchMedia(n).matches) {
        h(this, R, `dynamic-range: ${t}`), h(this, j, t);
        break;
      }
    }
    return a(this, R) === null ? null : {
      fingerprint: await p(a(this, R)),
      info: {
        hdr: a(this, j)
      }
    };
  }
};
R = new WeakMap(), j = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(J, "hdrList", ["high", "standard"]);
let X = J;
var v, T;
class wt {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    u(this, v, []);
    u(this, T, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && a(this, v).push([navigator.language]), Array.isArray(navigator.languages) && a(this, v).push(navigator.languages), (t = a(this, v)) != null && t.length ? (h(this, T, JSON.stringify(a(this, v))), {
      fingerprint: await p(a(this, T)),
      info: {
        languages: a(this, T)
      }
    }) : null;
  }
}
v = new WeakMap(), T = new WeakMap();
var b, z;
class yt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    u(this, b, null);
    u(this, z, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const n = window.screen;
    return n ? (h(this, b, n), a(this, b) !== null) : !1;
  }
  async data() {
    if (a(this, b) === null) return null;
    const t = `${a(this, b).width} x ${a(this, b).height}`;
    return h(this, z, t), {
      fingerprint: await p(a(this, z)),
      info: {
        screenResolution: t
      }
    };
  }
}
b = new WeakMap(), z = new WeakMap();
var S, N, ot;
class mt {
  constructor() {
    u(this, N);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    u(this, S, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      h(this, S, t);
    } else
      h(this, S, U(this, N, ot).call(this));
    return a(this, S) === null ? null : {
      fingerprint: await p(a(this, S)),
      info: {
        timezone: a(this, S)
      }
    };
  }
}
S = new WeakMap(), N = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
ot = function() {
  const n = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), i = n >= 0 ? "+" : "-", r = Math.floor(Math.abs(n) / 60).toString().padStart(2, "0"), s = (Math.abs(n) % 60).toString().padStart(2, "0");
  return `UTC${i}${r}:${s}`;
};
let Y;
const Z = [];
function bt(e) {
  if (window.pako)
    return window.pako.deflate(JSON.stringify(e));
  throw new Error("pako is not defined");
}
async function Tt(e) {
  const t = e.id;
  if (!t) throw new Error("visitorId is required when tracking");
  Y = Date.now(), console.log("sendPageView init"), it(t, "init"), window.addEventListener("beforeunload", () => {
    console.log("beforeunload"), it(t, "beforeunload");
  });
}
function it(e, t) {
  const n = Date.now(), i = Math.round((n - Y) / 1e3);
  Z.push({
    type: "pageView",
    createAt: (/* @__PURE__ */ new Date()).toISOString(),
    details: {
      url: window.location.href,
      // referrer: document.referrer,
      duration: i,
      viewType: t
    }
  }), St({ visitorId: e, eventLogs: Z }), Z.length = 0, Y = Date.now();
}
async function St(e, t = "projects/seo-manager-429705/topics/fp-test") {
  try {
    const i = await (await fetch(`${tt}/api/pubsub/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic_name_or_id: t, message: bt(e) })
    })).json();
    return console.log("getLogRes", i), i;
  } catch (n) {
    console.error("Error sending logs:", n);
  }
}
const Ct = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), Ot = async () => {
  const e = await vt();
  return await (await (await xt(e)).json()).data;
}, vt = async () => {
  const e = [
    new dt(),
    new gt(),
    new W(),
    new X(),
    new pt(),
    new wt(),
    new yt(),
    new mt()
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
  const r = await At();
  return r && await Ft(i, t, r), {
    id: await p(JSON.stringify(t)),
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
async function Ft(e, t, n) {
  if (n != null && n.ip) {
    const i = await p(n.ip);
    e["client ip"] = {
      hash: i,
      value: n.ip
    }, t.push(i);
  }
}
async function At() {
  try {
    const t = await (await fetch(`${tt}/api/fingerprint`)).json();
    if (!t)
      throw new Error("failed to get user request info");
    return t.serverData;
  } catch (e) {
    console.error("failed to get user request info", e);
  }
}
async function xt(e) {
  return fetch(`${tt}/api/fingerprint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  });
}
export {
  Ot as fpPromise,
  Tt as tracking
};
