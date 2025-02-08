var _ = Object.defineProperty;
var K = (n) => {
  throw TypeError(n);
};
var tt = (n, t, e) => t in n ? _(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var h = (n, t, e) => tt(n, typeof t != "symbol" ? t + "" : t, e), J = (n, t, e) => t.has(n) || K("Cannot " + e);
var a = (n, t, e) => (J(n, t, "read from private field"), e ? e.call(n) : t.get(n)), f = (n, t, e) => t.has(n) ? K("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), g = (n, t, e, s) => (J(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), N = (n, t, e) => (J(n, t, "access private method"), e);
function C(n) {
  function t(o, c) {
    return o >>> c | o << 32 - c;
  }
  const e = new TextEncoder().encode(n), s = Array.from(e), r = [
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
  ], I = s.length * 8;
  for (s.push(128); (s.length * 8 + 64) % 512 !== 0; )
    s.push(0);
  const $ = new Array(8).fill(0);
  for (let o = 0; o < 8; o++)
    $[7 - o] = I >>> o * 8 & 255;
  s.push(...$);
  const q = [];
  for (let o = 0; o < s.length; o += 64)
    q.push(s.slice(o, o + 64));
  return q.forEach((o) => {
    const c = new Array(64);
    for (let i = 0; i < 16; i++)
      c[i] = o[i * 4] << 24 | o[i * 4 + 1] << 16 | o[i * 4 + 2] << 8 | o[i * 4 + 3];
    for (let i = 16; i < 64; i++) {
      const j = t(c[i - 15], 7) ^ t(c[i - 15], 18) ^ c[i - 15] >>> 3, G = t(c[i - 2], 17) ^ t(c[i - 2], 19) ^ c[i - 2] >>> 10;
      c[i] = c[i - 16] + j + c[i - 7] + G | 0;
    }
    let [d, F, L, M, p, E, V, T] = l;
    for (let i = 0; i < 64; i++) {
      const j = t(p, 6) ^ t(p, 11) ^ t(p, 25), G = p & E ^ ~p & V, H = T + j + G + r[i] + c[i] | 0, X = t(d, 2) ^ t(d, 13) ^ t(d, 22), Y = d & F ^ d & L ^ F & L, Z = X + Y | 0;
      T = V, V = E, E = p, p = M + H | 0, M = L, L = F, F = d, d = H + Z | 0;
    }
    l[0] = l[0] + d | 0, l[1] = l[1] + F | 0, l[2] = l[2] + L | 0, l[3] = l[3] + M | 0, l[4] = l[4] + p | 0, l[5] = l[5] + E | 0, l[6] = l[6] + V | 0, l[7] = l[7] + T | 0;
  }), l.map((o) => (o >>> 0).toString(16).padStart(8, "0")).join("");
}
var m, D, B, x, z, W;
class nt {
  constructor() {
    f(this, x);
    h(this, "name", "Audio Feature");
    h(this, "enabled", !0);
    f(this, m, null);
    f(this, D, null);
    f(this, B, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (g(this, m, new t(1, a(this, B), 44100)), a(this, m) !== null) : !1;
  }
  async data() {
    if (a(this, m) === null) return null;
    const t = await N(this, x, z).call(this, a(this, m));
    return t === null ? null : (g(this, D, t.toString()), {
      fingerprint: await C(a(this, D)),
      info: {
        audio: t
      }
    });
  }
}
m = new WeakMap(), D = new WeakMap(), B = new WeakMap(), x = new WeakSet(), z = function(t) {
  return new Promise((e) => {
    const s = t.createOscillator();
    s.type = "triangle", s.frequency.value = 1e4;
    const r = t.createDynamicsCompressor();
    r.threshold.value = -50, r.knee.value = 40, r.ratio.value = 12, r.attack.value = 0, r.release.value = 0.2, s.connect(r), r.connect(t.destination), s.start(), t.oncomplete = (l) => {
      const I = l.renderedBuffer.getChannelData(0), $ = N(this, x, W).call(this, I);
      e($);
    }, t.startRendering();
  });
}, W = function(t) {
  let e = 0;
  for (let s = 0; s < t.length; ++s)
    e += Math.abs(t[s]);
  return e;
};
var u, y;
class et {
  constructor() {
    h(this, "name", "Canvas Feature");
    h(this, "enabled", !0);
    f(this, u, null);
    f(this, y, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (g(this, u, document.createElement("canvas").getContext("2d")), a(this, u) !== null) : !1;
  }
  async data() {
    return a(this, u) === null ? null : (a(this, u).textBaseline = "top", a(this, u).font = "14px 'Arial'", a(this, u).textBaseline = "alphabetic", a(this, u).fillStyle = "#f60", a(this, u).fillRect(100, 1, 55, 20), a(this, u).fillStyle = "#069", a(this, u).fillText("Cyber Universe Canvas", 2, 15), a(this, u).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, u).fillText("Cyber Universe Canvas", 4, 17), g(this, y, a(this, u).canvas.toDataURL()), {
      fingerprint: await C(a(this, y)),
      info: {
        image: a(this, y)
      }
    });
  }
}
u = new WeakMap(), y = new WeakMap();
var w, O;
const U = class U {
  constructor() {
    h(this, "name", "ColorGamut Feature");
    h(this, "enabled", !0);
    f(this, w, null);
    f(this, O, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of U.gamutList) {
      const e = `(color-gamut: ${t})`;
      if (matchMedia(e).matches) {
        g(this, w, `gamut: ${t}`), g(this, O, t);
        break;
      }
    }
    return a(this, w) === null ? null : {
      fingerprint: await C(a(this, w)),
      info: {
        colorGamut: a(this, O)
      }
    };
  }
};
w = new WeakMap(), O = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
h(U, "gamutList", ["rec2020", "p3", "srgb"]);
let P = U;
var v, R;
const k = class k {
  constructor() {
    h(this, "name", "HDR Feature");
    h(this, "enabled", !0);
    f(this, v, null);
    f(this, R, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of k.hdrList) {
      const e = `(dynamic-range: ${t})`;
      if (matchMedia(e).matches) {
        g(this, v, `dynamic-range: ${t}`), g(this, R, t);
        break;
      }
    }
    return a(this, v) === null ? null : {
      fingerprint: await C(a(this, v)),
      info: {
        hdr: a(this, R)
      }
    };
  }
};
v = new WeakMap(), R = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
h(k, "hdrList", ["high", "standard"]);
let Q = k;
var b, A;
class at {
  constructor() {
    h(this, "name", "Languages Feature");
    h(this, "enabled", !0);
    f(this, b, []);
    f(this, A, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.language && a(this, b).push([navigator.language]), Array.isArray(navigator.languages) && a(this, b).push(navigator.languages), g(this, A, JSON.stringify(a(this, b))), {
      fingerprint: await C(a(this, A)),
      info: {
        languages: a(this, A)
      }
    };
  }
}
b = new WeakMap(), A = new WeakMap();
const st = async (n) => n.enabled ? await n.support() ? await n.data() : (console.log(`Feature ${n.name} is not supported`), null) : (console.log(`Feature ${n.name} is disabled`), null), lt = async () => await it(), it = async () => {
  const n = [
    new et(),
    new nt(),
    new at(),
    new P(),
    new Q()
  ], t = [], e = {};
  for (const s of n) {
    const r = await st(s);
    S(e, r, "canvas", "image"), S(e, r, "audio", "audio"), S(e, r, "languages", "languages"), S(e, r, "color gamut", "colorGamut"), S(e, r, "hdr", "hdr"), t.push((r == null ? void 0 : r.fingerprint) || "");
  }
  return {
    id: await C(JSON.stringify(t)),
    useragent: navigator.userAgent,
    rawData: e
  };
}, S = (n, t, e, s) => {
  var r;
  (r = t == null ? void 0 : t.info) != null && r[s] && (n[e] = {
    hash: t.fingerprint,
    value: t.info[s]
  });
};
export {
  lt as fpPromise
};
