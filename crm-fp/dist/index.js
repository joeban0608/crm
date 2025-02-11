var ot = Object.defineProperty;
var tt = (e) => {
  throw TypeError(e);
};
var lt = (e, t, n) => t in e ? ot(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => lt(e, typeof t != "symbol" ? t + "" : t, n), K = (e, t, n) => t.has(e) || tt("Cannot " + n);
var a = (e, t, n) => (K(e, t, "read from private field"), n ? n.call(e) : t.get(e)), l = (e, t, n) => t.has(e) ? tt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), h = (e, t, n, r) => (K(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), B = (e, t, n) => (K(e, t, "access private method"), n);
function p(e) {
  function t(u, g) {
    return u >>> g | u << 32 - g;
  }
  const n = new TextEncoder().encode(e), r = Array.from(n), o = [
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
  ], d = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const I = new Array(8).fill(0);
  for (let u = 0; u < 8; u++)
    I[7 - u] = d >>> u * 8 & 255;
  r.push(...I);
  const X = [];
  for (let u = 0; u < r.length; u += 64)
    X.push(r.slice(u, u + 64));
  return X.forEach((u) => {
    const g = new Array(64);
    for (let s = 0; s < 16; s++)
      g[s] = u[s * 4] << 24 | u[s * 4 + 1] << 16 | u[s * 4 + 2] << 8 | u[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const Q = t(g[s - 15], 7) ^ t(g[s - 15], 18) ^ g[s - 15] >>> 3, q = t(g[s - 2], 17) ^ t(g[s - 2], 19) ^ g[s - 2] >>> 10;
      g[s] = g[s - 16] + Q + g[s - 7] + q | 0;
    }
    let [m, $, L, N, y, U, j, P] = i;
    for (let s = 0; s < 64; s++) {
      const Q = t(y, 6) ^ t(y, 11) ^ t(y, 25), q = y & U ^ ~y & j, Y = P + Q + q + o[s] + g[s] | 0, rt = t(m, 2) ^ t(m, 13) ^ t(m, 22), it = m & $ ^ m & L ^ $ & L, st = rt + it | 0;
      P = j, j = U, U = y, y = N + Y | 0, N = L, L = $, $ = m, m = Y + st | 0;
    }
    i[0] = i[0] + m | 0, i[1] = i[1] + $ | 0, i[2] = i[2] + L | 0, i[3] = i[3] + N | 0, i[4] = i[4] + y | 0, i[5] = i[5] + U | 0, i[6] = i[6] + j | 0, i[7] = i[7] + P | 0;
  }), i.map((u) => (u >>> 0).toString(16).padStart(8, "0")).join("");
}
var C, R, _, T, et, nt;
class ut {
  constructor() {
    l(this, T);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    l(this, C, null);
    l(this, R, null);
    l(this, _, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (h(this, C, new t(1, a(this, _), 44100)), a(this, C) !== null) : !1;
  }
  async data() {
    if (a(this, C) === null) return null;
    const t = await B(this, T, et).call(this, a(this, C));
    return t === null ? null : (h(this, R, t.toString()), {
      fingerprint: await p(a(this, R)),
      info: {
        audio: t
      }
    });
  }
}
C = new WeakMap(), R = new WeakMap(), _ = new WeakMap(), T = new WeakSet(), et = function(t) {
  return new Promise((n) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const o = t.createDynamicsCompressor();
    o.threshold.value = -50, o.knee.value = 40, o.ratio.value = 12, o.attack.value = 0, o.release.value = 0.2, r.connect(o), o.connect(t.destination), r.start(), t.oncomplete = (i) => {
      const d = i.renderedBuffer.getChannelData(0), I = B(this, T, nt).call(this, d);
      n(I);
    }, t.startRendering();
  });
}, nt = function(t) {
  let n = 0;
  for (let r = 0; r < t.length; ++r)
    n += Math.abs(t[r]);
  return n;
};
var f, x;
class ct {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    l(this, f, null);
    l(this, x, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (h(this, f, document.createElement("canvas").getContext("2d")), a(this, f) !== null) : !1;
  }
  async data() {
    return a(this, f) === null ? null : (a(this, f).textBaseline = "top", a(this, f).font = "14px 'Arial'", a(this, f).textBaseline = "alphabetic", a(this, f).fillStyle = "#f60", a(this, f).fillRect(100, 1, 55, 20), a(this, f).fillStyle = "#069", a(this, f).fillText("Cyber Universe Canvas", 2, 15), a(this, f).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, f).fillText("Cyber Universe Canvas", 4, 17), h(this, x, a(this, f).canvas.toDataURL()), {
      fingerprint: await p(a(this, x)),
      info: {
        image: a(this, x)
      }
    });
  }
}
f = new WeakMap(), x = new WeakMap();
var S, z;
const G = class G {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    l(this, S, null);
    l(this, z, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of G.gamutList) {
      const n = `(color-gamut: ${t})`;
      if (matchMedia(n).matches) {
        h(this, S, `gamut: ${t}`), h(this, z, t);
        break;
      }
    }
    return a(this, S) === null ? null : {
      fingerprint: await p(a(this, S)),
      info: {
        colorGamut: a(this, z)
      }
    };
  }
};
S = new WeakMap(), z = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(G, "gamutList", ["rec2020", "p3", "srgb"]);
let Z = G;
var A, V, M;
class ht {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    l(this, A, null);
    l(this, V, null);
    l(this, M, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, A, navigator.hardwareConcurrency.toString()), h(this, M, navigator.hardwareConcurrency)), a(this, A) ? (h(this, V, "hardware concurrency: " + a(this, A)), {
      fingerprint: await p(a(this, V)),
      info: {
        hardwareConcurrency: a(this, M)
      }
    }) : null;
  }
}
A = new WeakMap(), V = new WeakMap(), M = new WeakMap();
var D, k;
const H = class H {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    l(this, D, null);
    l(this, k, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of H.hdrList) {
      const n = `(dynamic-range: ${t})`;
      if (matchMedia(n).matches) {
        h(this, D, `dynamic-range: ${t}`), h(this, k, t);
        break;
      }
    }
    return a(this, D) === null ? null : {
      fingerprint: await p(a(this, D)),
      info: {
        hdr: a(this, k)
      }
    };
  }
};
D = new WeakMap(), k = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(H, "hdrList", ["high", "standard"]);
let W = H;
var F, O;
class ft {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    l(this, F, []);
    l(this, O, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && a(this, F).push([navigator.language]), Array.isArray(navigator.languages) && a(this, F).push(navigator.languages), (t = a(this, F)) != null && t.length ? (h(this, O, JSON.stringify(a(this, F))), {
      fingerprint: await p(a(this, O)),
      info: {
        languages: a(this, O)
      }
    }) : null;
  }
}
F = new WeakMap(), O = new WeakMap();
var v, E;
class dt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    l(this, v, null);
    l(this, E, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const n = window.screen;
    return n ? (h(this, v, n), a(this, v) !== null) : !1;
  }
  async data() {
    if (a(this, v) === null) return null;
    const t = `${a(this, v).width} x ${a(this, v).height}`;
    return h(this, E, t), {
      fingerprint: await p(a(this, E)),
      info: {
        screenResolution: t
      }
    };
  }
}
v = new WeakMap(), E = new WeakMap();
var b, J, at;
class gt {
  constructor() {
    l(this, J);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    l(this, b, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      h(this, b, t);
    } else
      h(this, b, B(this, J, at).call(this));
    return a(this, b) === null ? null : {
      fingerprint: await p(a(this, b)),
      info: {
        timezone: a(this, b)
      }
    };
  }
}
b = new WeakMap(), J = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
at = function() {
  const n = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), r = n >= 0 ? "+" : "-", o = Math.floor(Math.abs(n) / 60).toString().padStart(2, "0"), i = (Math.abs(n) % 60).toString().padStart(2, "0");
  return `UTC${r}${o}:${i}`;
};
const pt = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), vt = async (e) => await wt(e), wt = async (e) => {
  const t = [
    new ut(),
    new ct(),
    new Z(),
    new W(),
    new ht(),
    new ft(),
    new dt(),
    new gt()
  ], n = [], r = {}, o = {};
  for (const i of t) {
    const d = await pt(i);
    await w(d, "audio", "audio", r), await w(d, "canvas", "image", r), await w(d, "color gamut", "colorGamut", r), await w(d, "hdr", "hdr", r), await w(
      d,
      "hardware concurrency",
      "hardwareConcurrency",
      r
    ), await w(d, "languages", "languages", r), await w(d, "screen resolution", "screenResolution", r), await w(d, "timezone", "timezone", r), n.push((d == null ? void 0 : d.fingerprint) || "");
  }
  return await mt(o, n, e), {
    id: await p(JSON.stringify(n)),
    useragent: navigator.userAgent,
    rawData: r,
    serverData: o
  };
}, w = (e, t, n, r) => {
  var o;
  (o = e == null ? void 0 : e.info) != null && o[n] && (r[t] = {
    hash: e.fingerprint,
    value: e.info[n]
  });
}, mt = (e, t, n) => {
  if (n)
    for (const r in n) {
      const o = {
        fingerprint: p(n[r]),
        info: {
          [r]: n[r]
        }
      }, i = r.includes("_") ? r.split("_").join(" ") : r.includes("-") ? r.split("-").join(" ") : r;
      w(o, i, r, e), t.push(o.fingerprint);
    }
};
export {
  vt as fpPromise
};
