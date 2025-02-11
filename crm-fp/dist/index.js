var ot = Object.defineProperty;
var tt = (n) => {
  throw TypeError(n);
};
var lt = (n, t, a) => t in n ? ot(n, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : n[t] = a;
var u = (n, t, a) => lt(n, typeof t != "symbol" ? t + "" : t, a), Z = (n, t, a) => t.has(n) || tt("Cannot " + a);
var e = (n, t, a) => (Z(n, t, "read from private field"), a ? a.call(n) : t.get(n)), o = (n, t, a) => t.has(n) ? tt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, a), c = (n, t, a, i) => (Z(n, t, "write to private field"), i ? i.call(n, a) : t.set(n, a), a), k = (n, t, a) => (Z(n, t, "access private method"), a);
function g(n) {
  function t(l, d) {
    return l >>> d | l << 32 - d;
  }
  const a = new TextEncoder().encode(n), i = Array.from(a), h = [
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
  ], J = i.length * 8;
  for (i.push(128); (i.length * 8 + 64) % 512 !== 0; )
    i.push(0);
  const I = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    I[7 - l] = J >>> l * 8 & 255;
  i.push(...I);
  const Y = [];
  for (let l = 0; l < i.length; l += 64)
    Y.push(i.slice(l, l + 64));
  return Y.forEach((l) => {
    const d = new Array(64);
    for (let s = 0; s < 16; s++)
      d[s] = l[s * 4] << 24 | l[s * 4 + 1] << 16 | l[s * 4 + 2] << 8 | l[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const q = t(d[s - 15], 7) ^ t(d[s - 15], 18) ^ d[s - 15] >>> 3, K = t(d[s - 2], 17) ^ t(d[s - 2], 19) ^ d[s - 2] >>> 10;
      d[s] = d[s - 16] + q + d[s - 7] + K | 0;
    }
    let [w, D, L, N, y, U, _, Q] = r;
    for (let s = 0; s < 64; s++) {
      const q = t(y, 6) ^ t(y, 11) ^ t(y, 25), K = y & U ^ ~y & _, P = Q + q + K + h[s] + d[s] | 0, it = t(w, 2) ^ t(w, 13) ^ t(w, 22), rt = w & D ^ w & L ^ D & L, st = it + rt | 0;
      Q = _, _ = U, U = y, y = N + P | 0, N = L, L = D, D = w, w = P + st | 0;
    }
    r[0] = r[0] + w | 0, r[1] = r[1] + D | 0, r[2] = r[2] + L | 0, r[3] = r[3] + N | 0, r[4] = r[4] + y | 0, r[5] = r[5] + U | 0, r[6] = r[6] + _ | 0, r[7] = r[7] + Q | 0;
  }), r.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var C, T, B, $, nt, et;
class ut {
  constructor() {
    o(this, $);
    u(this, "name", "Audio Feature");
    u(this, "enabled", !0);
    o(this, C, null);
    o(this, T, null);
    o(this, B, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (c(this, C, new t(1, e(this, B), 44100)), e(this, C) !== null) : !1;
  }
  async data() {
    if (e(this, C) === null) return null;
    const t = await k(this, $, nt).call(this, e(this, C));
    return t === null ? null : (c(this, T, t.toString()), {
      fingerprint: await g(e(this, T)),
      info: {
        audio: t
      }
    });
  }
}
C = new WeakMap(), T = new WeakMap(), B = new WeakMap(), $ = new WeakSet(), nt = function(t) {
  return new Promise((a) => {
    const i = t.createOscillator();
    i.type = "triangle", i.frequency.value = 1e4;
    const h = t.createDynamicsCompressor();
    h.threshold.value = -50, h.knee.value = 40, h.ratio.value = 12, h.attack.value = 0, h.release.value = 0.2, i.connect(h), h.connect(t.destination), i.start(), t.oncomplete = (r) => {
      const J = r.renderedBuffer.getChannelData(0), I = k(this, $, et).call(this, J);
      a(I);
    }, t.startRendering();
  });
}, et = function(t) {
  let a = 0;
  for (let i = 0; i < t.length; ++i)
    a += Math.abs(t[i]);
  return a;
};
var f, x;
class ct {
  constructor() {
    u(this, "name", "Canvas Feature");
    u(this, "enabled", !0);
    o(this, f, null);
    o(this, x, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (c(this, f, document.createElement("canvas").getContext("2d")), e(this, f) !== null) : !1;
  }
  async data() {
    return e(this, f) === null ? null : (e(this, f).textBaseline = "top", e(this, f).font = "14px 'Arial'", e(this, f).textBaseline = "alphabetic", e(this, f).fillStyle = "#f60", e(this, f).fillRect(100, 1, 55, 20), e(this, f).fillStyle = "#069", e(this, f).fillText("Cyber Universe Canvas", 2, 15), e(this, f).fillStyle = "rgba(102, 204, 0, 0.7)", e(this, f).fillText("Cyber Universe Canvas", 4, 17), c(this, x, e(this, f).canvas.toDataURL()), {
      fingerprint: await g(e(this, x)),
      info: {
        image: e(this, x)
      }
    });
  }
}
f = new WeakMap(), x = new WeakMap();
var A, R;
const j = class j {
  constructor() {
    u(this, "name", "ColorGamut Feature");
    u(this, "enabled", !0);
    o(this, A, null);
    o(this, R, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of j.gamutList) {
      const a = `(color-gamut: ${t})`;
      if (matchMedia(a).matches) {
        c(this, A, `gamut: ${t}`), c(this, R, t);
        break;
      }
    }
    return e(this, A) === null ? null : {
      fingerprint: await g(e(this, A)),
      info: {
        colorGamut: e(this, R)
      }
    };
  }
};
A = new WeakMap(), R = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
u(j, "gamutList", ["rec2020", "p3", "srgb"]);
let W = j;
var S, z, V;
class ht {
  constructor() {
    u(this, "name", "Hardware Concurrency Feature");
    u(this, "enabled", !0);
    o(this, S, null);
    o(this, z, null);
    o(this, V, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (c(this, S, navigator.hardwareConcurrency.toString()), c(this, V, navigator.hardwareConcurrency)), e(this, S) ? (c(this, z, "hardware concurrency: " + e(this, S)), {
      fingerprint: await g(e(this, z)),
      info: {
        hardwareConcurrency: e(this, V)
      }
    }) : null;
  }
}
S = new WeakMap(), z = new WeakMap(), V = new WeakMap();
var v, M;
const G = class G {
  constructor() {
    u(this, "name", "HDR Feature");
    u(this, "enabled", !0);
    o(this, v, null);
    o(this, M, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of G.hdrList) {
      const a = `(dynamic-range: ${t})`;
      if (matchMedia(a).matches) {
        c(this, v, `dynamic-range: ${t}`), c(this, M, t);
        break;
      }
    }
    return e(this, v) === null ? null : {
      fingerprint: await g(e(this, v)),
      info: {
        hdr: e(this, M)
      }
    };
  }
};
v = new WeakMap(), M = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
u(G, "hdrList", ["high", "standard"]);
let X = G;
var F, O;
class ft {
  constructor() {
    u(this, "name", "Languages Feature");
    u(this, "enabled", !0);
    o(this, F, []);
    o(this, O, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && e(this, F).push([navigator.language]), Array.isArray(navigator.languages) && e(this, F).push(navigator.languages), (t = e(this, F)) != null && t.length ? (c(this, O, JSON.stringify(e(this, F))), {
      fingerprint: await g(e(this, O)),
      info: {
        languages: e(this, O)
      }
    }) : null;
  }
}
F = new WeakMap(), O = new WeakMap();
var m, E;
class dt {
  constructor() {
    u(this, "name", "Screen resolution Feature");
    u(this, "enabled", !0);
    o(this, m, null);
    o(this, E, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const a = window.screen;
    return a ? (c(this, m, a), e(this, m) !== null) : !1;
  }
  async data() {
    if (e(this, m) === null) return null;
    const t = `${e(this, m).width} x ${e(this, m).height}`;
    return c(this, E, t), {
      fingerprint: await g(e(this, E)),
      info: {
        screenResolution: t
      }
    };
  }
}
m = new WeakMap(), E = new WeakMap();
var b, H, at;
class gt {
  constructor() {
    o(this, H);
    u(this, "name", "Timezone Feature");
    u(this, "enabled", !0);
    o(this, b, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      c(this, b, t);
    } else
      c(this, b, k(this, H, at).call(this));
    return e(this, b) === null ? null : {
      fingerprint: await g(e(this, b)),
      info: {
        timezone: e(this, b)
      }
    };
  }
}
b = new WeakMap(), H = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
at = function() {
  const a = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), i = a >= 0 ? "+" : "-", h = Math.floor(Math.abs(a) / 60).toString().padStart(2, "0"), r = (Math.abs(a) % 60).toString().padStart(2, "0");
  return `UTC${i}${h}:${r}`;
};
const pt = async (n) => n.enabled ? await n.support() ? await n.data() : (console.log(`Feature ${n.name} is not supported`), null) : (console.log(`Feature ${n.name} is disabled`), null), mt = async (n) => await wt(n), wt = async (n) => {
  const t = [
    new ut(),
    new ct(),
    new W(),
    new X(),
    new ht(),
    new ft(),
    new dt(),
    new gt()
  ], a = [], i = {};
  console.log("serverParams===", n);
  for (const h of t) {
    const r = await pt(h);
    await p(i, r, "audio", "audio"), await p(i, r, "canvas", "image"), await p(i, r, "color gamut", "colorGamut"), await p(i, r, "hdr", "hdr"), await p(
      i,
      r,
      "hardware concurrency",
      "hardwareConcurrency"
    ), await p(i, r, "languages", "languages"), await p(i, r, "screen resolution", "screenResolution"), await p(i, r, "timezone", "timezone"), n && n != null && n.client_ip && (await p(
      i,
      {
        fingerprint: g(n.client_ip),
        info: {
          client_ip: n.client_ip
        }
      },
      "client ip",
      "client_ip"
    ), a.push(n == null ? void 0 : n.client_ip)), a.push((r == null ? void 0 : r.fingerprint) || "");
  }
  return {
    id: await g(JSON.stringify(a)),
    useragent: navigator.userAgent,
    _rawData: i
  };
}, p = (n, t, a, i) => {
  var h;
  (h = t == null ? void 0 : t.info) != null && h[i] && (n[a] = {
    hash: t.fingerprint,
    value: t.info[i]
  });
};
export {
  mt as fpPromise
};
