var G = Object.defineProperty;
var j = (e) => {
  throw TypeError(e);
};
var K = (e, t, n) => t in e ? G(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var w = (e, t, n) => K(e, typeof t != "symbol" ? t + "" : t, n), J = (e, t, n) => t.has(e) || j("Cannot " + n);
var s = (e, t, n) => (J(e, t, "read from private field"), n ? n.call(e) : t.get(e)), g = (e, t, n) => t.has(e) ? j("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), b = (e, t, n, r) => (J(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), T = (e, t, n) => (J(e, t, "access private method"), n);
function y(e) {
  function t(l, u) {
    return l >>> u | l << 32 - u;
  }
  const n = new TextEncoder().encode(e), r = Array.from(n), f = [
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
  ], A = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const d = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    d[7 - l] = A >>> l * 8 & 255;
  r.push(...d);
  const S = [];
  for (let l = 0; l < r.length; l += 64)
    S.push(r.slice(l, l + 64));
  return S.forEach((l) => {
    const u = new Array(64);
    for (let i = 0; i < 16; i++)
      u[i] = l[i * 4] << 24 | l[i * 4 + 1] << 16 | l[i * 4 + 2] << 8 | l[i * 4 + 3];
    for (let i = 16; i < 64; i++) {
      const U = t(u[i - 15], 7) ^ t(u[i - 15], 18) ^ u[i - 15] >>> 3, I = t(u[i - 2], 17) ^ t(u[i - 2], 19) ^ u[i - 2] >>> 10;
      u[i] = u[i - 16] + U + u[i - 7] + I | 0;
    }
    let [h, a, x, N, p, D, E, R] = o;
    for (let i = 0; i < 64; i++) {
      const U = t(p, 6) ^ t(p, 11) ^ t(p, 25), I = p & D ^ ~p & E, V = R + U + I + f[i] + u[i] | 0, $ = t(h, 2) ^ t(h, 13) ^ t(h, 22), k = h & a ^ h & x ^ a & x, q = $ + k | 0;
      R = E, E = D, D = p, p = N + V | 0, N = x, x = a, a = h, h = V + q | 0;
    }
    o[0] = o[0] + h | 0, o[1] = o[1] + a | 0, o[2] = o[2] + x | 0, o[3] = o[3] + N | 0, o[4] = o[4] + p | 0, o[5] = o[5] + D | 0, o[6] = o[6] + E | 0, o[7] = o[7] + R | 0;
  }), o.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var v, O, B, F, H, P;
class M {
  constructor() {
    g(this, F);
    w(this, "name", "Audio Feature");
    w(this, "enabled", !0);
    g(this, v, null);
    g(this, O, null);
    g(this, B, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (b(this, v, new t(1, s(this, B), 44100)), s(this, v) !== null) : !1;
  }
  async data() {
    if (s(this, v) === null) return null;
    const t = await T(this, F, H).call(this, s(this, v));
    return t === null ? null : (b(this, O, await y(t.toString())), {
      fingerprint: s(this, O),
      info: {
        audio: t
      }
    });
  }
}
v = new WeakMap(), O = new WeakMap(), B = new WeakMap(), F = new WeakSet(), H = function(t) {
  return new Promise((n) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const f = t.createDynamicsCompressor();
    f.threshold.value = -50, f.knee.value = 40, f.ratio.value = 12, f.attack.value = 0, f.release.value = 0.2, r.connect(f), f.connect(t.destination), r.start(), t.oncomplete = (o) => {
      const A = o.renderedBuffer.getChannelData(0), d = T(this, F, P).call(this, A);
      n(d);
    }, t.startRendering();
  });
}, P = function(t) {
  let n = 0;
  for (let r = 0; r < t.length; ++r)
    n += Math.abs(t[r]);
  return n;
};
var c, C;
class _ {
  constructor() {
    w(this, "name", "Canvas Feature");
    w(this, "enabled", !0);
    g(this, c, null);
    g(this, C, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (b(this, c, document.createElement("canvas").getContext("2d")), s(this, c) !== null) : !1;
  }
  async data() {
    return s(this, c) === null ? null : (s(this, c).textBaseline = "top", s(this, c).font = "14px 'Arial'", s(this, c).textBaseline = "alphabetic", s(this, c).fillStyle = "#f60", s(this, c).fillRect(100, 1, 55, 20), s(this, c).fillStyle = "#069", s(this, c).fillText("Cyber Universe Canvas", 2, 15), s(this, c).fillStyle = "rgba(102, 204, 0, 0.7)", s(this, c).fillText("Cyber Universe Canvas", 4, 17), b(this, C, s(this, c).canvas.toDataURL()), {
      fingerprint: await y(s(this, C)),
      info: {
        image: s(this, C)
      }
    });
  }
}
c = new WeakMap(), C = new WeakMap();
var m, L;
class z {
  constructor() {
    w(this, "name", "Languages Feature");
    w(this, "enabled", !0);
    g(this, m, []);
    g(this, L, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.language && s(this, m).push([navigator.language]), Array.isArray(navigator.languages) && s(this, m).push(navigator.languages), b(this, L, JSON.stringify(s(this, m))), {
      fingerprint: await y(s(this, L)),
      info: {
        languages: s(this, m)
      }
    };
  }
}
m = new WeakMap(), L = new WeakMap();
const Q = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), Y = async () => await W(), W = async () => {
  var o, A, d, S, l, u;
  const e = [new _(), new M(), new z()];
  let t = "", n = "", r = "";
  const f = [];
  console.log("features", e);
  for (const h of e) {
    const a = await Q(h);
    (o = a == null ? void 0 : a.info) != null && o.image && (t = (A = a == null ? void 0 : a.info) == null ? void 0 : A.image), (d = a == null ? void 0 : a.info) != null && d.audio && (n = (S = a == null ? void 0 : a.info) == null ? void 0 : S.audio), (l = a == null ? void 0 : a.info) != null && l.languages && (r = JSON.stringify((u = a == null ? void 0 : a.info) == null ? void 0 : u.languages)), f.push((a == null ? void 0 : a.fingerprint) || "");
  }
  return {
    id: await y(JSON.stringify(f)),
    useragent: navigator.userAgent,
    rawData: {
      canvas: {
        hash: await y(t),
        value: t
      },
      audio: {
        hash: await y(n),
        value: n
      },
      languages: {
        hash: await y(r),
        value: r
      }
    }
  };
};
export {
  Y as fpPromise
};
