var at = Object.defineProperty;
var X = (n) => {
  throw TypeError(n);
};
var et = (n, t, a) => t in n ? at(n, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : n[t] = a;
var h = (n, t, a) => et(n, typeof t != "symbol" ? t + "" : t, a), P = (n, t, a) => t.has(n) || X("Cannot " + a);
var e = (n, t, a) => (P(n, t, "read from private field"), a ? a.call(n) : t.get(n)), u = (n, t, a) => t.has(n) ? X("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, a), f = (n, t, a, r) => (P(n, t, "write to private field"), r ? r.call(n, a) : t.set(n, a), a), Q = (n, t, a) => (P(n, t, "access private method"), a);
function m(n) {
  function t(o, d) {
    return o >>> d | o << 32 - d;
  }
  const a = new TextEncoder().encode(n), r = Array.from(a), s = [
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
  ], l = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], T = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const B = new Array(8).fill(0);
  for (let o = 0; o < 8; o++)
    B[7 - o] = T >>> o * 8 & 255;
  r.push(...B);
  const z = [];
  for (let o = 0; o < r.length; o += 64)
    z.push(r.slice(o, o + 64));
  return z.forEach((o) => {
    const d = new Array(64);
    for (let i = 0; i < 16; i++)
      d[i] = o[i * 4] << 24 | o[i * 4 + 1] << 16 | o[i * 4 + 2] << 8 | o[i * 4 + 3];
    for (let i = 16; i < 64; i++) {
      const J = t(d[i - 15], 7) ^ t(d[i - 15], 18) ^ d[i - 15] >>> 3, N = t(d[i - 2], 17) ^ t(d[i - 2], 19) ^ d[i - 2] >>> 10;
      d[i] = d[i - 16] + J + d[i - 7] + N | 0;
    }
    let [g, L, D, j, p, U, k, G] = l;
    for (let i = 0; i < 64; i++) {
      const J = t(p, 6) ^ t(p, 11) ^ t(p, 25), N = p & U ^ ~p & k, W = G + J + N + s[i] + d[i] | 0, _ = t(g, 2) ^ t(g, 13) ^ t(g, 22), tt = g & L ^ g & D ^ L & D, nt = _ + tt | 0;
      G = k, k = U, U = p, p = j + W | 0, j = D, D = L, L = g, g = W + nt | 0;
    }
    l[0] = l[0] + g | 0, l[1] = l[1] + L | 0, l[2] = l[2] + D | 0, l[3] = l[3] + j | 0, l[4] = l[4] + p | 0, l[5] = l[5] + U | 0, l[6] = l[6] + k | 0, l[7] = l[7] + G | 0;
  }), l.map((o) => (o >>> 0).toString(16).padStart(8, "0")).join("");
}
var y, O, H, S, Y, Z;
class rt {
  constructor() {
    u(this, S);
    h(this, "name", "Audio Feature");
    h(this, "enabled", !0);
    u(this, y, null);
    u(this, O, null);
    u(this, H, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (f(this, y, new t(1, e(this, H), 44100)), e(this, y) !== null) : !1;
  }
  async data() {
    if (e(this, y) === null) return null;
    const t = await Q(this, S, Y).call(this, e(this, y));
    return t === null ? null : (f(this, O, t.toString()), {
      fingerprint: await m(e(this, O)),
      info: {
        audio: t
      }
    });
  }
}
y = new WeakMap(), O = new WeakMap(), H = new WeakMap(), S = new WeakSet(), Y = function(t) {
  return new Promise((a) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const s = t.createDynamicsCompressor();
    s.threshold.value = -50, s.knee.value = 40, s.ratio.value = 12, s.attack.value = 0, s.release.value = 0.2, r.connect(s), s.connect(t.destination), r.start(), t.oncomplete = (l) => {
      const T = l.renderedBuffer.getChannelData(0), B = Q(this, S, Z).call(this, T);
      a(B);
    }, t.startRendering();
  });
}, Z = function(t) {
  let a = 0;
  for (let r = 0; r < t.length; ++r)
    a += Math.abs(t[r]);
  return a;
};
var c, b;
class it {
  constructor() {
    h(this, "name", "Canvas Feature");
    h(this, "enabled", !0);
    u(this, c, null);
    u(this, b, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (f(this, c, document.createElement("canvas").getContext("2d")), e(this, c) !== null) : !1;
  }
  async data() {
    return e(this, c) === null ? null : (e(this, c).textBaseline = "top", e(this, c).font = "14px 'Arial'", e(this, c).textBaseline = "alphabetic", e(this, c).fillStyle = "#f60", e(this, c).fillRect(100, 1, 55, 20), e(this, c).fillStyle = "#069", e(this, c).fillText("Cyber Universe Canvas", 2, 15), e(this, c).fillStyle = "rgba(102, 204, 0, 0.7)", e(this, c).fillText("Cyber Universe Canvas", 4, 17), f(this, b, e(this, c).canvas.toDataURL()), {
      fingerprint: await m(e(this, b)),
      info: {
        image: e(this, b)
      }
    });
  }
}
c = new WeakMap(), b = new WeakMap();
var C, R;
const I = class I {
  constructor() {
    h(this, "name", "ColorGamut Feature");
    h(this, "enabled", !0);
    u(this, C, null);
    u(this, R, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of I.gamutList) {
      const a = `(color-gamut: ${t})`;
      if (matchMedia(a).matches) {
        f(this, C, `gamut: ${t}`), f(this, R, t);
        break;
      }
    }
    return e(this, C) === null ? null : {
      fingerprint: await m(e(this, C)),
      info: {
        colorGamut: e(this, R)
      }
    };
  }
};
C = new WeakMap(), R = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
h(I, "gamutList", ["rec2020", "p3", "srgb"]);
let q = I;
var A, V, $;
class st {
  constructor() {
    h(this, "name", "Hardware Concurrency Feature");
    h(this, "enabled", !0);
    u(this, A, null);
    u(this, V, null);
    u(this, $, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (f(this, A, navigator.hardwareConcurrency.toString()), f(this, $, navigator.hardwareConcurrency)), e(this, A) ? (f(this, V, "hardware concurrency: " + e(this, A)), {
      fingerprint: await m(e(this, V)),
      info: {
        hardwareConcurrency: e(this, $)
      }
    }) : null;
  }
}
A = new WeakMap(), V = new WeakMap(), $ = new WeakMap();
var F, E;
const M = class M {
  constructor() {
    h(this, "name", "HDR Feature");
    h(this, "enabled", !0);
    u(this, F, null);
    u(this, E, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of M.hdrList) {
      const a = `(dynamic-range: ${t})`;
      if (matchMedia(a).matches) {
        f(this, F, `dynamic-range: ${t}`), f(this, E, t);
        break;
      }
    }
    return e(this, F) === null ? null : {
      fingerprint: await m(e(this, F)),
      info: {
        hdr: e(this, E)
      }
    };
  }
};
F = new WeakMap(), E = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
h(M, "hdrList", ["high", "standard"]);
let K = M;
var w, x;
class lt {
  constructor() {
    h(this, "name", "Languages Feature");
    h(this, "enabled", !0);
    u(this, w, []);
    u(this, x, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && e(this, w).push([navigator.language]), Array.isArray(navigator.languages) && e(this, w).push(navigator.languages), (t = e(this, w)) != null && t.length ? (f(this, x, JSON.stringify(e(this, w))), {
      fingerprint: await m(e(this, x)),
      info: {
        languages: e(this, x)
      }
    }) : null;
  }
}
w = new WeakMap(), x = new WeakMap();
const ot = async (n) => n.enabled ? await n.support() ? await n.data() : (console.log(`Feature ${n.name} is not supported`), null) : (console.log(`Feature ${n.name} is disabled`), null), ht = async () => await ut(), ut = async () => {
  const n = [
    new rt(),
    new it(),
    new q(),
    new K(),
    new st(),
    new lt()
  ], t = [], a = {};
  for (const r of n) {
    const s = await ot(r);
    v(a, s, "audio", "audio"), v(a, s, "canvas", "image"), v(a, s, "color gamut", "colorGamut"), v(a, s, "hdr", "hdr"), v(a, s, "hardware concurrency", "hardwareConcurrency"), v(a, s, "languages", "languages"), t.push((s == null ? void 0 : s.fingerprint) || "");
  }
  return {
    id: await m(JSON.stringify(t)),
    useragent: navigator.userAgent,
    rawData: a
  };
}, v = (n, t, a, r) => {
  var s;
  (s = t == null ? void 0 : t.info) != null && s[r] && (n[a] = {
    hash: t.fingerprint,
    value: t.info[r]
  });
};
export {
  ht as fpPromise
};
