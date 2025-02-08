var it = Object.defineProperty;
var Y = (n) => {
  throw TypeError(n);
};
var st = (n, t, e) => t in n ? it(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var c = (n, t, e) => st(n, typeof t != "symbol" ? t + "" : t, e), q = (n, t, e) => t.has(n) || Y("Cannot " + e);
var a = (n, t, e) => (q(n, t, "read from private field"), e ? e.call(n) : t.get(n)), u = (n, t, e) => t.has(n) ? Y("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), f = (n, t, e, r) => (q(n, t, "write to private field"), r ? r.call(n, e) : t.set(n, e), e), U = (n, t, e) => (q(n, t, "access private method"), e);
function y(n) {
  function t(l, d) {
    return l >>> d | l << 32 - d;
  }
  const e = new TextEncoder().encode(n), r = Array.from(e), i = [
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
  ], o = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], G = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const V = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    V[7 - l] = G >>> l * 8 & 255;
  r.push(...V);
  const W = [];
  for (let l = 0; l < r.length; l += 64)
    W.push(r.slice(l, l + 64));
  return W.forEach((l) => {
    const d = new Array(64);
    for (let s = 0; s < 16; s++)
      d[s] = l[s * 4] << 24 | l[s * 4 + 1] << 16 | l[s * 4 + 2] << 8 | l[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const P = t(d[s - 15], 7) ^ t(d[s - 15], 18) ^ d[s - 15] >>> 3, Q = t(d[s - 2], 17) ^ t(d[s - 2], 19) ^ d[s - 2] >>> 10;
      d[s] = d[s - 16] + P + d[s - 7] + Q | 0;
    }
    let [g, T, D, J, p, E, I, N] = o;
    for (let s = 0; s < 64; s++) {
      const P = t(p, 6) ^ t(p, 11) ^ t(p, 25), Q = p & E ^ ~p & I, X = N + P + Q + i[s] + d[s] | 0, nt = t(g, 2) ^ t(g, 13) ^ t(g, 22), at = g & T ^ g & D ^ T & D, rt = nt + at | 0;
      N = I, I = E, E = p, p = J + X | 0, J = D, D = T, T = g, g = X + rt | 0;
    }
    o[0] = o[0] + g | 0, o[1] = o[1] + T | 0, o[2] = o[2] + D | 0, o[3] = o[3] + J | 0, o[4] = o[4] + p | 0, o[5] = o[5] + E | 0, o[6] = o[6] + I | 0, o[7] = o[7] + N | 0;
  }), o.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var v, O, B, L, _, tt;
class ot {
  constructor() {
    u(this, L);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    u(this, v, null);
    u(this, O, null);
    u(this, B, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (f(this, v, new t(1, a(this, B), 44100)), a(this, v) !== null) : !1;
  }
  async data() {
    if (a(this, v) === null) return null;
    const t = await U(this, L, _).call(this, a(this, v));
    return t === null ? null : (f(this, O, t.toString()), {
      fingerprint: await y(a(this, O)),
      info: {
        audio: t
      }
    });
  }
}
v = new WeakMap(), O = new WeakMap(), B = new WeakMap(), L = new WeakSet(), _ = function(t) {
  return new Promise((e) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const i = t.createDynamicsCompressor();
    i.threshold.value = -50, i.knee.value = 40, i.ratio.value = 12, i.attack.value = 0, i.release.value = 0.2, r.connect(i), i.connect(t.destination), r.start(), t.oncomplete = (o) => {
      const G = o.renderedBuffer.getChannelData(0), V = U(this, L, tt).call(this, G);
      e(V);
    }, t.startRendering();
  });
}, tt = function(t) {
  let e = 0;
  for (let r = 0; r < t.length; ++r)
    e += Math.abs(t[r]);
  return e;
};
var h, C;
class lt {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    u(this, h, null);
    u(this, C, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (f(this, h, document.createElement("canvas").getContext("2d")), a(this, h) !== null) : !1;
  }
  async data() {
    return a(this, h) === null ? null : (a(this, h).textBaseline = "top", a(this, h).font = "14px 'Arial'", a(this, h).textBaseline = "alphabetic", a(this, h).fillStyle = "#f60", a(this, h).fillRect(100, 1, 55, 20), a(this, h).fillStyle = "#069", a(this, h).fillText("Cyber Universe Canvas", 2, 15), a(this, h).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, h).fillText("Cyber Universe Canvas", 4, 17), f(this, C, a(this, h).canvas.toDataURL()), {
      fingerprint: await y(a(this, C)),
      info: {
        image: a(this, C)
      }
    });
  }
}
h = new WeakMap(), C = new WeakMap();
var F, $;
const k = class k {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    u(this, F, null);
    u(this, $, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of k.gamutList) {
      const e = `(color-gamut: ${t})`;
      if (matchMedia(e).matches) {
        f(this, F, `gamut: ${t}`), f(this, $, t);
        break;
      }
    }
    return a(this, F) === null ? null : {
      fingerprint: await y(a(this, F)),
      info: {
        colorGamut: a(this, $)
      }
    };
  }
};
F = new WeakMap(), $ = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(k, "gamutList", ["rec2020", "p3", "srgb"]);
let K = k;
var A, z, M;
class ut {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    u(this, A, null);
    u(this, z, null);
    u(this, M, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (f(this, A, navigator.hardwareConcurrency.toString()), f(this, M, navigator.hardwareConcurrency)), a(this, A) ? (f(this, z, "hardware concurrency: " + a(this, A)), {
      fingerprint: await y(a(this, z)),
      info: {
        hardwareConcurrency: a(this, M)
      }
    }) : null;
  }
}
A = new WeakMap(), z = new WeakMap(), M = new WeakMap();
var S, R;
const H = class H {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    u(this, S, null);
    u(this, R, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of H.hdrList) {
      const e = `(dynamic-range: ${t})`;
      if (matchMedia(e).matches) {
        f(this, S, `dynamic-range: ${t}`), f(this, R, t);
        break;
      }
    }
    return a(this, S) === null ? null : {
      fingerprint: await y(a(this, S)),
      info: {
        hdr: a(this, R)
      }
    };
  }
};
S = new WeakMap(), R = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(H, "hdrList", ["high", "standard"]);
let Z = H;
var b, x;
class ct {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    u(this, b, []);
    u(this, x, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && a(this, b).push([navigator.language]), Array.isArray(navigator.languages) && a(this, b).push(navigator.languages), (t = a(this, b)) != null && t.length ? (f(this, x, JSON.stringify(a(this, b))), {
      fingerprint: await y(a(this, x)),
      info: {
        languages: a(this, x)
      }
    }) : null;
  }
}
b = new WeakMap(), x = new WeakMap();
var m, j, et;
class ht {
  constructor() {
    u(this, j);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    u(this, m, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      f(this, m, t);
    } else
      f(this, m, U(this, j, et).call(this));
    return a(this, m) === null ? null : {
      fingerprint: await y(a(this, m)),
      info: {
        timezone: a(this, m)
      }
    };
  }
}
m = new WeakMap(), j = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
et = function() {
  const e = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), r = e >= 0 ? "+" : "-", i = Math.floor(Math.abs(e) / 60).toString().padStart(2, "0"), o = (Math.abs(e) % 60).toString().padStart(2, "0");
  return `UTC${r}${i}:${o}`;
};
const ft = async (n) => n.enabled ? await n.support() ? await n.data() : (console.log(`Feature ${n.name} is not supported`), null) : (console.log(`Feature ${n.name} is disabled`), null), pt = async () => await dt(), dt = async () => {
  const n = [
    new ot(),
    new lt(),
    new K(),
    new Z(),
    new ut(),
    new ct(),
    new ht()
  ], t = [], e = {};
  for (const r of n) {
    const i = await ft(r);
    w(e, i, "audio", "audio"), w(e, i, "canvas", "image"), w(e, i, "color gamut", "colorGamut"), w(e, i, "hdr", "hdr"), w(e, i, "hardware concurrency", "hardwareConcurrency"), w(e, i, "languages", "languages"), w(e, i, "timezone", "timezone"), t.push((i == null ? void 0 : i.fingerprint) || "");
  }
  return {
    id: await y(JSON.stringify(t)),
    useragent: navigator.userAgent,
    rawData: e
  };
}, w = (n, t, e, r) => {
  var i;
  (i = t == null ? void 0 : t.info) != null && i[r] && (n[e] = {
    hash: t.fingerprint,
    value: t.info[r]
  });
};
export {
  pt as fpPromise
};
