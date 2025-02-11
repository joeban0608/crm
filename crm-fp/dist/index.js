var ot = Object.defineProperty;
var tt = (e) => {
  throw TypeError(e);
};
var ut = (e, t, n) => t in e ? ot(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => ut(e, typeof t != "symbol" ? t + "" : t, n), Z = (e, t, n) => t.has(e) || tt("Cannot " + n);
var a = (e, t, n) => (Z(e, t, "read from private field"), n ? n.call(e) : t.get(e)), u = (e, t, n) => t.has(e) ? tt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), h = (e, t, n, i) => (Z(e, t, "write to private field"), i ? i.call(e, n) : t.set(e, n), n), B = (e, t, n) => (Z(e, t, "access private method"), n);
function p(e) {
  function t(l, g) {
    return l >>> g | l << 32 - g;
  }
  const n = new TextEncoder().encode(e), i = Array.from(n), r = [
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
  ], s = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], f = i.length * 8;
  for (i.push(128); (i.length * 8 + 64) % 512 !== 0; )
    i.push(0);
  const j = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    j[7 - l] = f >>> l * 8 & 255;
  i.push(...j);
  const X = [];
  for (let l = 0; l < i.length; l += 64)
    X.push(i.slice(l, l + 64));
  return X.forEach((l) => {
    const g = new Array(64);
    for (let o = 0; o < 16; o++)
      g[o] = l[o * 4] << 24 | l[o * 4 + 1] << 16 | l[o * 4 + 2] << 8 | l[o * 4 + 3];
    for (let o = 16; o < 64; o++) {
      const Q = t(g[o - 15], 7) ^ t(g[o - 15], 18) ^ g[o - 15] >>> 3, K = t(g[o - 2], 17) ^ t(g[o - 2], 19) ^ g[o - 2] >>> 10;
      g[o] = g[o - 16] + Q + g[o - 7] + K | 0;
    }
    let [w, $, L, G, y, k, q, H] = s;
    for (let o = 0; o < 64; o++) {
      const Q = t(y, 6) ^ t(y, 11) ^ t(y, 25), K = y & k ^ ~y & q, Y = H + Q + K + r[o] + g[o] | 0, it = t(w, 2) ^ t(w, 13) ^ t(w, 22), rt = w & $ ^ w & L ^ $ & L, st = it + rt | 0;
      H = q, q = k, k = y, y = G + Y | 0, G = L, L = $, $ = w, w = Y + st | 0;
    }
    s[0] = s[0] + w | 0, s[1] = s[1] + $ | 0, s[2] = s[2] + L | 0, s[3] = s[3] + G | 0, s[4] = s[4] + y | 0, s[5] = s[5] + k | 0, s[6] = s[6] + q | 0, s[7] = s[7] + H | 0;
  }), s.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var F, z, J, T, et, nt;
class lt {
  constructor() {
    u(this, T);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    u(this, F, null);
    u(this, z, null);
    u(this, J, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (h(this, F, new t(1, a(this, J), 44100)), a(this, F) !== null) : !1;
  }
  async data() {
    if (a(this, F) === null) return null;
    const t = await B(this, T, et).call(this, a(this, F));
    return t === null ? null : (h(this, z, t.toString()), {
      fingerprint: await p(a(this, z)),
      info: {
        audio: t
      }
    });
  }
}
F = new WeakMap(), z = new WeakMap(), J = new WeakMap(), T = new WeakSet(), et = function(t) {
  return new Promise((n) => {
    const i = t.createOscillator();
    i.type = "triangle", i.frequency.value = 1e4;
    const r = t.createDynamicsCompressor();
    r.threshold.value = -50, r.knee.value = 40, r.ratio.value = 12, r.attack.value = 0, r.release.value = 0.2, i.connect(r), r.connect(t.destination), i.start(), t.oncomplete = (s) => {
      const f = s.renderedBuffer.getChannelData(0), j = B(this, T, nt).call(this, f);
      n(j);
    }, t.startRendering();
  });
}, nt = function(t) {
  let n = 0;
  for (let i = 0; i < t.length; ++i)
    n += Math.abs(t[i]);
  return n;
};
var d, S;
class ct {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    u(this, d, null);
    u(this, S, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (h(this, d, document.createElement("canvas").getContext("2d")), a(this, d) !== null) : !1;
  }
  async data() {
    return a(this, d) === null ? null : (a(this, d).textBaseline = "top", a(this, d).font = "14px 'Arial'", a(this, d).textBaseline = "alphabetic", a(this, d).fillStyle = "#f60", a(this, d).fillRect(100, 1, 55, 20), a(this, d).fillStyle = "#069", a(this, d).fillText("Cyber Universe Canvas", 2, 15), a(this, d).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, d).fillText("Cyber Universe Canvas", 4, 17), h(this, S, a(this, d).canvas.toDataURL()), {
      fingerprint: await p(a(this, S)),
      info: {
        image: a(this, S)
      }
    });
  }
}
d = new WeakMap(), S = new WeakMap();
var x, V;
const N = class N {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    u(this, x, null);
    u(this, V, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of N.gamutList) {
      const n = `(color-gamut: ${t})`;
      if (matchMedia(n).matches) {
        h(this, x, `gamut: ${t}`), h(this, V, t);
        break;
      }
    }
    return a(this, x) === null ? null : {
      fingerprint: await p(a(this, x)),
      info: {
        colorGamut: a(this, V)
      }
    };
  }
};
x = new WeakMap(), V = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(N, "gamutList", ["rec2020", "p3", "srgb"]);
let _ = N;
var A, E, M;
class ht {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    u(this, A, null);
    u(this, E, null);
    u(this, M, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, A, navigator.hardwareConcurrency.toString()), h(this, M, navigator.hardwareConcurrency)), a(this, A) ? (h(this, E, "hardware concurrency: " + a(this, A)), {
      fingerprint: await p(a(this, E)),
      info: {
        hardwareConcurrency: a(this, M)
      }
    }) : null;
  }
}
A = new WeakMap(), E = new WeakMap(), M = new WeakMap();
var O, U;
const P = class P {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    u(this, O, null);
    u(this, U, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of P.hdrList) {
      const n = `(dynamic-range: ${t})`;
      if (matchMedia(n).matches) {
        h(this, O, `dynamic-range: ${t}`), h(this, U, t);
        break;
      }
    }
    return a(this, O) === null ? null : {
      fingerprint: await p(a(this, O)),
      info: {
        hdr: a(this, U)
      }
    };
  }
};
O = new WeakMap(), U = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(P, "hdrList", ["high", "standard"]);
let W = P;
var v, R;
class ft {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    u(this, v, []);
    u(this, R, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && a(this, v).push([navigator.language]), Array.isArray(navigator.languages) && a(this, v).push(navigator.languages), (t = a(this, v)) != null && t.length ? (h(this, R, JSON.stringify(a(this, v))), {
      fingerprint: await p(a(this, R)),
      info: {
        languages: a(this, R)
      }
    }) : null;
  }
}
v = new WeakMap(), R = new WeakMap();
var b, I;
class dt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    u(this, b, null);
    u(this, I, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const n = window.screen;
    return n ? (h(this, b, n), a(this, b) !== null) : !1;
  }
  async data() {
    if (a(this, b) === null) return null;
    const t = `${a(this, b).width} x ${a(this, b).height}`;
    return h(this, I, t), {
      fingerprint: await p(a(this, I)),
      info: {
        screenResolution: t
      }
    };
  }
}
b = new WeakMap(), I = new WeakMap();
var C, D, at;
class gt {
  constructor() {
    u(this, D);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    u(this, C, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      h(this, C, t);
    } else
      h(this, C, B(this, D, at).call(this));
    return a(this, C) === null ? null : {
      fingerprint: await p(a(this, C)),
      info: {
        timezone: a(this, C)
      }
    };
  }
}
C = new WeakMap(), D = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
at = function() {
  const n = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), i = n >= 0 ? "+" : "-", r = Math.floor(Math.abs(n) / 60).toString().padStart(2, "0"), s = (Math.abs(n) % 60).toString().padStart(2, "0");
  return `UTC${i}${r}:${s}`;
};
const pt = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), Ft = async () => {
  const e = await wt();
  return await bt(e), e;
}, wt = async () => {
  const e = [
    new lt(),
    new ct(),
    new _(),
    new W(),
    new ht(),
    new ft(),
    new dt(),
    new gt()
  ], t = [], n = {}, i = {};
  for (const s of e) {
    const f = await pt(s);
    await m(f, "audio", "audio", n), await m(f, "canvas", "image", n), await m(f, "color gamut", "colorGamut", n), await m(f, "hdr", "hdr", n), await m(
      f,
      "hardware concurrency",
      "hardwareConcurrency",
      n
    ), await m(f, "languages", "languages", n), await m(f, "screen resolution", "screenResolution", n), await m(f, "timezone", "timezone", n), f != null && f.fingerprint && t.push(f.fingerprint);
  }
  const r = await mt();
  return r && await yt(i, t, r), {
    id: await p(JSON.stringify(t)),
    ip: (r == null ? void 0 : r.ip) || !1,
    useragent: (r == null ? void 0 : r.headers["user-agent"]) || !1,
    headers: (r == null ? void 0 : r.headers) || !1,
    rawData: n,
    serverFeature: i
  };
};
function m(e, t, n, i) {
  var r;
  (r = e == null ? void 0 : e.info) != null && r[n] && (i[t] = {
    hash: e.fingerprint,
    value: e.info[n]
  });
}
async function yt(e, t, n) {
  if (n != null && n.ip) {
    const i = await p(n.ip);
    e["client ip"] = {
      hash: i,
      value: n.ip
    }, t.push(i);
  }
}
async function mt() {
  try {
    const t = await (await fetch("http://192.168.0.73:5173/api/fingerprint")).json();
    if (!t)
      throw new Error("failed to get user request info");
    return t.serverData;
  } catch (e) {
    console.error("failed to get user request info", e);
  }
}
async function bt(e) {
  fetch("/api/fingerprint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  });
}
export {
  Ft as fpPromise
};
