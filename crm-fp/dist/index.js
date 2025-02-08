var G = Object.defineProperty;
var j = (e) => {
  throw TypeError(e);
};
var K = (e, t, a) => t in e ? G(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var d = (e, t, a) => K(e, typeof t != "symbol" ? t + "" : t, a), J = (e, t, a) => t.has(e) || j("Cannot " + a);
var s = (e, t, a) => (J(e, t, "read from private field"), a ? a.call(e) : t.get(e)), h = (e, t, a) => t.has(e) ? j("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), m = (e, t, a, r) => (J(e, t, "write to private field"), r ? r.call(e, a) : t.set(e, a), a), N = (e, t, a) => (J(e, t, "access private method"), a);
function E(e) {
  function t(o, c) {
    return o >>> c | o << 32 - c;
  }
  const a = new TextEncoder().encode(e), r = Array.from(a), l = [
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
  ], n = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], v = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const p = new Array(8).fill(0);
  for (let o = 0; o < 8; o++)
    p[7 - o] = v >>> o * 8 & 255;
  r.push(...p);
  const T = [];
  for (let o = 0; o < r.length; o += 64)
    T.push(r.slice(o, o + 64));
  return T.forEach((o) => {
    const c = new Array(64);
    for (let i = 0; i < 16; i++)
      c[i] = o[i * 4] << 24 | o[i * 4 + 1] << 16 | o[i * 4 + 2] << 8 | o[i * 4 + 3];
    for (let i = 16; i < 64; i++) {
      const U = t(c[i - 15], 7) ^ t(c[i - 15], 18) ^ c[i - 15] >>> 3, I = t(c[i - 2], 17) ^ t(c[i - 2], 19) ^ c[i - 2] >>> 10;
      c[i] = c[i - 16] + U + c[i - 7] + I | 0;
    }
    let [f, F, C, R, g, O, D, B] = n;
    for (let i = 0; i < 64; i++) {
      const U = t(g, 6) ^ t(g, 11) ^ t(g, 25), I = g & O ^ ~g & D, V = B + U + I + l[i] + c[i] | 0, $ = t(f, 2) ^ t(f, 13) ^ t(f, 22), k = f & F ^ f & C ^ F & C, q = $ + k | 0;
      B = D, D = O, O = g, g = R + V | 0, R = C, C = F, F = f, f = V + q | 0;
    }
    n[0] = n[0] + f | 0, n[1] = n[1] + F | 0, n[2] = n[2] + C | 0, n[3] = n[3] + R | 0, n[4] = n[4] + g | 0, n[5] = n[5] + O | 0, n[6] = n[6] + D | 0, n[7] = n[7] + B | 0;
  }), n.map((o) => (o >>> 0).toString(16).padStart(8, "0")).join("");
}
var w, x, L, b, H, P;
class M {
  constructor() {
    h(this, b);
    d(this, "name", "Audio Feature");
    d(this, "enabled", !0);
    h(this, w, null);
    h(this, x, null);
    h(this, L, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (m(this, w, new t(1, s(this, L), 44100)), s(this, w) !== null) : !1;
  }
  async data() {
    if (s(this, w) === null) return null;
    const t = await N(this, b, H).call(this, s(this, w));
    return t === null ? null : (m(this, x, await E(t.toString())), {
      fingerprint: s(this, x),
      info: {
        audio: t
      }
    });
  }
}
w = new WeakMap(), x = new WeakMap(), L = new WeakMap(), b = new WeakSet(), H = function(t) {
  return new Promise((a) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const l = t.createDynamicsCompressor();
    l.threshold.value = -50, l.knee.value = 40, l.ratio.value = 12, l.attack.value = 0, l.release.value = 0.2, r.connect(l), l.connect(t.destination), r.start(), t.oncomplete = (n) => {
      const v = n.renderedBuffer.getChannelData(0), p = N(this, b, P).call(this, v);
      a(p);
    }, t.startRendering();
  });
}, P = function(t) {
  let a = 0;
  for (let r = 0; r < t.length; ++r)
    a += Math.abs(t[r]);
  return a;
};
var u, A;
class _ {
  constructor() {
    d(this, "name", "Canvas Feature");
    d(this, "enabled", !0);
    h(this, u, null);
    h(this, A, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (m(this, u, document.createElement("canvas").getContext("2d")), s(this, u) !== null) : !1;
  }
  async data() {
    return s(this, u) === null ? null : (s(this, u).textBaseline = "top", s(this, u).font = "14px 'Arial'", s(this, u).textBaseline = "alphabetic", s(this, u).fillStyle = "#f60", s(this, u).fillRect(100, 1, 55, 20), s(this, u).fillStyle = "#069", s(this, u).fillText("Cyber Universe Canvas", 2, 15), s(this, u).fillStyle = "rgba(102, 204, 0, 0.7)", s(this, u).fillText("Cyber Universe Canvas", 4, 17), m(this, A, s(this, u).canvas.toDataURL()), {
      fingerprint: await E(s(this, A)),
      info: {
        image: s(this, A)
      }
    });
  }
}
u = new WeakMap(), A = new WeakMap();
var y, S;
class z {
  constructor() {
    d(this, "name", "Languages Feature");
    d(this, "enabled", !0);
    h(this, y, []);
    h(this, S, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.language && s(this, y).push([navigator.language]), Array.isArray(navigator.languages) && s(this, y).push(navigator.languages), m(this, S, JSON.stringify(s(this, y))), {
      fingerprint: await E(s(this, S)),
      info: {
        languages: JSON.stringify(s(this, y))
      }
    };
  }
}
y = new WeakMap(), S = new WeakMap();
const Q = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), Y = async () => await W(), W = async () => {
  const e = [new _(), new M(), new z()], t = [], a = {}, r = (l, n, v) => {
    var p;
    (p = l == null ? void 0 : l.info) != null && p[v] && (a[n] = {
      hash: l.fingerprint,
      value: l.info[v]
    });
  };
  for (const l of e) {
    const n = await Q(l);
    r(n, "canvas", "image"), r(n, "audio", "audio"), r(n, "languages", "languages"), t.push((n == null ? void 0 : n.fingerprint) || "");
  }
  return {
    id: await E(JSON.stringify(t)),
    useragent: navigator.userAgent,
    rawData: a
  };
};
export {
  Y as fpPromise
};
