var q = Object.defineProperty;
var j = (t) => {
  throw TypeError(t);
};
var G = (t, e, i) => e in t ? q(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var C = (t, e, i) => G(t, typeof e != "symbol" ? e + "" : e, i), I = (t, e, i) => e.has(t) || j("Cannot " + i);
var l = (t, e, i) => (I(t, e, "read from private field"), i ? i.call(t) : e.get(t)), p = (t, e, i) => e.has(t) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), x = (t, e, i, a) => (I(t, e, "write to private field"), a ? a.call(t, i) : e.set(t, i), i), T = (t, e, i) => (I(t, e, "access private method"), i);
function F(t) {
  function e(r, u) {
    return r >>> u | r << 32 - u;
  }
  const i = new TextEncoder().encode(t), a = Array.from(i), f = [
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
  ], w = a.length * 8;
  for (a.push(128); (a.length * 8 + 64) % 512 !== 0; )
    a.push(0);
  const g = new Array(8).fill(0);
  for (let r = 0; r < 8; r++)
    g[7 - r] = w >>> r * 8 & 255;
  a.push(...g);
  const v = [];
  for (let r = 0; r < a.length; r += 64)
    v.push(a.slice(r, r + 64));
  return v.forEach((r) => {
    const u = new Array(64);
    for (let s = 0; s < 16; s++)
      u[s] = r[s * 4] << 24 | r[s * 4 + 1] << 16 | r[s * 4 + 2] << 8 | r[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const R = e(u[s - 15], 7) ^ e(u[s - 15], 18) ^ u[s - 15] >>> 3, U = e(u[s - 2], 17) ^ e(u[s - 2], 19) ^ u[s - 2] >>> 10;
      u[s] = u[s - 16] + R + u[s - 7] + U | 0;
    }
    let [n, A, b, B, h, D, E, L] = o;
    for (let s = 0; s < 64; s++) {
      const R = e(h, 6) ^ e(h, 11) ^ e(h, 25), U = h & D ^ ~h & E, V = L + R + U + f[s] + u[s] | 0, P = e(n, 2) ^ e(n, 13) ^ e(n, 22), $ = n & A ^ n & b ^ A & b, k = P + $ | 0;
      L = E, E = D, D = h, h = B + V | 0, B = b, b = A, A = n, n = V + k | 0;
    }
    o[0] = o[0] + n | 0, o[1] = o[1] + A | 0, o[2] = o[2] + b | 0, o[3] = o[3] + B | 0, o[4] = o[4] + h | 0, o[5] = o[5] + D | 0, o[6] = o[6] + E | 0, o[7] = o[7] + L | 0;
  }), o.map((r) => (r >>> 0).toString(16).padStart(8, "0")).join("");
}
var d, S, O, y, H, N;
class J {
  constructor() {
    p(this, y);
    C(this, "name", "Audio Feature");
    C(this, "enabled", !0);
    p(this, d, null);
    p(this, S, null);
    p(this, O, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const e = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return e ? (x(this, d, new e(1, l(this, O), 44100)), l(this, d) !== null) : !1;
  }
  async data() {
    if (l(this, d) === null) return null;
    const e = await T(this, y, H).call(this, l(this, d));
    return e === null ? null : (x(this, S, await F(e.toString())), {
      fingerprint: l(this, S),
      info: {
        audio: e
      }
    });
  }
}
d = new WeakMap(), S = new WeakMap(), O = new WeakMap(), y = new WeakSet(), H = function(e) {
  return new Promise((i) => {
    const a = e.createOscillator();
    a.type = "triangle", a.frequency.value = 1e4;
    const f = e.createDynamicsCompressor();
    f.threshold.value = -50, f.knee.value = 40, f.ratio.value = 12, f.attack.value = 0, f.release.value = 0.2, a.connect(f), f.connect(e.destination), a.start(), e.oncomplete = (o) => {
      const w = o.renderedBuffer.getChannelData(0), g = T(this, y, N).call(this, w);
      i(g);
    }, e.startRendering();
  });
}, N = function(e) {
  let i = 0;
  for (let a = 0; a < e.length; ++a)
    i += Math.abs(e[a]);
  return i;
};
var c, m;
class K {
  constructor() {
    C(this, "name", "Canvas Feature");
    C(this, "enabled", !0);
    p(this, c, null);
    p(this, m, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (x(this, c, document.createElement("canvas").getContext("2d")), l(this, c) !== null) : !1;
  }
  async data() {
    return l(this, c) === null ? null : (l(this, c).textBaseline = "top", l(this, c).font = "14px 'Arial'", l(this, c).textBaseline = "alphabetic", l(this, c).fillStyle = "#f60", l(this, c).fillRect(100, 1, 55, 20), l(this, c).fillStyle = "#069", l(this, c).fillText("Cyber Universe Canvas", 2, 15), l(this, c).fillStyle = "rgba(102, 204, 0, 0.7)", l(this, c).fillText("Cyber Universe Canvas", 4, 17), x(this, m, l(this, c).canvas.toDataURL()), {
      fingerprint: await F(l(this, m)),
      info: {
        image: l(this, m)
      }
    });
  }
}
c = new WeakMap(), m = new WeakMap();
const M = async (t) => t.enabled ? await t.support() ? await t.data() : (console.log(`Feature ${t.name} is not supported`), null) : (console.log(`Feature ${t.name} is disabled`), null), Q = async () => await _(), _ = async () => {
  var f, o, w, g, v, r;
  const t = [new K(), new J()];
  let e = "", i = "";
  const a = [];
  for (const u of t) {
    const n = await M(u);
    console.log(u.name, n == null ? void 0 : n.fingerprint), console.log((f = n == null ? void 0 : n.info) == null ? void 0 : f.image), console.log((o = n == null ? void 0 : n.info) == null ? void 0 : o.audio), (w = n == null ? void 0 : n.info) != null && w.image && (e = (g = n == null ? void 0 : n.info) == null ? void 0 : g.image), (v = n == null ? void 0 : n.info) != null && v.audio && (i = (r = n == null ? void 0 : n.info) == null ? void 0 : r.audio), a.push((n == null ? void 0 : n.fingerprint) || "");
  }
  return {
    id: await F(JSON.stringify(a)),
    useragent: navigator.userAgent,
    rawData: {
      canvas: {
        hash: await F(e),
        "text image": e
      },
      audio: {
        hash: await F(i),
        value: i
      }
    }
  };
};
export {
  Q as fpPromise
};
