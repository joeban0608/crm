var st = Object.defineProperty;
var _ = (e) => {
  throw TypeError(e);
};
var ot = (e, t, a) => t in e ? st(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var u = (e, t, a) => ot(e, typeof t != "symbol" ? t + "" : t, a), G = (e, t, a) => t.has(e) || _("Cannot " + a);
var n = (e, t, a) => (G(e, t, "read from private field"), a ? a.call(e) : t.get(e)), o = (e, t, a) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), c = (e, t, a, r) => (G(e, t, "write to private field"), r ? r.call(e, a) : t.set(e, a), a), k = (e, t, a) => (G(e, t, "access private method"), a);
function g(e) {
  function t(l, d) {
    return l >>> d | l << 32 - d;
  }
  const a = new TextEncoder().encode(e), r = Array.from(a), f = [
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
  ], p = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const S = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    S[7 - l] = p >>> l * 8 & 255;
  r.push(...S);
  const X = [];
  for (let l = 0; l < r.length; l += 64)
    X.push(r.slice(l, l + 64));
  return X.forEach((l) => {
    const d = new Array(64);
    for (let s = 0; s < 16; s++)
      d[s] = l[s * 4] << 24 | l[s * 4 + 1] << 16 | l[s * 4 + 2] << 8 | l[s * 4 + 3];
    for (let s = 16; s < 64; s++) {
      const P = t(d[s - 15], 7) ^ t(d[s - 15], 18) ^ d[s - 15] >>> 3, Q = t(d[s - 2], 17) ^ t(d[s - 2], 19) ^ d[s - 2] >>> 10;
      d[s] = d[s - 16] + P + d[s - 7] + Q | 0;
    }
    let [w, T, R, J, y, D, I, K] = i;
    for (let s = 0; s < 64; s++) {
      const P = t(y, 6) ^ t(y, 11) ^ t(y, 25), Q = y & D ^ ~y & I, Y = K + P + Q + f[s] + d[s] | 0, at = t(w, 2) ^ t(w, 13) ^ t(w, 22), rt = w & T ^ w & R ^ T & R, it = at + rt | 0;
      K = I, I = D, D = y, y = J + Y | 0, J = R, R = T, T = w, w = Y + it | 0;
    }
    i[0] = i[0] + w | 0, i[1] = i[1] + T | 0, i[2] = i[2] + R | 0, i[3] = i[3] + J | 0, i[4] = i[4] + y | 0, i[5] = i[5] + D | 0, i[6] = i[6] + I | 0, i[7] = i[7] + K | 0;
  }), i.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
const lt = "http://localhost:3000";
async function ut() {
  try {
    const t = await (await fetch(`${lt}/api/fingerprint`)).json();
    if (!t) throw new Error("failed to get user request info");
    return t.serverData;
  } catch (e) {
    console.error("failed to get user request info", e);
  }
}
var C, E, q, $, tt, et;
class ct {
  constructor() {
    o(this, $);
    u(this, "name", "Audio Feature");
    u(this, "enabled", !0);
    o(this, C, null);
    o(this, E, null);
    o(this, q, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (c(this, C, new t(1, n(this, q), 44100)), n(this, C) !== null) : !1;
  }
  async data() {
    if (n(this, C) === null) return null;
    const t = await k(this, $, tt).call(this, n(this, C));
    return t === null ? null : (c(this, E, t.toString()), {
      fingerprint: await g(n(this, E)),
      info: {
        audio: t
      }
    });
  }
}
C = new WeakMap(), E = new WeakMap(), q = new WeakMap(), $ = new WeakSet(), tt = function(t) {
  return new Promise((a) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const f = t.createDynamicsCompressor();
    f.threshold.value = -50, f.knee.value = 40, f.ratio.value = 12, f.attack.value = 0, f.release.value = 0.2, r.connect(f), f.connect(t.destination), r.start(), t.oncomplete = (i) => {
      const p = i.renderedBuffer.getChannelData(0), S = k(this, $, et).call(this, p);
      a(S);
    }, t.startRendering();
  });
}, et = function(t) {
  let a = 0;
  for (let r = 0; r < t.length; ++r)
    a += Math.abs(t[r]);
  return a;
};
var h, x;
class ht {
  constructor() {
    u(this, "name", "Canvas Feature");
    u(this, "enabled", !0);
    o(this, h, null);
    o(this, x, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (c(this, h, document.createElement("canvas").getContext("2d")), n(this, h) !== null) : !1;
  }
  async data() {
    return n(this, h) === null ? null : (n(this, h).textBaseline = "top", n(this, h).font = "14px 'Arial'", n(this, h).textBaseline = "alphabetic", n(this, h).fillStyle = "#f60", n(this, h).fillRect(100, 1, 55, 20), n(this, h).fillStyle = "#069", n(this, h).fillText("Cyber Universe Canvas", 2, 15), n(this, h).fillStyle = "rgba(102, 204, 0, 0.7)", n(this, h).fillText("Cyber Universe Canvas", 4, 17), c(this, x, n(this, h).canvas.toDataURL()), {
      fingerprint: await g(n(this, x)),
      info: {
        image: n(this, x)
      }
    });
  }
}
h = new WeakMap(), x = new WeakMap();
var A, U;
const N = class N {
  constructor() {
    u(this, "name", "ColorGamut Feature");
    u(this, "enabled", !0);
    o(this, A, null);
    o(this, U, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of N.gamutList) {
      const a = `(color-gamut: ${t})`;
      if (matchMedia(a).matches) {
        c(this, A, `gamut: ${t}`), c(this, U, t);
        break;
      }
    }
    return n(this, A) === null ? null : {
      fingerprint: await g(n(this, A)),
      info: {
        colorGamut: n(this, U)
      }
    };
  }
};
A = new WeakMap(), U = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
u(N, "gamutList", ["rec2020", "p3", "srgb"]);
let Z = N;
var F, V;
const j = class j {
  constructor() {
    u(this, "name", "HDR Feature");
    u(this, "enabled", !0);
    o(this, F, null);
    o(this, V, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of j.hdrList) {
      const a = `(dynamic-range: ${t})`;
      if (matchMedia(a).matches) {
        c(this, F, `dynamic-range: ${t}`), c(this, V, t);
        break;
      }
    }
    return n(this, F) === null ? null : {
      fingerprint: await g(n(this, F)),
      info: {
        hdr: n(this, V)
      }
    };
  }
};
F = new WeakMap(), V = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
u(j, "hdrList", ["high", "standard"]);
let W = j;
var L, z, M;
class ft {
  constructor() {
    u(this, "name", "Hardware Concurrency Feature");
    u(this, "enabled", !0);
    o(this, L, null);
    o(this, z, null);
    o(this, M, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (c(this, L, navigator.hardwareConcurrency.toString()), c(this, M, navigator.hardwareConcurrency)), n(this, L) ? (c(this, z, "hardware concurrency: " + n(this, L)), {
      fingerprint: await g(n(this, z)),
      info: {
        hardwareConcurrency: n(this, M)
      }
    }) : null;
  }
}
L = new WeakMap(), z = new WeakMap(), M = new WeakMap();
var v, O;
class dt {
  constructor() {
    u(this, "name", "Languages Feature");
    u(this, "enabled", !0);
    o(this, v, []);
    o(this, O, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && n(this, v).push([navigator.language]), Array.isArray(navigator.languages) && n(this, v).push(navigator.languages), (t = n(this, v)) != null && t.length ? (c(this, O, JSON.stringify(n(this, v))), {
      fingerprint: await g(n(this, O)),
      info: {
        languages: n(this, O)
      }
    }) : null;
  }
}
v = new WeakMap(), O = new WeakMap();
var m, B;
class gt {
  constructor() {
    u(this, "name", "Screen resolution Feature");
    u(this, "enabled", !0);
    o(this, m, null);
    o(this, B, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const a = window.screen;
    return a ? (c(this, m, a), n(this, m) !== null) : !1;
  }
  async data() {
    if (n(this, m) === null) return null;
    const t = `${n(this, m).width} x ${n(this, m).height}`;
    return c(this, B, t), {
      fingerprint: await g(n(this, B)),
      info: {
        screenResolution: t
      }
    };
  }
}
m = new WeakMap(), B = new WeakMap();
var b, H, nt;
class pt {
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
      c(this, b, k(this, H, nt).call(this));
    return n(this, b) === null ? null : {
      fingerprint: await g(n(this, b)),
      info: {
        timezone: n(this, b)
      }
    };
  }
}
b = new WeakMap(), H = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
nt = function() {
  const a = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), r = a >= 0 ? "+" : "-", f = Math.floor(Math.abs(a) / 60).toString().padStart(2, "0"), i = (Math.abs(a) % 60).toString().padStart(2, "0");
  return `UTC${r}${f}:${i}`;
};
const wt = [
  new ct(),
  new ht(),
  new Z(),
  new W(),
  new ft(),
  new dt(),
  new gt(),
  new pt()
];
async function yt(e) {
  return e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null);
}
async function bt() {
  var f;
  const e = [], t = {}, a = {};
  for (const i of wt) {
    const p = await yt(i);
    if (!p) continue;
    const S = i.name.toLowerCase().replace(/\s/g, "");
    t[S] = {
      hash: p.fingerprint,
      value: JSON.stringify(p.info)
    }, e.push(p.fingerprint);
  }
  const r = await ut();
  if (r != null && r.ip) {
    const i = await g(r.ip);
    a.client_ip = { hash: i, value: r.ip }, e.push(i);
  }
  return {
    id: await g(JSON.stringify(e)),
    ip: (r == null ? void 0 : r.ip) || !1,
    useragent: ((f = r == null ? void 0 : r.headers) == null ? void 0 : f["user-agent"]) ?? !1,
    headers: (r == null ? void 0 : r.headers) ?? !1,
    rawData: t,
    serverFeature: a
  };
}
export {
  bt as collectFingerprint
};
