var lt = Object.defineProperty;
var _ = (e) => {
  throw TypeError(e);
};
var ot = (e, t, a) => t in e ? lt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var u = (e, t, a) => ot(e, typeof t != "symbol" ? t + "" : t, a), G = (e, t, a) => t.has(e) || _("Cannot " + a);
var n = (e, t, a) => (G(e, t, "read from private field"), a ? a.call(e) : t.get(e)), l = (e, t, a) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), c = (e, t, a, r) => (G(e, t, "write to private field"), r ? r.call(e, a) : t.set(e, a), a), k = (e, t, a) => (G(e, t, "access private method"), a);
function p(e) {
  function t(o, d) {
    return o >>> d | o << 32 - d;
  }
  const a = new TextEncoder().encode(e), r = Array.from(a), f = [
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
  ], i = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], g = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const F = new Array(8).fill(0);
  for (let o = 0; o < 8; o++)
    F[7 - o] = g >>> o * 8 & 255;
  r.push(...F);
  const z = [];
  for (let o = 0; o < r.length; o += 64)
    z.push(r.slice(o, o + 64));
  return z.forEach((o) => {
    const d = new Array(64);
    for (let s = 0; s < 16; s++)
      d[s] = o[s * 4] << 24 | o[s * 4 + 1] << 16 | o[s * 4 + 2] << 8 | o[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const Q = t(d[s - 15], 7) ^ t(d[s - 15], 18) ^ d[s - 15] >>> 3, Z = t(d[s - 2], 17) ^ t(d[s - 2], 19) ^ d[s - 2] >>> 10;
      d[s] = d[s - 16] + Q + d[s - 7] + Z | 0;
    }
    let [w, T, R, J, y, B, I, K] = i;
    for (let s = 0; s < 64; s++) {
      const Q = t(y, 6) ^ t(y, 11) ^ t(y, 25), Z = y & B ^ ~y & I, Y = K + Q + Z + f[s] + d[s] | 0, rt = t(w, 2) ^ t(w, 13) ^ t(w, 22), it = w & T ^ w & R ^ T & R, st = rt + it | 0;
      K = I, I = B, B = y, y = J + Y | 0, J = R, R = T, T = w, w = Y + st | 0;
    }
    i[0] = i[0] + w | 0, i[1] = i[1] + T | 0, i[2] = i[2] + R | 0, i[3] = i[3] + J | 0, i[4] = i[4] + y | 0, i[5] = i[5] + B | 0, i[6] = i[6] + I | 0, i[7] = i[7] + K | 0;
  }), i.map((o) => (o >>> 0).toString(16).padStart(8, "0")).join("");
}
const tt = "http://localhost:3000";
async function ut() {
  try {
    const t = await (await fetch(`${tt}/api/fingerprint`)).json();
    if (!t) throw new Error("failed to get user request info");
    return t.serverData;
  } catch (e) {
    console.error("failed to get user request info", e);
  }
}
async function ct(e) {
  return fetch(`${tt}/api/fingerprint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  });
}
var b, D, q, L, et, nt;
class ht {
  constructor() {
    l(this, L);
    u(this, "name", "Audio Feature");
    u(this, "enabled", !0);
    l(this, b, null);
    l(this, D, null);
    l(this, q, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (c(this, b, new t(1, n(this, q), 44100)), n(this, b) !== null) : !1;
  }
  async data() {
    if (n(this, b) === null) return null;
    const t = await k(this, L, et).call(this, n(this, b));
    return t === null ? null : (c(this, D, t.toString()), {
      fingerprint: await p(n(this, D)),
      value: t
    });
  }
}
b = new WeakMap(), D = new WeakMap(), q = new WeakMap(), L = new WeakSet(), et = function(t) {
  return new Promise((a) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const f = t.createDynamicsCompressor();
    f.threshold.value = -50, f.knee.value = 40, f.ratio.value = 12, f.attack.value = 0, f.release.value = 0.2, r.connect(f), f.connect(t.destination), r.start(), t.oncomplete = (i) => {
      const g = i.renderedBuffer.getChannelData(0), F = k(this, L, nt).call(this, g);
      a(F);
    }, t.startRendering();
  });
}, nt = function(t) {
  let a = 0;
  for (let r = 0; r < t.length; ++r)
    a += Math.abs(t[r]);
  return a;
};
var h, S;
class ft {
  constructor() {
    u(this, "name", "Canvas Feature");
    u(this, "enabled", !0);
    l(this, h, null);
    l(this, S, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (c(this, h, document.createElement("canvas").getContext("2d")), n(this, h) !== null) : !1;
  }
  async data() {
    return n(this, h) === null ? null : (n(this, h).textBaseline = "top", n(this, h).font = "14px 'Arial'", n(this, h).textBaseline = "alphabetic", n(this, h).fillStyle = "#f60", n(this, h).fillRect(100, 1, 55, 20), n(this, h).fillStyle = "#069", n(this, h).fillText("Cyber Universe Canvas", 2, 15), n(this, h).fillStyle = "rgba(102, 204, 0, 0.7)", n(this, h).fillText("Cyber Universe Canvas", 4, 17), c(this, S, n(this, h).canvas.toDataURL()), {
      fingerprint: await p(n(this, S)),
      value: {
        image: n(this, S)
      }
    });
  }
}
h = new WeakMap(), S = new WeakMap();
var A, E;
const N = class N {
  constructor() {
    u(this, "name", "Color Gamut Feature");
    u(this, "enabled", !0);
    l(this, A, null);
    l(this, E, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of N.gamutList) {
      const a = `(color-gamut: ${t})`;
      if (matchMedia(a).matches) {
        c(this, A, `gamut: ${t}`), c(this, E, t);
        break;
      }
    }
    return n(this, A) === null ? null : {
      fingerprint: await p(n(this, A)),
      value: n(this, E)
    };
  }
};
A = new WeakMap(), E = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
u(N, "gamutList", ["rec2020", "p3", "srgb"]);
let W = N;
var x, U;
const P = class P {
  constructor() {
    u(this, "name", "HDR Feature");
    u(this, "enabled", !0);
    l(this, x, null);
    l(this, U, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of P.hdrList) {
      const a = `(dynamic-range: ${t})`;
      if (matchMedia(a).matches) {
        c(this, x, `dynamic-range: ${t}`), c(this, U, t);
        break;
      }
    }
    return n(this, x) === null ? null : {
      fingerprint: await p(n(this, x)),
      value: n(this, U)
    };
  }
};
x = new WeakMap(), U = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
u(P, "hdrList", ["high", "standard"]);
let X = P;
var $, V, M;
class dt {
  constructor() {
    u(this, "name", "Hardware Concurrency Feature");
    u(this, "enabled", !0);
    l(this, $, null);
    l(this, V, null);
    l(this, M, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (c(this, $, navigator.hardwareConcurrency.toString()), c(this, M, navigator.hardwareConcurrency)), n(this, $) ? (c(this, V, "hardware concurrency: " + n(this, $)), {
      fingerprint: await p(n(this, V)),
      value: n(this, M)
    }) : null;
  }
}
$ = new WeakMap(), V = new WeakMap(), M = new WeakMap();
var C, O;
class pt {
  constructor() {
    u(this, "name", "Languages Feature");
    u(this, "enabled", !0);
    l(this, C, []);
    l(this, O, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && n(this, C).push([navigator.language]), Array.isArray(navigator.languages) && n(this, C).push(navigator.languages), (t = n(this, C)) != null && t.length ? (c(this, O, JSON.stringify(n(this, C))), {
      fingerprint: await p(n(this, O)),
      value: n(this, O)
    }) : null;
  }
}
C = new WeakMap(), O = new WeakMap();
var m, j;
class gt {
  constructor() {
    u(this, "name", "Screen Resolution Feature");
    u(this, "enabled", !0);
    l(this, m, null);
    l(this, j, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const a = window.screen;
    return a ? (c(this, m, a), n(this, m) !== null) : !1;
  }
  async data() {
    if (n(this, m) === null) return null;
    const t = `${n(this, m).width} x ${n(this, m).height}`;
    return c(this, j, t), {
      fingerprint: await p(n(this, j)),
      value: t
    };
  }
}
m = new WeakMap(), j = new WeakMap();
var v, H, at;
class wt {
  constructor() {
    l(this, H);
    u(this, "name", "Timezone Feature");
    u(this, "enabled", !0);
    l(this, v, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      c(this, v, t);
    } else
      c(this, v, k(this, H, at).call(this));
    return n(this, v) === null ? null : {
      fingerprint: await p(n(this, v)),
      value: n(this, v)
    };
  }
}
v = new WeakMap(), H = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
at = function() {
  const a = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), r = a >= 0 ? "+" : "-", f = Math.floor(Math.abs(a) / 60).toString().padStart(2, "0"), i = (Math.abs(a) % 60).toString().padStart(2, "0");
  return `UTC${r}${f}:${i}`;
};
const yt = [
  new ht(),
  new ft(),
  new W(),
  new X(),
  new dt(),
  new pt(),
  new gt(),
  new wt()
];
async function mt(e) {
  return e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null);
}
async function vt() {
  var f;
  const e = [], t = {}, a = {};
  for (const i of yt) {
    const g = await mt(i);
    if (!g) continue;
    const F = i.name.replace(/\s/g, "").replace(/Feature$/, "").replace(/^[A-Z]/, (z) => z.toLowerCase());
    t[F] = {
      hash: g.fingerprint,
      value: g.value
    }, e.push(g.fingerprint);
  }
  const r = await ut();
  if (r != null && r.ip) {
    const i = await p(r.ip);
    a.client_ip = { hash: i, value: r.ip }, e.push(i);
  }
  return {
    id: await p(JSON.stringify(e)),
    ip: (r == null ? void 0 : r.ip) || !1,
    useragent: ((f = r == null ? void 0 : r.headers) == null ? void 0 : f["user-agent"]) ?? !1,
    headers: (r == null ? void 0 : r.headers) ?? !1,
    rawData: t,
    serverFeature: a
  };
}
async function Ct() {
  const e = await vt();
  return (await (await ct(e)).json()).data;
}
export {
  vt as collectFingerprint,
  Ct as fpPromise
};
