var lt = Object.defineProperty;
var et = (n) => {
  throw TypeError(n);
};
var ut = (n, t, e) => t in n ? lt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var c = (n, t, e) => ut(n, typeof t != "symbol" ? t + "" : t, e), K = (n, t, e) => t.has(n) || et("Cannot " + e);
var a = (n, t, e) => (K(n, t, "read from private field"), e ? e.call(n) : t.get(n)), l = (n, t, e) => t.has(n) ? et("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), h = (n, t, e, i) => (K(n, t, "write to private field"), i ? i.call(n, e) : t.set(n, e), e), B = (n, t, e) => (K(n, t, "access private method"), e);
const Z = "http://192.168.0.73:5173";
function p(n) {
  function t(u, g) {
    return u >>> g | u << 32 - g;
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
  ], f = i.length * 8;
  for (i.push(128); (i.length * 8 + 64) % 512 !== 0; )
    i.push(0);
  const j = new Array(8).fill(0);
  for (let u = 0; u < 8; u++)
    j[7 - u] = f >>> u * 8 & 255;
  i.push(...j);
  const W = [];
  for (let u = 0; u < i.length; u += 64)
    W.push(i.slice(u, u + 64));
  return W.forEach((u) => {
    const g = new Array(64);
    for (let o = 0; o < 16; o++)
      g[o] = u[o * 4] << 24 | u[o * 4 + 1] << 16 | u[o * 4 + 2] << 8 | u[o * 4 + 3];
    for (let o = 16; o < 64; o++) {
      const H = t(g[o - 15], 7) ^ t(g[o - 15], 18) ^ g[o - 15] >>> 3, Q = t(g[o - 2], 17) ^ t(g[o - 2], 19) ^ g[o - 2] >>> 10;
      g[o] = g[o - 16] + H + g[o - 7] + Q | 0;
    }
    let [w, $, L, _, y, D, M, G] = s;
    for (let o = 0; o < 64; o++) {
      const H = t(y, 6) ^ t(y, 11) ^ t(y, 25), Q = y & D ^ ~y & M, tt = G + H + Q + r[o] + g[o] | 0, rt = t(w, 2) ^ t(w, 13) ^ t(w, 22), st = w & $ ^ w & L ^ $ & L, ot = rt + st | 0;
      G = M, M = D, D = y, y = _ + tt | 0, _ = L, L = $, $ = w, w = tt + ot | 0;
    }
    s[0] = s[0] + w | 0, s[1] = s[1] + $ | 0, s[2] = s[2] + L | 0, s[3] = s[3] + _ | 0, s[4] = s[4] + y | 0, s[5] = s[5] + D | 0, s[6] = s[6] + M | 0, s[7] = s[7] + G | 0;
  }), s.map((u) => (u >>> 0).toString(16).padStart(8, "0")).join("");
}
var C, V, N, O, nt, at;
class ct {
  constructor() {
    l(this, O);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    l(this, C, null);
    l(this, V, null);
    l(this, N, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const t = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return t ? (h(this, C, new t(1, a(this, N), 44100)), a(this, C) !== null) : !1;
  }
  async data() {
    if (a(this, C) === null) return null;
    const t = await B(this, O, nt).call(this, a(this, C));
    return t === null ? null : (h(this, V, t.toString()), {
      fingerprint: await p(a(this, V)),
      info: {
        audio: t
      }
    });
  }
}
C = new WeakMap(), V = new WeakMap(), N = new WeakMap(), O = new WeakSet(), nt = function(t) {
  return new Promise((e) => {
    const i = t.createOscillator();
    i.type = "triangle", i.frequency.value = 1e4;
    const r = t.createDynamicsCompressor();
    r.threshold.value = -50, r.knee.value = 40, r.ratio.value = 12, r.attack.value = 0, r.release.value = 0.2, i.connect(r), r.connect(t.destination), i.start(), t.oncomplete = (s) => {
      const f = s.renderedBuffer.getChannelData(0), j = B(this, O, at).call(this, f);
      e(j);
    }, t.startRendering();
  });
}, at = function(t) {
  let e = 0;
  for (let i = 0; i < t.length; ++i)
    e += Math.abs(t[i]);
  return e;
};
var d, S;
class ht {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    l(this, d, null);
    l(this, S, null);
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
var x, z;
const P = class P {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    l(this, x, null);
    l(this, z, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of P.gamutList) {
      const e = `(color-gamut: ${t})`;
      if (matchMedia(e).matches) {
        h(this, x, `gamut: ${t}`), h(this, z, t);
        break;
      }
    }
    return a(this, x) === null ? null : {
      fingerprint: await p(a(this, x)),
      info: {
        colorGamut: a(this, z)
      }
    };
  }
};
x = new WeakMap(), z = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(P, "gamutList", ["rec2020", "p3", "srgb"]);
let X = P;
var A, E, k;
class ft {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    l(this, A, null);
    l(this, E, null);
    l(this, k, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, A, navigator.hardwareConcurrency.toString()), h(this, k, navigator.hardwareConcurrency)), a(this, A) ? (h(this, E, "hardware concurrency: " + a(this, A)), {
      fingerprint: await p(a(this, E)),
      info: {
        hardwareConcurrency: a(this, k)
      }
    }) : null;
  }
}
A = new WeakMap(), E = new WeakMap(), k = new WeakMap();
var R, I;
const q = class q {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    l(this, R, null);
    l(this, I, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const t of q.hdrList) {
      const e = `(dynamic-range: ${t})`;
      if (matchMedia(e).matches) {
        h(this, R, `dynamic-range: ${t}`), h(this, I, t);
        break;
      }
    }
    return a(this, R) === null ? null : {
      fingerprint: await p(a(this, R)),
      info: {
        hdr: a(this, I)
      }
    };
  }
};
R = new WeakMap(), I = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(q, "hdrList", ["high", "standard"]);
let Y = q;
var F, T;
class dt {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    l(this, F, []);
    l(this, T, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var t;
    return navigator.language && a(this, F).push([navigator.language]), Array.isArray(navigator.languages) && a(this, F).push(navigator.languages), (t = a(this, F)) != null && t.length ? (h(this, T, JSON.stringify(a(this, F))), {
      fingerprint: await p(a(this, T)),
      info: {
        languages: a(this, T)
      }
    }) : null;
  }
}
F = new WeakMap(), T = new WeakMap();
var v, U;
class gt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    l(this, v, null);
    l(this, U, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const e = window.screen;
    return e ? (h(this, v, e), a(this, v) !== null) : !1;
  }
  async data() {
    if (a(this, v) === null) return null;
    const t = `${a(this, v).width} x ${a(this, v).height}`;
    return h(this, U, t), {
      fingerprint: await p(a(this, U)),
      info: {
        screenResolution: t
      }
    };
  }
}
v = new WeakMap(), U = new WeakMap();
var b, J, it;
class pt {
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
      h(this, b, B(this, J, it).call(this));
    return a(this, b) === null ? null : {
      fingerprint: await p(a(this, b)),
      info: {
        timezone: a(this, b)
      }
    };
  }
}
b = new WeakMap(), J = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
it = function() {
  const e = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), i = e >= 0 ? "+" : "-", r = Math.floor(Math.abs(e) / 60).toString().padStart(2, "0"), s = (Math.abs(e) % 60).toString().padStart(2, "0");
  return `UTC${i}${r}:${s}`;
};
async function Ft(n) {
  const t = n.id;
  document && t && document.addEventListener("click", function(e) {
    const i = e.target;
    if (!i) return;
    const r = {
      visitorId: t,
      eventType: "click",
      eventTarget: i.tagName,
      eventData: {
        x: e.clientX,
        y: e.clientY
      },
      url: window.location.href
    };
    console.log("eventData", r), fetch(`${Z}/api/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(r)
    });
  });
}
const wt = async (n) => n.enabled ? await n.support() ? await n.data() : (console.log(`Feature ${n.name} is not supported`), null) : (console.log(`Feature ${n.name} is disabled`), null), St = async () => {
  const n = await yt(), e = await (await bt(n)).json();
  return console.log("createVisitorRes", e), await e.data;
}, yt = async () => {
  const n = [
    new ct(),
    new ht(),
    new X(),
    new Y(),
    new ft(),
    new dt(),
    new gt(),
    new pt()
  ], t = [], e = {}, i = {};
  for (const s of n) {
    const f = await wt(s);
    await m(f, "audio", "audio", e), await m(f, "canvas", "image", e), await m(f, "color gamut", "colorGamut", e), await m(f, "hdr", "hdr", e), await m(
      f,
      "hardware concurrency",
      "hardwareConcurrency",
      e
    ), await m(f, "languages", "languages", e), await m(f, "screen resolution", "screenResolution", e), await m(f, "timezone", "timezone", e), f != null && f.fingerprint && t.push(f.fingerprint);
  }
  const r = await vt();
  return r && await mt(i, t, r), {
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
async function mt(n, t, e) {
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
    const t = await (await fetch(`${Z}/api/fingerprint`)).json();
    if (!t)
      throw new Error("failed to get user request info");
    return t.serverData;
  } catch (n) {
    console.error("failed to get user request info", n);
  }
}
async function bt(n) {
  return fetch(`${Z}/api/fingerprint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(n)
  });
}
export {
  St as fpPromise,
  Ft as tracking
};
