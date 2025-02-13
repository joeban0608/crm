var ut = Object.defineProperty;
var et = (n) => {
  throw TypeError(n);
};
var lt = (n, t, e) => t in n ? ut(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var c = (n, t, e) => lt(n, typeof t != "symbol" ? t + "" : t, e), K = (n, t, e) => t.has(n) || et("Cannot " + e);
var a = (n, t, e) => (K(n, t, "read from private field"), e ? e.call(n) : t.get(n)), u = (n, t, e) => t.has(n) ? et("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), f = (n, t, e, i) => (K(n, t, "write to private field"), i ? i.call(n, e) : t.set(n, e), e), q = (n, t, e) => (K(n, t, "access private method"), e);
const X = "http://192.168.0.73:5173";
function p(n) {
  function t(l, g) {
    return l >>> g | l << 32 - g;
  }
  const e = new TextEncoder().encode(n), i = Array.from(e), r = [
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
  ], h = i.length * 8;
  for (i.push(128); (i.length * 8 + 64) % 512 !== 0; )
    i.push(0);
  const j = new Array(8).fill(0);
  for (let l = 0; l < 8; l++)
    j[7 - l] = h >>> l * 8 & 255;
  i.push(...j);
  const Y = [];
  for (let l = 0; l < i.length; l += 64)
    Y.push(i.slice(l, l + 64));
  return Y.forEach((l) => {
    const g = new Array(64);
    for (let o = 0; o < 16; o++)
      g[o] = l[o * 4] << 24 | l[o * 4 + 1] << 16 | l[o * 4 + 2] << 8 | l[o * 4 + 3];
    for (let o = 16; o < 64; o++) {
      const H = t(g[o - 15], 7) ^ t(g[o - 15], 18) ^ g[o - 15] >>> 3, Q = t(g[o - 2], 17) ^ t(g[o - 2], 19) ^ g[o - 2] >>> 10;
      g[o] = g[o - 16] + H + g[o - 7] + Q | 0;
    }
    let [w, T, $, _, y, D, M, G] = s;
    for (let o = 0; o < 64; o++) {
      const H = t(y, 6) ^ t(y, 11) ^ t(y, 25), Q = y & D ^ ~y & M, tt = G + H + Q + r[o] + g[o] | 0, rt = t(w, 2) ^ t(w, 13) ^ t(w, 22), st = w & T ^ w & $ ^ T & $, ot = rt + st | 0;
      G = M, M = D, D = y, y = _ + tt | 0, _ = $, $ = T, T = w, w = tt + ot | 0;
    }
    s[0] = s[0] + w | 0, s[1] = s[1] + T | 0, s[2] = s[2] + $ | 0, s[3] = s[3] + _ | 0, s[4] = s[4] + y | 0, s[5] = s[5] + D | 0, s[6] = s[6] + M | 0, s[7] = s[7] + G | 0;
  }), s.map((l) => (l >>> 0).toString(16).padStart(8, "0")).join("");
}
var C, E, B, L, nt, at;
class ct {
  constructor() {
    u(this, L);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    u(this, C, null);
    u(this, E, null);
    u(this, B, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (f(this, C, new t(1, a(this, B), 44100)), a(this, C) !== null) : !1;
  }
  async data() {
    if (a(this, C) === null) return null;
    const t = await q(this, L, nt).call(this, a(this, C));
    return t === null ? null : (f(this, E, t.toString()), {
      fingerprint: await p(a(this, E)),
      info: {
        audio: t
      }
    });
  }
}
C = new WeakMap(), E = new WeakMap(), B = new WeakMap(), L = new WeakSet(), nt = function(t) {
  return new Promise((e) => {
    const i = t.createOscillator();
    i.type = "triangle", i.frequency.value = 1e4;
    const r = t.createDynamicsCompressor();
    r.threshold.value = -50, r.knee.value = 40, r.ratio.value = 12, r.attack.value = 0, r.release.value = 0.2, i.connect(r), r.connect(t.destination), i.start(), t.oncomplete = (s) => {
      const h = s.renderedBuffer.getChannelData(0), j = q(this, L, at).call(this, h);
      e(j);
    }, t.startRendering();
  });
}, at = function(t) {
  let e = 0;
  for (let i = 0; i < t.length; ++i)
    e += Math.abs(t[i]);
  return e;
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
    return document ? (f(this, d, document.createElement("canvas").getContext("2d")), a(this, d) !== null) : !1;
  }
  async data() {
    return a(this, d) === null ? null : (a(this, d).textBaseline = "top", a(this, d).font = "14px 'Arial'", a(this, d).textBaseline = "alphabetic", a(this, d).fillStyle = "#f60", a(this, d).fillRect(100, 1, 55, 20), a(this, d).fillStyle = "#069", a(this, d).fillText("Cyber Universe Canvas", 2, 15), a(this, d).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, d).fillText("Cyber Universe Canvas", 4, 17), f(this, F, a(this, d).canvas.toDataURL()), {
      fingerprint: await p(a(this, F)),
      info: {
        image: a(this, F)
      }
    });
  }
}
d = new WeakMap(), F = new WeakMap();
var A, V;
const P = class P {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    u(this, A, null);
    u(this, V, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of P.gamutList) {
      const e = `(color-gamut: ${t})`;
      if (matchMedia(e).matches) {
        f(this, A, `gamut: ${t}`), f(this, V, t);
        break;
      }
    }
    return a(this, A) === null ? null : {
      fingerprint: await p(a(this, A)),
      info: {
        colorGamut: a(this, V)
      }
    };
  }
};
A = new WeakMap(), V = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(P, "gamutList", ["rec2020", "p3", "srgb"]);
let W = P;
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
    return navigator.hardwareConcurrency && (f(this, x, navigator.hardwareConcurrency.toString()), f(this, z, navigator.hardwareConcurrency)), a(this, x) ? (f(this, I, "hardware concurrency: " + a(this, x)), {
      fingerprint: await p(a(this, I)),
      info: {
        hardwareConcurrency: a(this, z)
      }
    }) : null;
  }
}
x = new WeakMap(), I = new WeakMap(), z = new WeakMap();
var O, k;
const J = class J {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    u(this, O, null);
    u(this, k, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of J.hdrList) {
      const e = `(dynamic-range: ${t})`;
      if (matchMedia(e).matches) {
        f(this, O, `dynamic-range: ${t}`), f(this, k, t);
        break;
      }
    }
    return a(this, O) === null ? null : {
      fingerprint: await p(a(this, O)),
      info: {
        hdr: a(this, k)
      }
    };
  }
};
O = new WeakMap(), k = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(J, "hdrList", ["high", "standard"]);
let Z = J;
var S, R;
class dt {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    u(this, S, []);
    u(this, R, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && a(this, S).push([navigator.language]), Array.isArray(navigator.languages) && a(this, S).push(navigator.languages), (t = a(this, S)) != null && t.length ? (f(this, R, JSON.stringify(a(this, S))), {
      fingerprint: await p(a(this, R)),
      info: {
        languages: a(this, R)
      }
    }) : null;
  }
}
S = new WeakMap(), R = new WeakMap();
var b, U;
class gt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    u(this, b, null);
    u(this, U, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const e = window.screen;
    return e ? (f(this, b, e), a(this, b) !== null) : !1;
  }
  async data() {
    if (a(this, b) === null) return null;
    const t = `${a(this, b).width} x ${a(this, b).height}`;
    return f(this, U, t), {
      fingerprint: await p(a(this, U)),
      info: {
        screenResolution: t
      }
    };
  }
}
b = new WeakMap(), U = new WeakMap();
var v, N, it;
class pt {
  constructor() {
    u(this, N);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    u(this, v, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const t = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      f(this, v, t);
    } else
      f(this, v, q(this, N, it).call(this));
    return a(this, v) === null ? null : {
      fingerprint: await p(a(this, v)),
      info: {
        timezone: a(this, v)
      }
    };
  }
}
v = new WeakMap(), N = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
it = function() {
  const e = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), i = e >= 0 ? "+" : "-", r = Math.floor(Math.abs(e) / 60).toString().padStart(2, "0"), s = (Math.abs(e) % 60).toString().padStart(2, "0");
  return `UTC${i}${r}:${s}`;
};
async function Ft(n) {
  const t = n.id;
  if (!t) throw new Error("visitorId is required when tracking");
  const e = [], i = /* @__PURE__ */ new Set();
  for (const r in window)
    r.startsWith("on") && i.add(r.slice(2));
  i.forEach((r) => {
    window.addEventListener(
      r,
      (s) => {
        if (e.push({ type: s.type, createAt: (/* @__PURE__ */ new Date()).toISOString(), details: s }), e.length >= 1e3) {
          const h = {
            visitorId: t,
            eventLogs: e,
            url: window.location.href,
            referrer: document.referrer
          };
          wt(h), e.length = 0;
        }
      },
      !0
      // `true` : addEventListener when capture event (https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener)
    );
  });
}
async function wt(n) {
  return fetch(`${X}/api/log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(n)
  });
}
const yt = async (n) => n.enabled ? await n.support() ? await n.data() : (console.log(`Feature ${n.name} is not supported`), null) : (console.log(`Feature ${n.name} is disabled`), null), At = async () => {
  const n = await mt();
  return await (await (await Ct(n)).json()).data;
}, mt = async () => {
  const n = [
    new ct(),
    new ht(),
    new W(),
    new Z(),
    new ft(),
    new dt(),
    new gt(),
    new pt()
  ], t = [], e = {}, i = {};
  for (const s of n) {
    const h = await yt(s);
    await m(h, "audio", "audio", e), await m(h, "canvas", "image", e), await m(h, "color gamut", "colorGamut", e), await m(h, "hdr", "hdr", e), await m(
      h,
      "hardware concurrency",
      "hardwareConcurrency",
      e
    ), await m(h, "languages", "languages", e), await m(h, "screen resolution", "screenResolution", e), await m(h, "timezone", "timezone", e), h != null && h.fingerprint && t.push(h.fingerprint);
  }
  const r = await vt();
  return r && await bt(i, t, r), {
    id: await p(JSON.stringify(t)),
    ip: (r == null ? void 0 : r.ip) || !1,
    useragent: (r == null ? void 0 : r.headers["user-agent"]) || !1,
    headers: (r == null ? void 0 : r.headers) || !1,
    rawData: e,
    serverFeature: i
  };
};
function m(n, t, e, i) {
  var r;
  (r = n == null ? void 0 : n.info) != null && r[e] && (i[t] = {
    hash: n.fingerprint,
    value: n.info[e]
  });
}
async function bt(n, t, e) {
  if (e != null && e.ip) {
    const i = await p(e.ip);
    n["client ip"] = {
      hash: i,
      value: e.ip
    }, t.push(i);
  }
}
async function vt() {
  try {
    const t = await (await fetch(`${X}/api/fingerprint`)).json();
    if (!t)
      throw new Error("failed to get user request info");
    return t.serverData;
  } catch (n) {
    console.error("failed to get user request info", n);
  }
}
async function Ct(n) {
  return fetch(`${X}/api/fingerprint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(n)
  });
}
export {
  At as fpPromise,
  Ft as tracking
};
