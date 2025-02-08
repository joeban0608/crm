var z = Object.defineProperty;
var M = (e) => {
  throw TypeError(e);
};
var W = (e, t, n) => t in e ? z(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var h = (e, t, n) => W(e, typeof t != "symbol" ? t + "" : t, n), j = (e, t, n) => t.has(e) || M("Cannot " + n);
var a = (e, t, n) => (j(e, t, "read from private field"), n ? n.call(e) : t.get(e)), f = (e, t, n) => t.has(e) ? M("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), p = (e, t, n, s) => (j(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n), k = (e, t, n) => (j(e, t, "access private method"), n);
function S(e) {
  function t(l, c) {
    return l >>> c | l << 32 - c;
  }
  const n = new TextEncoder().encode(e), s = Array.from(n), r = [
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
  ], U = s.length * 8;
  for (s.push(128); (s.length * 8 + 64) % 512 !== 0; )
    s.push(0);
  const L = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    L[7 - l] = U >>> l * 8 & 255;
  s.push(...L);
  const H = [];
  for (let l = 0; l < s.length; l += 64)
    H.push(s.slice(l, l + 64));
  return H.forEach((l) => {
    const c = new Array(64);
    for (let i = 0; i < 16; i++)
      c[i] = l[i * 4] << 24 | l[i * 4 + 1] << 16 | l[i * 4 + 2] << 8 | l[i * 4 + 3];
    for (let i = 16; i < 64; i++) {
      const V = t(c[i - 15], 7) ^ t(c[i - 15], 18) ^ c[i - 15] >>> 3, $ = t(c[i - 2], 17) ^ t(c[i - 2], 19) ^ c[i - 2] >>> 10;
      c[i] = c[i - 16] + V + c[i - 7] + $ | 0;
    }
    let [g, F, x, I, d, O, D, T] = o;
    for (let i = 0; i < 64; i++) {
      const V = t(d, 6) ^ t(d, 11) ^ t(d, 25), $ = d & O ^ ~d & D, J = T + V + $ + r[i] + c[i] | 0, q = t(g, 2) ^ t(g, 13) ^ t(g, 22), K = g & F ^ g & x ^ F & x, Q = q + K | 0;
      T = D, D = O, O = d, d = I + J | 0, I = x, x = F, F = g, g = J + Q | 0;
    }
    o[0] = o[0] + g | 0, o[1] = o[1] + F | 0, o[2] = o[2] + x | 0, o[3] = o[3] + I | 0, o[4] = o[4] + d | 0, o[5] = o[5] + O | 0, o[6] = o[6] + D | 0, o[7] = o[7] + T | 0;
  }), o.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var m, C, R, A, N, P;
class X {
  constructor() {
    f(this, A);
    h(this, "name", "Audio Feature");
    h(this, "enabled", !0);
    f(this, m, null);
    f(this, C, null);
    f(this, R, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (p(this, m, new t(1, a(this, R), 44100)), a(this, m) !== null) : !1;
  }
  async data() {
    if (a(this, m) === null) return null;
    const t = await k(this, A, N).call(this, a(this, m));
    return t === null ? null : (p(this, C, t.toString()), {
      fingerprint: await S(a(this, C)),
      info: {
        audio: t
      }
    });
  }
}
m = new WeakMap(), C = new WeakMap(), R = new WeakMap(), A = new WeakSet(), N = function(t) {
  return new Promise((n) => {
    const s = t.createOscillator();
    s.type = "triangle", s.frequency.value = 1e4;
    const r = t.createDynamicsCompressor();
    r.threshold.value = -50, r.knee.value = 40, r.ratio.value = 12, r.attack.value = 0, r.release.value = 0.2, s.connect(r), r.connect(t.destination), s.start(), t.oncomplete = (o) => {
      const U = o.renderedBuffer.getChannelData(0), L = k(this, A, P).call(this, U);
      n(L);
    }, t.startRendering();
  });
}, P = function(t) {
  let n = 0;
  for (let s = 0; s < t.length; ++s)
    n += Math.abs(t[s]);
  return n;
};
var u, y;
class Y {
  constructor() {
    h(this, "name", "Canvas Feature");
    h(this, "enabled", !0);
    f(this, u, null);
    f(this, y, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (p(this, u, document.createElement("canvas").getContext("2d")), a(this, u) !== null) : !1;
  }
  async data() {
    return a(this, u) === null ? null : (a(this, u).textBaseline = "top", a(this, u).font = "14px 'Arial'", a(this, u).textBaseline = "alphabetic", a(this, u).fillStyle = "#f60", a(this, u).fillRect(100, 1, 55, 20), a(this, u).fillStyle = "#069", a(this, u).fillText("Cyber Universe Canvas", 2, 15), a(this, u).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, u).fillText("Cyber Universe Canvas", 4, 17), p(this, y, a(this, u).canvas.toDataURL()), {
      fingerprint: await S(a(this, y)),
      info: {
        image: a(this, y)
      }
    });
  }
}
u = new WeakMap(), y = new WeakMap();
var w;
const B = class B {
  constructor() {
    // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
    h(this, "name", "ColorGamut Feature");
    h(this, "enabled", !0);
    f(this, w, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of B.gamutList) {
      const n = `(color-gamut: ${t})`;
      if (matchMedia(n).matches) {
        p(this, w, t);
        break;
      }
    }
    return a(this, w) === null ? null : {
      fingerprint: await S(a(this, w)),
      info: {
        colorGamut: a(this, w)
      }
    };
  }
};
w = new WeakMap(), h(B, "gamutList", ["rec2020", "p3", "srgb"]);
let G = B;
var v, b;
class Z {
  constructor() {
    h(this, "name", "Languages Feature");
    h(this, "enabled", !0);
    f(this, v, []);
    f(this, b, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.language && a(this, v).push([navigator.language]), Array.isArray(navigator.languages) && a(this, v).push(navigator.languages), p(this, b, JSON.stringify(a(this, v))), {
      fingerprint: await S(a(this, b)),
      info: {
        languages: a(this, b)
      }
    };
  }
}
v = new WeakMap(), b = new WeakMap();
const _ = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), nt = async () => await tt(), tt = async () => {
  const e = [
    new Y(),
    new X(),
    new Z(),
    new G()
  ], t = [], n = {};
  for (const s of e) {
    const r = await _(s);
    E(n, r, "canvas", "image"), E(n, r, "audio", "audio"), E(n, r, "languages", "languages"), E(n, r, "color gamut", "colorGamut"), t.push((r == null ? void 0 : r.fingerprint) || "");
  }
  return {
    id: await S(JSON.stringify(t)),
    useragent: navigator.userAgent,
    rawData: n
  };
}, E = (e, t, n, s) => {
  var r;
  (r = t == null ? void 0 : t.info) != null && r[s] && (e[n] = {
    hash: t.fingerprint,
    value: t.info[s]
  });
};
export {
  nt as fpPromise
};
