var gt = Object.defineProperty;
var at = (t) => {
  throw TypeError(t);
};
var dt = (t, e, n) => e in t ? gt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => dt(t, typeof e != "symbol" ? e + "" : e, n), Z = (t, e, n) => e.has(t) || at("Cannot " + n);
var a = (t, e, n) => (Z(t, e, "read from private field"), n ? n.call(t) : e.get(t)), l = (t, e, n) => e.has(t) ? at("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), h = (t, e, n, r) => (Z(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), B = (t, e, n) => (Z(t, e, "access private method"), n);
const tt = "http://192.168.0.73:5173";
function p(t) {
  function e(u, d) {
    return u >>> d | u << 32 - d;
  }
  const n = new TextEncoder().encode(t), r = Array.from(n), i = [
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
  const P = new Array(8).fill(0);
  for (let u = 0; u < 8; u++)
    P[7 - u] = f >>> u * 8 & 255;
  r.push(...P);
  const et = [];
  for (let u = 0; u < r.length; u += 64)
    et.push(r.slice(u, u + 64));
  return et.forEach((u) => {
    const d = new Array(64);
    for (let o = 0; o < 16; o++)
      d[o] = u[o * 4] << 24 | u[o * 4 + 1] << 16 | u[o * 4 + 2] << 8 | u[o * 4 + 3];
    for (let o = 16; o < 64; o++) {
      const Q = e(d[o - 15], 7) ^ e(d[o - 15], 18) ^ d[o - 15] >>> 3, Y = e(d[o - 2], 17) ^ e(d[o - 2], 19) ^ d[o - 2] >>> 10;
      d[o] = d[o - 16] + Q + d[o - 7] + Y | 0;
    }
    let [w, O, R, X, m, U, j, G] = s;
    for (let o = 0; o < 64; o++) {
      const Q = e(m, 6) ^ e(m, 11) ^ e(m, 25), Y = m & U ^ ~m & j, nt = G + Q + Y + i[o] + d[o] | 0, ct = e(w, 2) ^ e(w, 13) ^ e(w, 22), ht = w & O ^ w & R ^ O & R, ft = ct + ht | 0;
      G = j, j = U, U = m, m = X + nt | 0, X = R, R = O, O = w, w = nt + ft | 0;
    }
    s[0] = s[0] + w | 0, s[1] = s[1] + O | 0, s[2] = s[2] + R | 0, s[3] = s[3] + X | 0, s[4] = s[4] + m | 0, s[5] = s[5] + U | 0, s[6] = s[6] + j | 0, s[7] = s[7] + G | 0;
  }), s.map((u) => (u >>> 0).toString(16).padStart(8, "0")).join("");
}
var L, I, N, H, st, ot;
class pt {
  constructor() {
    l(this, H);
    c(this, "name", "Audio Feature");
    c(this, "enabled", !0);
    l(this, L, null);
    l(this, I, null);
    l(this, N, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const e = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return e ? (h(this, L, new e(1, a(this, N), 44100)), a(this, L) !== null) : !1;
  }
  async data() {
    if (a(this, L) === null) return null;
    const e = await B(this, H, st).call(this, a(this, L));
    return e === null ? null : (h(this, I, e.toString()), {
      fingerprint: await p(a(this, I)),
      info: {
        audio: e
      }
    });
  }
}
L = new WeakMap(), I = new WeakMap(), N = new WeakMap(), H = new WeakSet(), st = function(e) {
  return new Promise((n) => {
    const r = e.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const i = e.createDynamicsCompressor();
    i.threshold.value = -50, i.knee.value = 40, i.ratio.value = 12, i.attack.value = 0, i.release.value = 0.2, r.connect(i), i.connect(e.destination), r.start(), e.oncomplete = (s) => {
      const f = s.renderedBuffer.getChannelData(0), P = B(this, H, ot).call(this, f);
      n(P);
    }, e.startRendering();
  });
}, ot = function(e) {
  let n = 0;
  for (let r = 0; r < e.length; ++r)
    n += Math.abs(e[r]);
  return n;
};
var g, S;
class wt {
  constructor() {
    c(this, "name", "Canvas Feature");
    c(this, "enabled", !0);
    l(this, g, null);
    l(this, S, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (h(this, g, document.createElement("canvas").getContext("2d")), a(this, g) !== null) : !1;
  }
  async data() {
    return a(this, g) === null ? null : (a(this, g).textBaseline = "top", a(this, g).font = "14px 'Arial'", a(this, g).textBaseline = "alphabetic", a(this, g).fillStyle = "#f60", a(this, g).fillRect(100, 1, 55, 20), a(this, g).fillStyle = "#069", a(this, g).fillText("Cyber Universe Canvas", 2, 15), a(this, g).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, g).fillText("Cyber Universe Canvas", 4, 17), h(this, S, a(this, g).canvas.toDataURL()), {
      fingerprint: await p(a(this, S)),
      info: {
        image: a(this, S)
      }
    });
  }
}
g = new WeakMap(), S = new WeakMap();
var C, $;
const _ = class _ {
  constructor() {
    c(this, "name", "ColorGamut Feature");
    c(this, "enabled", !0);
    l(this, C, null);
    l(this, $, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const e of _.gamutList) {
      const n = `(color-gamut: ${e})`;
      if (matchMedia(n).matches) {
        h(this, C, `gamut: ${e}`), h(this, $, e);
        break;
      }
    }
    return a(this, C) === null ? null : {
      fingerprint: await p(a(this, C)),
      info: {
        colorGamut: a(this, $)
      }
    };
  }
};
C = new WeakMap(), $ = new WeakMap(), // ref: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
// rec2020 > p3 > srgb
c(_, "gamutList", ["rec2020", "p3", "srgb"]);
let K = _;
var M, k, V;
class mt {
  constructor() {
    c(this, "name", "Hardware Concurrency Feature");
    c(this, "enabled", !0);
    l(this, M, null);
    l(this, k, null);
    l(this, V, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    return navigator.hardwareConcurrency && (h(this, M, navigator.hardwareConcurrency.toString()), h(this, V, navigator.hardwareConcurrency)), a(this, M) ? (h(this, k, "hardware concurrency: " + a(this, M)), {
      fingerprint: await p(a(this, k)),
      info: {
        hardwareConcurrency: a(this, V)
      }
    }) : null;
  }
}
M = new WeakMap(), k = new WeakMap(), V = new WeakMap();
var F, D;
const q = class q {
  constructor() {
    c(this, "name", "HDR Feature");
    c(this, "enabled", !0);
    l(this, F, null);
    l(this, D, null);
  }
  async support() {
    return !0;
  }
  async data() {
    for (const e of q.hdrList) {
      const n = `(dynamic-range: ${e})`;
      if (matchMedia(n).matches) {
        h(this, F, `dynamic-range: ${e}`), h(this, D, e);
        break;
      }
    }
    return a(this, F) === null ? null : {
      fingerprint: await p(a(this, F)),
      info: {
        hdr: a(this, D)
      }
    };
  }
};
F = new WeakMap(), D = new WeakMap(), // ref: https://www.w3.org/TR/mediaqueries-5/#dynamic-range
c(q, "hdrList", ["high", "standard"]);
let W = q;
var A, x;
class yt {
  constructor() {
    c(this, "name", "Languages Feature");
    c(this, "enabled", !0);
    l(this, A, []);
    l(this, x, null);
  }
  async support() {
    return !!navigator;
  }
  async data() {
    var e;
    return navigator.language && a(this, A).push([navigator.language]), Array.isArray(navigator.languages) && a(this, A).push(navigator.languages), (e = a(this, A)) != null && e.length ? (h(this, x, JSON.stringify(a(this, A))), {
      fingerprint: await p(a(this, x)),
      info: {
        languages: a(this, x)
      }
    }) : null;
  }
}
A = new WeakMap(), x = new WeakMap();
var T, z;
class bt {
  constructor() {
    c(this, "name", "Screen resolution Feature");
    c(this, "enabled", !0);
    l(this, T, null);
    l(this, z, null);
  }
  async support() {
    if (!(window.OfflineAudioContext || window.webkitOfflineAudioContext)) return !1;
    const n = window.screen;
    return n ? (h(this, T, n), a(this, T) !== null) : !1;
  }
  async data() {
    if (a(this, T) === null) return null;
    const e = `${a(this, T).width} x ${a(this, T).height}`;
    return h(this, z, e), {
      fingerprint: await p(a(this, z)),
      info: {
        screenResolution: e
      }
    };
  }
}
T = new WeakMap(), z = new WeakMap();
var E, J, lt;
class Tt {
  constructor() {
    l(this, J);
    c(this, "name", "Timezone Feature");
    c(this, "enabled", !0);
    l(this, E, null);
  }
  async support() {
    return !0;
  }
  async data() {
    if (Intl.DateTimeFormat) {
      const e = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      h(this, E, e);
    } else
      h(this, E, B(this, J, lt).call(this));
    return a(this, E) === null ? null : {
      fingerprint: await p(a(this, E)),
      info: {
        timezone: a(this, E)
      }
    };
  }
}
E = new WeakMap(), J = new WeakSet(), // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
lt = function() {
  const n = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), r = n >= 0 ? "+" : "-", i = Math.floor(Math.abs(n) / 60).toString().padStart(2, "0"), s = (Math.abs(n) % 60).toString().padStart(2, "0");
  return `UTC${r}${i}:${s}`;
};
let v;
const b = [], rt = 5e3;
async function Ht(t) {
  const e = t.id;
  if (!e) throw new Error("visitorId is required when tracking");
  v = Date.now(), await it(e, "init"), await window.addEventListener("beforeunload", () => (console.log("beforeunload"), it(e, "beforeunload"), null)), await Et(e);
}
function it(t, e) {
  const n = Date.now(), r = Math.round((n - v) / 1e3);
  b.push({
    type: "pageView",
    createAt: (/* @__PURE__ */ new Date()).toISOString(),
    details: {
      url: window.location.href,
      // referrer: document.referrer,
      duration: r,
      viewType: e
    }
  }), ut({ visitorId: t, eventLogs: b }), b.length = 0, v = Date.now();
}
async function ut(t) {
  try {
    await fetch(`${tt}/api/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(t)
    });
  } catch (e) {
    console.error("Error sending logs:", e);
  }
}
function Et(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n in window)
    n.startsWith("on") && e.add(n.slice(2));
  e.forEach((n) => {
    window.addEventListener(
      n,
      (r) => Lt(r, t),
      !0
      // `true` : 在捕獲階段觸發事件
    );
  });
}
function Lt(t, e) {
  b.push({
    type: t.type,
    createAt: (/* @__PURE__ */ new Date()).toISOString(),
    details: {
      // target: event.target,
      url: window.location.href,
      referrer: document.referrer,
      clientX: t.clientX || null,
      clientY: t.clientY || null,
      key: t.key || null,
      target: {
        name: t.target instanceof HTMLElement ? t.target.tagName : null,
        id: t.target instanceof HTMLElement ? t.target.id : null,
        class: t.target instanceof HTMLElement ? t.target.className : null,
        text: t.target instanceof HTMLElement ? t.target.innerText : null,
        href: t.target instanceof HTMLAnchorElement ? t.target.href : null,
        src: t.target instanceof HTMLImageElement ? t.target.src : null,
        alt: t.target instanceof HTMLImageElement ? t.target.alt : null,
        type: t.target instanceof HTMLInputElement ? t.target.type : null,
        checked: t.target instanceof HTMLInputElement ? t.target.checked : null,
        value: t.target instanceof HTMLInputElement ? t.target.value : null,
        placeholder: t.target instanceof HTMLInputElement ? t.target.placeholder : null,
        role: t.target instanceof HTMLElement ? t.target.getAttribute("role") : null,
        ariaLabel: t.target instanceof HTMLElement ? t.target.getAttribute("aria-label") : null,
        ariaRole: t.target instanceof HTMLElement ? t.target.getAttribute("aria-role") : null,
        ariaPressed: t.target instanceof HTMLElement ? t.target.getAttribute("aria-pressed") : null,
        ariaChecked: t.target instanceof HTMLElement ? t.target.getAttribute("aria-checked") : null,
        ariaExpanded: t.target instanceof HTMLElement ? t.target.getAttribute("aria-expanded") : null,
        ariaHidden: t.target instanceof HTMLElement ? t.target.getAttribute("aria-hidden") : null
      }
    }
  }), b.length >= rt && (console.log(`event data >=${rt}`, { visitorId: e, eventLogs: b }), ut({ visitorId: e, eventLogs: b }), b.length = 0);
}
const At = async (t) => t.enabled ? await t.support() ? await t.data() : (console.log(`Feature ${t.name} is not supported`), null) : (console.log(`Feature ${t.name} is disabled`), null), Ot = async () => {
  const t = await St();
  return await (await (await Ft(t)).json()).data;
}, St = async () => {
  const t = [
    new pt(),
    new wt(),
    new K(),
    new W(),
    new mt(),
    new yt(),
    new bt(),
    new Tt()
  ], e = [], n = {}, r = {};
  for (const s of t) {
    const f = await At(s);
    await y(f, "audio", "audio", n), await y(f, "canvas", "image", n), await y(f, "color gamut", "colorGamut", n), await y(f, "hdr", "hdr", n), await y(
      f,
      "hardware concurrency",
      "hardwareConcurrency",
      n
    ), await y(f, "languages", "languages", n), await y(f, "screen resolution", "screenResolution", n), await y(f, "timezone", "timezone", n), f != null && f.fingerprint && e.push(f.fingerprint);
  }
  const i = await Mt();
  return i && await Ct(r, e, i), {
    id: await p(JSON.stringify(e)),
    ip: (i == null ? void 0 : i.ip) || !1,
    useragent: (i == null ? void 0 : i.headers["user-agent"]) || !1,
    headers: (i == null ? void 0 : i.headers) || !1,
    rawData: n,
    serverFeature: r
  };
};
function y(t, e, n, r) {
  var i;
  (i = t == null ? void 0 : t.info) != null && i[n] && (r[e] = {
    hash: t.fingerprint,
    value: t.info[n]
  });
}
async function Ct(t, e, n) {
  if (n != null && n.ip) {
    const r = await p(n.ip);
    t["client ip"] = {
      hash: r,
      value: n.ip
    }, e.push(r);
  }
}
async function Mt() {
  try {
    const e = await (await fetch(`${tt}/api/fingerprint`)).json();
    if (!e)
      throw new Error("failed to get user request info");
    return e.serverData;
  } catch (t) {
    console.error("failed to get user request info", t);
  }
}
async function Ft(t) {
  return fetch(`${tt}/api/fingerprint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  });
}
export {
  Ot as fpPromise,
  Ht as tracking
};
