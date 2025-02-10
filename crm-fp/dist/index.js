var ot = Object.defineProperty;
var tt = (a) => {
  throw TypeError(a);
};
var lt = (a, t, e) => t in a ? ot(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var c = (a, t, e) => lt(a, typeof t != "symbol" ? t + "" : t, e), Z = (a, t, e) => t.has(a) || tt("Cannot " + e);
var n = (a, t, e) => (Z(a, t, "read from private field"), e ? e.call(a) : t.get(a)), l = (a, t, e) => t.has(a) ? tt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(a) : t.set(a, e), h = (a, t, e, r) => (Z(a, t, "write to private field"), r ? r.call(a, e) : t.set(a, e), e), B = (a, t, e) => (Z(a, t, "access private method"), e);
function g(a) {
  function t(u, d) {
    return u >>> d | u << 32 - d;
  }
  const e = new TextEncoder().encode(a), r = Array.from(e), i = [
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
  ], N = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const I = new Array(8).fill(0);
  for (let u = 0; u < 8; u++)
    I[7 - u] = N >>> u * 8 & 255;
  r.push(...I);
  const Y = [];
  for (let u = 0; u < r.length; u += 64)
    Y.push(r.slice(u, u + 64));
  return Y.forEach((u) => {
    const d = new Array(64);
    for (let s = 0; s < 16; s++)
      d[s] = u[s * 4] << 24 | u[s * 4 + 1] << 16 | u[s * 4 + 2] << 8 | u[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const q = t(d[s - 15], 7) ^ t(d[s - 15], 18) ^ d[s - 15] >>> 3, K = t(d[s - 2], 17) ^ t(d[s - 2], 19) ^ d[s - 2] >>> 10;
      d[s] = d[s - 16] + q + d[s - 7] + K | 0;
    }
    let [p, D, L, P, w, U, k, Q] = o;
    for (let s = 0; s < 64; s++) {
      const q = t(w, 6) ^ t(w, 11) ^ t(w, 25), K = w & U ^ ~w & k, _ = Q + q + K + i[s] + d[s] | 0, rt = t(p, 2) ^ t(p, 13) ^ t(p, 22), it = p & D ^ p & L ^ D & L, st = rt + it | 0;
      Q = k, k = U, U = w, w = P + _ | 0, P = L, L = D, D = p, p = _ + st | 0;
    }
    o[0] = o[0] + p | 0, o[1] = o[1] + D | 0, o[2] = o[2] + L | 0, o[3] = o[3] + P | 0, o[4] = o[4] + w | 0, o[5] = o[5] + U | 0, o[6] = o[6] + k | 0, o[7] = o[7] + Q | 0;
  }), o.map((u) => (u >>> 0).toString(16).padStart(8, "0")).join("");
}
var b, T, j, $, et, nt;
class ut {
  constructor() {
    l(this, $);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    l(this, b, null);
    l(this, T, null);
    l(this, j, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (h(this, b, new t(1, n(this, j), 44100)), n(this, b) !== null) : !1;
  }
  async data() {
    if (n(this, b) === null) return null;
    const t = await B(this, $, et).call(this, n(this, b));
    return t === null ? null : (h(this, T, t.toString()), {
      fingerprint: await g(n(this, T)),
      info: {
        audio: t
      }
    });
  }
}
b = new WeakMap(), T = new WeakMap(), j = new WeakMap(), $ = new WeakSet(), et = function(t) {
  return new Promise((e) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const i = t.createDynamicsCompressor();
    i.threshold.value = -50, i.knee.value = 40, i.ratio.value = 12, i.attack.value = 0, i.release.value = 0.2, r.connect(i), i.connect(t.destination), r.start(), t.oncomplete = (o) => {
      const N = o.renderedBuffer.getChannelData(0), I = B(this, $, nt).call(this, N);
      e(I);
    }, t.startRendering();
  });
}, nt = function(t) {
  let e = 0;
  for (let r = 0; r < t.length; ++r)
    e += Math.abs(t[r]);
  return e;
};
var f, F;
class ct {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    l(this, f, null);
    l(this, F, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (h(this, f, document.createElement("canvas").getContext("2d")), n(this, f) !== null) : !1;
  }
  async data() {
    return n(this, f) === null ? null : (n(this, f).textBaseline = "top", n(this, f).font = "14px 'Arial'", n(this, f).textBaseline = "alphabetic", n(this, f).fillStyle = "#f60", n(this, f).fillRect(100, 1, 55, 20), n(this, f).fillStyle = "#069", n(this, f).fillText("Cyber Universe Canvas", 2, 15), n(this, f).fillStyle = "rgba(102, 204, 0, 0.7)", n(this, f).fillText("Cyber Universe Canvas", 4, 17), h(this, F, n(this, f).canvas.toDataURL()), {
      fingerprint: await g(n(this, F)),
      info: {
        image: n(this, F)
      }
    });
  }
}
f = new WeakMap(), F = new WeakMap();
var x, R;
const G = class G {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    l(this, x, null);
    l(this, R, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of G.gamutList) {
      const e = `(color-gamut: ${t})`;
      if (matchMedia(e).matches) {
        h(this, x, `gamut: ${t}`), h(this, R, t);
        break;
      }
    }
    return n(this, x) === null ? null : {
      fingerprint: await g(n(this, x)),
      info: {
        colorGamut: n(this, R)
      }
    };
  }
};
x = new WeakMap(), R = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(G, "gamutList", ["rec2020", "p3", "srgb"]);
let W = G;
var A, z, V;
class ht {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    l(this, A, null);
    l(this, z, null);
    l(this, V, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, A, navigator.hardwareConcurrency.toString()), h(this, V, navigator.hardwareConcurrency)), n(this, A) ? (h(this, z, "hardware concurrency: " + n(this, A)), {
      fingerprint: await g(n(this, z)),
      info: {
        hardwareConcurrency: n(this, V)
      }
    }) : null;
  }
}
A = new WeakMap(), z = new WeakMap(), V = new WeakMap();
var S, M;
const H = class H {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    l(this, S, null);
    l(this, M, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of H.hdrList) {
      const e = `(dynamic-range: ${t})`;
      if (matchMedia(e).matches) {
        h(this, S, `dynamic-range: ${t}`), h(this, M, t);
        break;
      }
    }
    return n(this, S) === null ? null : {
      fingerprint: await g(n(this, S)),
      info: {
        hdr: n(this, M)
      }
    };
  }
};
S = new WeakMap(), M = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(H, "hdrList", ["high", "standard"]);
let X = H;
var C, O;
class ft {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    l(this, C, []);
    l(this, O, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && n(this, C).push([navigator.language]), Array.isArray(navigator.languages) && n(this, C).push(navigator.languages), (t = n(this, C)) != null && t.length ? (h(this, O, JSON.stringify(n(this, C))), {
      fingerprint: await g(n(this, O)),
      info: {
        languages: n(this, O)
      }
    }) : null;
  }
}
C = new WeakMap(), O = new WeakMap();
var y, E;
class dt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    l(this, y, null);
    l(this, E, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const e = window.screen;
    return e ? (h(this, y, e), n(this, y) !== null) : !1;
  }
  async data() {
    if (n(this, y) === null) return null;
    const t = `${n(this, y).width} x ${n(this, y).height}`;
    return h(this, E, t), {
      fingerprint: await g(n(this, E)),
      info: {
        screenResolution: t
      }
    };
  }
}
y = new WeakMap(), E = new WeakMap();
var v, J, at;
class gt {
  constructor() {
    l(this, J);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    l(this, v, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      h(this, v, t);
    } else
      h(this, v, B(this, J, at).call(this));
    return n(this, v) === null ? null : {
      fingerprint: await g(n(this, v)),
      info: {
        timezone: n(this, v)
      }
    };
  }
}
v = new WeakMap(), J = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
at = function() {
  const e = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), r = e >= 0 ? "+" : "-", i = Math.floor(Math.abs(e) / 60).toString().padStart(2, "0"), o = (Math.abs(e) % 60).toString().padStart(2, "0");
  return `UTC${r}${i}:${o}`;
};
const pt = async (a) => a.enabled ? await a.support() ? await a.data() : (console.log(`Feature ${a.name} is not supported`), null) : (console.log(`Feature ${a.name} is disabled`), null), yt = async () => await wt(), wt = async () => {
  const a = [
    new ut(),
    new ct(),
    new W(),
    new X(),
    new ht(),
    new ft(),
    new dt(),
    new gt()
  ], t = [], e = {};
  for (const r of a) {
    const i = await pt(r);
    m(e, i, "audio", "audio"), m(e, i, "canvas", "image"), m(e, i, "color gamut", "colorGamut"), m(e, i, "hdr", "hdr"), m(e, i, "hardware concurrency", "hardwareConcurrency"), m(e, i, "languages", "languages"), m(e, i, "screen resolution", "screenResolution"), m(e, i, "timezone", "timezone"), t.push((i == null ? void 0 : i.fingerprint) || "");
  }
  return {
    id: await g(JSON.stringify(t)),
    useragent: navigator.userAgent,
    rawData: e
  };
}, m = (a, t, e, r) => {
  var i;
  (i = t == null ? void 0 : t.info) != null && i[r] && (a[e] = {
    hash: t.fingerprint,
    value: t.info[r]
  });
};
export {
  yt as fpPromise
};
