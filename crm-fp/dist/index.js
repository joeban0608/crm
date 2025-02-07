var q = Object.defineProperty;
var V = (t) => {
  throw TypeError(t);
};
var G = (t, e, i) => e in t ? q(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var d = (t, e, i) => G(t, typeof e != "symbol" ? e + "" : e, i), L = (t, e, i) => e.has(t) || V("Cannot " + i);
var l = (t, e, i) => (L(t, e, "read from private field"), i ? i.call(t) : e.get(t)), p = (t, e, i) => e.has(t) ? V("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), b = (t, e, i, o) => (L(t, e, "write to private field"), o ? o.call(t, i) : e.set(t, i), i), R = (t, e, i) => (L(t, e, "access private method"), i);
function y(t) {
  function e(a, u) {
    return a >>> u | a << 32 - u;
  }
  const i = new TextEncoder().encode(t), o = Array.from(i), f = [
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
  ], r = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], F = o.length * 8;
  for (o.push(128); (o.length * 8 + 64) % 512 !== 0; )
    o.push(0);
  const w = new Array(8).fill(0);
  for (let a = 0; a < 8; a++)
    w[7 - a] = F >>> a * 8 & 255;
  o.push(...w);
  const x = [];
  for (let a = 0; a < o.length; a += 64)
    x.push(o.slice(a, a + 64));
  return x.forEach((a) => {
    const u = new Array(64);
    for (let s = 0; s < 16; s++)
      u[s] = a[s * 4] << 24 | a[s * 4 + 1] << 16 | a[s * 4 + 2] << 8 | a[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const B = e(u[s - 15], 7) ^ e(u[s - 15], 18) ^ u[s - 15] >>> 3, I = e(u[s - 2], 17) ^ e(u[s - 2], 19) ^ u[s - 2] >>> 10;
      u[s] = u[s - 16] + B + u[s - 7] + I | 0;
    }
    let [h, g, m, C, n, O, S, U] = r;
    for (let s = 0; s < 64; s++) {
      const B = e(n, 6) ^ e(n, 11) ^ e(n, 25), I = n & O ^ ~n & S, $ = U + B + I + f[s] + u[s] | 0, P = e(h, 2) ^ e(h, 13) ^ e(h, 22), Y = h & g ^ h & m ^ g & m, k = P + Y | 0;
      U = S, S = O, O = n, n = C + $ | 0, C = m, m = g, g = h, h = $ + k | 0;
    }
    r[0] = r[0] + h | 0, r[1] = r[1] + g | 0, r[2] = r[2] + m | 0, r[3] = r[3] + C | 0, r[4] = r[4] + n | 0, r[5] = r[5] + O | 0, r[6] = r[6] + S | 0, r[7] = r[7] + U | 0;
  }), r.map((a) => (a >>> 0).toString(16).padStart(8, "0")).join("");
}
var v, D, E, T, M, N;
class J {
  constructor() {
    p(this, T);
    d(this, "name", "Audio Feature");
    d(this, "enabled", !0);
    p(this, v, null);
    p(this, D, null);
    p(this, E, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const e = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return e ? (b(this, v, new e(1, l(this, E), 44100)), l(this, v) !== null) : !1;
  }
  async data() {
    if (l(this, v) === null) return null;
    const e = await R(this, T, M).call(this, l(this, v));
    return e === null ? null : (b(this, D, await y(e.toString())), {
      fingerprint: l(this, D),
      info: {
        audio: e
      }
    });
  }
}
v = new WeakMap(), D = new WeakMap(), E = new WeakMap(), T = new WeakSet(), M = function(e) {
  return new Promise((i) => {
    const o = e.createOscillator();
    o.type = "triangle", o.frequency.value = 1e4;
    const f = e.createDynamicsCompressor();
    f.threshold.value = -50, f.knee.value = 40, f.ratio.value = 12, f.attack.value = 0, f.release.value = 0.2, o.connect(f), f.connect(e.destination), o.start(), e.oncomplete = (r) => {
      const F = r.renderedBuffer.getChannelData(0), w = R(this, T, N).call(this, F);
      i(w);
    }, e.startRendering();
  });
}, N = function(e) {
  let i = 0;
  for (let o = 0; o < e.length; ++o)
    i += Math.abs(e[o]);
  return i;
};
var c, z;
class K {
  constructor() {
    d(this, "name", "Canvas Feature");
    d(this, "enabled", !0);
    p(this, c, null);
    p(this, z, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (b(this, c, document.createElement("canvas").getContext("2d")), l(this, c) !== null) : !1;
  }
  async data() {
    return l(this, c) === null ? null : (l(this, c).textBaseline = "top", l(this, c).font = "14px 'Arial'", l(this, c).textBaseline = "alphabetic", l(this, c).fillStyle = "#f60", l(this, c).fillRect(100, 1, 55, 20), l(this, c).fillStyle = "#069", l(this, c).fillText("Cyber Universe Canvas", 2, 15), l(this, c).fillStyle = "rgba(102, 204, 0, 0.7)", l(this, c).fillText("Cyber Universe Canvas", 4, 17), b(this, z, l(this, c).canvas.toDataURL()), {
      fingerprint: await y(l(this, z)),
      info: {
        image: l(this, z)
      }
    });
  }
}
c = new WeakMap(), z = new WeakMap();
function j(t) {
  return parseFloat(t);
}
function H() {
  var i;
  const t = (i = window.Intl) == null ? void 0 : i.DateTimeFormat;
  if (t) {
    const o = new t().resolvedOptions().timeZone;
    if (o)
      return o;
  }
  const e = -Z();
  return `UTC${e >= 0 ? "+" : ""}${e}`;
}
function Z() {
  const t = (/* @__PURE__ */ new Date()).getFullYear();
  return Math.max(
    // `getTimezoneOffset` returns a number as a string in some unidentified cases
    j(new Date(t, 0, 1).getTimezoneOffset()),
    j(new Date(t, 6, 1).getTimezoneOffset())
  );
}
var A;
class _ {
  constructor() {
    d(this, "name", "Canvas Feature");
    d(this, "enabled", !0);
    p(this, A, null);
  }
  async support() {
    return !0;
  }
  async data() {
    return console.log("getTimezone", H()), b(this, A, H()), {
      fingerprint: await y(l(this, A)),
      info: {
        timezone: l(this, A)
      }
    };
  }
}
A = new WeakMap();
const Q = async (t) => t.enabled ? await t.support() ? await t.data() : (console.log(`Feature ${t.name} is not supported`), null) : (console.log(`Feature ${t.name} is disabled`), null), ee = async () => await W(), W = async () => {
  var r, F, w, x, a, u, h, g, m;
  const t = [new K(), new J(), new _()];
  let e = "", i = "", o = "";
  const f = [];
  for (const C of t) {
    const n = await Q(C);
    console.log(C.name, n == null ? void 0 : n.fingerprint), console.log((r = n == null ? void 0 : n.info) == null ? void 0 : r.image), console.log((F = n == null ? void 0 : n.info) == null ? void 0 : F.audio), console.log((w = n == null ? void 0 : n.info) == null ? void 0 : w.timezone), (x = n == null ? void 0 : n.info) != null && x.image && (e = (a = n == null ? void 0 : n.info) == null ? void 0 : a.image), (u = n == null ? void 0 : n.info) != null && u.audio && (i = (h = n == null ? void 0 : n.info) == null ? void 0 : h.audio), (g = n == null ? void 0 : n.info) != null && g.timezone && (o = (m = n == null ? void 0 : n.info) == null ? void 0 : m.timezone), f.push((n == null ? void 0 : n.fingerprint) || "");
  }
  return {
    id: await y(JSON.stringify(f)),
    useragent: navigator.userAgent,
    rawData: {
      canvas: {
        hash: await y(e),
        "text image": e
      },
      audio: {
        hash: await y(i),
        value: i
      },
      timezone: {
        hash: await y(o),
        value: o
      }
    }
  };
};
export {
  ee as fpPromise
};
