var ut = Object.defineProperty;
var et = (e) => {
  throw TypeError(e);
};
var lt = (e, t, n) => t in e ? ut(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => lt(e, typeof t != "symbol" ? t + "" : t, n), K = (e, t, n) => t.has(e) || et("Cannot " + n);
var a = (e, t, n) => (K(e, t, "read from private field"), n ? n.call(e) : t.get(e)), u = (e, t, n) => t.has(e) ? et("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), h = (e, t, n, r) => (K(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), B = (e, t, n) => (K(e, t, "access private method"), n);
const X = "http://192.168.0.73:5173";
function p(e) {
  function t(l, g) {
    return l >>> g | l << 32 - g;
  }
  const n = new TextEncoder().encode(e), r = Array.from(n), i = [
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
  ], f = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const k = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    k[7 - l] = f >>> l * 8 & 255;
  r.push(...k);
  const Y = [];
  for (let l = 0; l < r.length; l += 64)
    Y.push(r.slice(l, l + 64));
  return Y.forEach((l) => {
    const g = new Array(64);
    for (let o = 0; o < 16; o++)
      g[o] = l[o * 4] << 24 | l[o * 4 + 1] << 16 | l[o * 4 + 2] << 8 | l[o * 4 + 3];
    for (let o = 16; o < 64; o++) {
      const H = t(g[o - 15], 7) ^ t(g[o - 15], 18) ^ g[o - 15] >>> 3, Q = t(g[o - 2], 17) ^ t(g[o - 2], 19) ^ g[o - 2] >>> 10;
      g[o] = g[o - 16] + H + g[o - 7] + Q | 0;
    }
    let [w, $, L, _, y, M, q, G] = s;
    for (let o = 0; o < 64; o++) {
      const H = t(y, 6) ^ t(y, 11) ^ t(y, 25), Q = y & M ^ ~y & q, tt = G + H + Q + i[o] + g[o] | 0, it = t(w, 2) ^ t(w, 13) ^ t(w, 22), st = w & $ ^ w & L ^ $ & L, ot = it + st | 0;
      G = q, q = M, M = y, y = _ + tt | 0, _ = L, L = $, $ = w, w = tt + ot | 0;
    }
    s[0] = s[0] + w | 0, s[1] = s[1] + $ | 0, s[2] = s[2] + L | 0, s[3] = s[3] + _ | 0, s[4] = s[4] + y | 0, s[5] = s[5] + M | 0, s[6] = s[6] + q | 0, s[7] = s[7] + G | 0;
  }), s.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var S, V, D, T, nt, at;
class ct {
  constructor() {
    u(this, T);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    u(this, S, null);
    u(this, V, null);
    u(this, D, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (h(this, S, new t(1, a(this, D), 44100)), a(this, S) !== null) : !1;
  }
  async data() {
    if (a(this, S) === null) return null;
    const t = await B(this, T, nt).call(this, a(this, S));
    return t === null ? null : (h(this, V, t.toString()), {
      fingerprint: await p(a(this, V)),
      info: {
        audio: t
      }
    });
  }
}
S = new WeakMap(), V = new WeakMap(), D = new WeakMap(), T = new WeakSet(), nt = function(t) {
  return new Promise((n) => {
    const r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const i = t.createDynamicsCompressor();
    i.threshold.value = -50, i.knee.value = 40, i.ratio.value = 12, i.attack.value = 0, i.release.value = 0.2, r.connect(i), i.connect(t.destination), r.start(), t.oncomplete = (s) => {
      const f = s.renderedBuffer.getChannelData(0), k = B(this, T, at).call(this, f);
      n(k);
    }, t.startRendering();
  });
}, at = function(t) {
  let n = 0;
  for (let r = 0; r < t.length; ++r)
    n += Math.abs(t[r]);
  return n;
};
var d, F;
class ht {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    u(this, d, null);
    u(this, F, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (h(this, d, document.createElement("canvas").getContext("2d")), a(this, d) !== null) : !1;
  }
  async data() {
    return a(this, d) === null ? null : (a(this, d).textBaseline = "top", a(this, d).font = "14px 'Arial'", a(this, d).textBaseline = "alphabetic", a(this, d).fillStyle = "#f60", a(this, d).fillRect(100, 1, 55, 20), a(this, d).fillStyle = "#069", a(this, d).fillText("Cyber Universe Canvas", 2, 15), a(this, d).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, d).fillText("Cyber Universe Canvas", 4, 17), h(this, F, a(this, d).canvas.toDataURL()), {
      fingerprint: await p(a(this, F)),
      info: {
        image: a(this, F)
      }
    });
  }
}
d = new WeakMap(), F = new WeakMap();
var A, E;
const P = class P {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    u(this, A, null);
    u(this, E, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of P.gamutList) {
      const n = `(color-gamut: ${t})`;
      if (matchMedia(n).matches) {
        h(this, A, `gamut: ${t}`), h(this, E, t);
        break;
      }
    }
    return a(this, A) === null ? null : {
      fingerprint: await p(a(this, A)),
      info: {
        colorGamut: a(this, E)
      }
    };
  }
};
A = new WeakMap(), E = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(P, "gamutList", ["rec2020", "p3", "srgb"]);
let Z = P;
var x, I, z;
class ft {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    u(this, x, null);
    u(this, I, null);
    u(this, z, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, x, navigator.hardwareConcurrency.toString()), h(this, z, navigator.hardwareConcurrency)), a(this, x) ? (h(this, I, "hardware concurrency: " + a(this, x)), {
      fingerprint: await p(a(this, I)),
      info: {
        hardwareConcurrency: a(this, z)
      }
    }) : null;
  }
}
x = new WeakMap(), I = new WeakMap(), z = new WeakMap();
var O, U;
const J = class J {
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
    for (const t of J.hdrList) {
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
c(J, "hdrList", ["high", "standard"]);
let W = J;
var v, R;
class dt {
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
var b, j;
class gt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    u(this, b, null);
    u(this, j, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const n = window.screen;
    return n ? (h(this, b, n), a(this, b) !== null) : !1;
  }
  async data() {
    if (a(this, b) === null) return null;
    const t = `${a(this, b).width} x ${a(this, b).height}`;
    return h(this, j, t), {
      fingerprint: await p(a(this, j)),
      info: {
        screenResolution: t
      }
    };
  }
}
b = new WeakMap(), j = new WeakMap();
var C, N, rt;
class pt {
  constructor() {
    u(this, N);
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
      h(this, C, B(this, N, rt).call(this));
    return a(this, C) === null ? null : {
      fingerprint: await p(a(this, C)),
      info: {
        timezone: a(this, C)
      }
    };
  }
}
C = new WeakMap(), N = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
rt = function() {
  const n = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), r = n >= 0 ? "+" : "-", i = Math.floor(Math.abs(n) / 60).toString().padStart(2, "0"), s = (Math.abs(n) % 60).toString().padStart(2, "0");
  return `UTC${r}${i}:${s}`;
};
async function At(e) {
  const t = e.id;
  if (!t) throw new Error("visitorId is required when tracking");
  wt([], t);
}
function wt(e, t) {
  e.push({
    type: "pageView",
    createAt: (/* @__PURE__ */ new Date()).toISOString(),
    details: {
      url: window.location.href,
      referrer: document.referrer
    }
  }), yt({ visitorId: t, eventLogs: e });
}
async function yt(e) {
  try {
    await fetch(`${X}/api/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
  } catch (t) {
    console.error("Error sending logs:", t);
  }
}
const mt = async (e) => e.enabled ? await e.support() ? await e.data() : (console.log(`Feature ${e.name} is not supported`), null) : (console.log(`Feature ${e.name} is disabled`), null), xt = async () => {
  const e = await bt();
  return await (await (await vt(e)).json()).data;
}, bt = async () => {
  const e = [
    new ct(),
    new ht(),
    new Z(),
    new W(),
    new ft(),
    new dt(),
    new gt(),
    new pt()
  ], t = [], n = {}, r = {};
  for (const s of e) {
    const f = await mt(s);
    await m(f, "audio", "audio", n), await m(f, "canvas", "image", n), await m(f, "color gamut", "colorGamut", n), await m(f, "hdr", "hdr", n), await m(
      f,
      "hardware concurrency",
      "hardwareConcurrency",
      n
    ), await m(f, "languages", "languages", n), await m(f, "screen resolution", "screenResolution", n), await m(f, "timezone", "timezone", n), f != null && f.fingerprint && t.push(f.fingerprint);
  }
  const i = await St();
  return i && await Ct(r, t, i), {
    id: await p(JSON.stringify(t)),
    ip: (i == null ? void 0 : i.ip) || !1,
    useragent: (i == null ? void 0 : i.headers["user-agent"]) || !1,
    headers: (i == null ? void 0 : i.headers) || !1,
    rawData: n,
    serverFeature: r
  };
};
function m(e, t, n, r) {
  var i;
  (i = e == null ? void 0 : e.info) != null && i[n] && (r[t] = {
    hash: e.fingerprint,
    value: e.info[n]
  });
}
async function Ct(e, t, n) {
  if (n != null && n.ip) {
    const r = await p(n.ip);
    e["client ip"] = {
      hash: r,
      value: n.ip
    }, t.push(r);
  }
}
async function St() {
  try {
    const t = await (await fetch(`${X}/api/fingerprint`)).json();
    if (!t)
      throw new Error("failed to get user request info");
    return t.serverData;
  } catch (e) {
    console.error("failed to get user request info", e);
  }
}
async function vt(e) {
  return fetch(`${X}/api/fingerprint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  });
}
export {
  xt as fpPromise,
  At as tracking
};
