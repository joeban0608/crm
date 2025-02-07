var Y = Object.defineProperty;
var U = (t) => {
  throw TypeError(t);
};
var ee = (t, e, n) => e in t ? Y(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var y = (t, e, n) => ee(t, typeof e != "symbol" ? e + "" : e, n), F = (t, e, n) => e.has(t) || U("Cannot " + n);
var u = (t, e, n) => (F(t, e, "read from private field"), n ? n.call(t) : e.get(t)), b = (t, e, n) => e.has(t) ? U("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), x = (t, e, n, r) => (F(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), D = (t, e, n) => (F(t, e, "access private method"), n);
function A(t) {
  function e(a, i) {
    return a >>> i | a << 32 - i;
  }
  const n = new TextEncoder().encode(t), r = Array.from(n), f = [
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
  ], d = r.length * 8;
  for (r.push(128); (r.length * 8 + 64) % 512 !== 0; )
    r.push(0);
  const h = new Array(8).fill(0);
  for (let a = 0; a < 8; a++)
    h[7 - a] = d >>> a * 8 & 255;
  r.push(...h);
  const w = [];
  for (let a = 0; a < r.length; a += 64)
    w.push(r.slice(a, a + 64));
  return w.forEach((a) => {
    const i = new Array(64);
    for (let c = 0; c < 16; c++)
      i[c] = a[c * 4] << 24 | a[c * 4 + 1] << 16 | a[c * 4 + 2] << 8 | a[c * 4 + 3];
    for (let c = 16; c < 64; c++) {
      const G = e(i[c - 15], 7) ^ e(i[c - 15], 18) ^ i[c - 15] >>> 3, L = e(i[c - 2], 17) ^ e(i[c - 2], 19) ^ i[c - 2] >>> 10;
      i[c] = i[c - 16] + G + i[c - 7] + L | 0;
    }
    let [l, p, m, S, o, O, T, R] = s;
    for (let c = 0; c < 64; c++) {
      const G = e(o, 6) ^ e(o, 11) ^ e(o, 25), L = o & O ^ ~o & T, I = R + G + L + f[c] + i[c] | 0, q = e(l, 2) ^ e(l, 13) ^ e(l, 22), Z = l & p ^ l & m ^ p & m, Q = q + Z | 0;
      R = T, T = O, O = o, o = S + I | 0, S = m, m = p, p = l, l = I + Q | 0;
    }
    s[0] = s[0] + l | 0, s[1] = s[1] + p | 0, s[2] = s[2] + m | 0, s[3] = s[3] + S | 0, s[4] = s[4] + o | 0, s[5] = s[5] + O | 0, s[6] = s[6] + T | 0, s[7] = s[7] + R | 0;
  }), s.map((a) => (a >>> 0).toString(16).padStart(8, "0")).join("");
}
var E, C, P, _, B, V;
class te {
  constructor() {
    b(this, _);
    y(this, "name", "Audio Feature");
    y(this, "enabled", !0);
    b(this, E, null);
    b(this, C, null);
    b(this, P, 5e3);
  }
  // TODO: 不同裝置各瀏覽器測試結果目前都一樣，需要進行更多的測試
  async support() {
    const e = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return e ? (x(this, E, new e(1, u(this, P), 44100)), u(this, E) !== null) : !1;
  }
  async data() {
    if (u(this, E) === null) return null;
    const e = await D(this, _, B).call(this, u(this, E));
    return e === null ? null : (x(this, C, await A(e.toString())), {
      fingerprint: u(this, C),
      info: {
        audio: e
      }
    });
  }
}
E = new WeakMap(), C = new WeakMap(), P = new WeakMap(), _ = new WeakSet(), B = function(e) {
  return new Promise((n) => {
    const r = e.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    const f = e.createDynamicsCompressor();
    f.threshold.value = -50, f.knee.value = 40, f.ratio.value = 12, f.attack.value = 0, f.release.value = 0.2, r.connect(f), f.connect(e.destination), r.start(), e.oncomplete = (s) => {
      const d = s.renderedBuffer.getChannelData(0), h = D(this, _, V).call(this, d);
      n(h);
    }, e.startRendering();
  });
}, V = function(e) {
  let n = 0;
  for (let r = 0; r < e.length; ++r)
    n += Math.abs(e[r]);
  return n;
};
var g, v;
class ne {
  constructor() {
    y(this, "name", "Canvas Feature");
    y(this, "enabled", !0);
    b(this, g, null);
    b(this, v, null);
  }
  // TODO: Safari 瀏覽器的 canvas 不同裝置指纹目前會一模一樣，需要進行更多的測試
  // chrome, edge 目前測試不同裝置，會不一樣
  async support() {
    return document ? (x(this, g, document.createElement("canvas").getContext("2d")), u(this, g) !== null) : !1;
  }
  async data() {
    return u(this, g) === null ? null : (u(this, g).textBaseline = "top", u(this, g).font = "14px 'Arial'", u(this, g).textBaseline = "alphabetic", u(this, g).fillStyle = "#f60", u(this, g).fillRect(100, 1, 55, 20), u(this, g).fillStyle = "#069", u(this, g).fillText("Cyber Universe Canvas", 2, 15), u(this, g).fillStyle = "rgba(102, 204, 0, 0.7)", u(this, g).fillText("Cyber Universe Canvas", 4, 17), x(this, v, u(this, g).canvas.toDataURL()), {
      fingerprint: await A(u(this, v)),
      info: {
        image: u(this, v)
      }
    });
  }
}
g = new WeakMap(), v = new WeakMap();
function M(t) {
  return t.reduce((e, n) => e + (n ? 1 : 0), 0);
}
function oe() {
  const t = window, e = navigator;
  return M([
    "ApplePayError" in t,
    "CSSPrimitiveValue" in t,
    "Counter" in t,
    e.vendor.indexOf("Apple") === 0,
    "RGBColor" in t,
    "WebKitMediaKeys" in t
  ]) >= 4;
}
function re() {
  var e;
  const t = window;
  return M([
    "buildID" in navigator,
    "MozAppearance" in (((e = document.documentElement) == null ? void 0 : e.style) ?? {}),
    "onmozfullscreenchange" in t,
    "mozInnerScreenX" in t,
    "CSSMozDocumentRule" in t,
    "CanvasCaptureMediaStream" in t
  ]) >= 4;
}
function ie() {
  const t = window, e = navigator;
  return M([
    "webkitPersistentStorage" in e,
    "webkitTemporaryStorage" in e,
    e.vendor.indexOf("Google") === 0,
    "webkitResolveLocalFileSystemURL" in t,
    "BatteryManager" in t,
    "webkitMediaStream" in t,
    "webkitSpeechGrammar" in t
  ]) >= 5;
}
const H = -1, J = -2, se = /* @__PURE__ */ new Set([
  10752,
  2849,
  2884,
  2885,
  2886,
  2928,
  2929,
  2930,
  2931,
  2932,
  2960,
  2961,
  2962,
  2963,
  2964,
  2965,
  2966,
  2967,
  2968,
  2978,
  3024,
  3042,
  3088,
  3089,
  3106,
  3107,
  32773,
  32777,
  32777,
  32823,
  32824,
  32936,
  32937,
  32938,
  32939,
  32968,
  32969,
  32970,
  32971,
  3317,
  33170,
  3333,
  3379,
  3386,
  33901,
  33902,
  34016,
  34024,
  34076,
  3408,
  3410,
  3411,
  3412,
  3413,
  3414,
  3415,
  34467,
  34816,
  34817,
  34818,
  34819,
  34877,
  34921,
  34930,
  35660,
  35661,
  35724,
  35738,
  35739,
  36003,
  36004,
  36005,
  36347,
  36348,
  36349,
  37440,
  37441,
  37443,
  7936,
  7937,
  7938
  // SAMPLE_ALPHA_TO_COVERAGE (32926) and SAMPLE_COVERAGE (32928) are excluded because they trigger a console warning
  // in IE, Chrome ≤ 59 and Safari ≤ 13 and give no entropy.
]), ae = /* @__PURE__ */ new Set([
  34047,
  // MAX_TEXTURE_MAX_ANISOTROPY_EXT
  35723,
  // FRAGMENT_SHADER_DERIVATIVE_HINT_OES
  36063,
  // MAX_COLOR_ATTACHMENTS_WEBGL
  34852,
  // MAX_DRAW_BUFFERS_WEBGL
  34853,
  // DRAW_BUFFER0_WEBGL
  34854,
  // DRAW_BUFFER1_WEBGL
  34229,
  // VERTEX_ARRAY_BINDING_OES
  36392,
  // TIMESTAMP_EXT
  36795,
  // GPU_DISJOINT_EXT
  38449
  // MAX_VIEWS_OVR
]), ce = ["FRAGMENT_SHADER", "VERTEX_SHADER"], le = [
  "LOW_FLOAT",
  "MEDIUM_FLOAT",
  "HIGH_FLOAT",
  "LOW_INT",
  "MEDIUM_INT",
  "HIGH_INT"
], K = "WEBGL_debug_renderer_info", ue = "WEBGL_polygon_mode";
function $({ cache: t }) {
  var r, f, s, d, h, w;
  const e = j(t);
  if (!e)
    return H;
  if (!X(e))
    return J;
  const n = z() ? null : e.getExtension(K);
  return {
    version: ((r = e.getParameter(e.VERSION)) == null ? void 0 : r.toString()) || "",
    vendor: ((f = e.getParameter(e.VENDOR)) == null ? void 0 : f.toString()) || "",
    vendorUnmasked: n ? (s = e.getParameter(n.UNMASKED_VENDOR_WEBGL)) == null ? void 0 : s.toString() : "",
    renderer: ((d = e.getParameter(e.RENDERER)) == null ? void 0 : d.toString()) || "",
    rendererUnmasked: n ? (h = e.getParameter(n.UNMASKED_RENDERER_WEBGL)) == null ? void 0 : h.toString() : "",
    shadingLanguageVersion: ((w = e.getParameter(e.SHADING_LANGUAGE_VERSION)) == null ? void 0 : w.toString()) || ""
  };
}
function k({ cache: t }) {
  const e = j(t);
  if (!e)
    return H;
  if (!X(e))
    return J;
  const n = e.getSupportedExtensions(), r = e.getContextAttributes(), f = [], s = [], d = [], h = [], w = [];
  if (r)
    for (const i of Object.keys(
      r
    ))
      s.push(`${i}=${r[i]}`);
  const a = W(e);
  for (const i of a) {
    const l = e[i];
    d.push(
      `${i}=${l}${se.has(l) ? `=${e.getParameter(l)}` : ""}`
    );
  }
  if (n)
    for (const i of n) {
      if (i === K && z() || i === ue && he())
        continue;
      const l = e.getExtension(i);
      if (!l) {
        f.push(i);
        continue;
      }
      for (const p of W(l)) {
        const m = l[p];
        h.push(
          `${p}=${m}${ae.has(m) ? `=${e.getParameter(m)}` : ""}`
        );
      }
    }
  for (const i of ce)
    for (const l of le) {
      const p = fe(e, i, l);
      w.push(`${i}.${l}=${p.join(",")}`);
    }
  return h.sort(), d.sort(), {
    contextAttributes: s,
    parameters: d,
    shaderPrecisions: w,
    extensions: n,
    extensionParameters: h,
    unsupportedExtensions: f
  };
}
function j(t) {
  if (t.webgl)
    return t.webgl.context;
  const e = document.createElement("canvas");
  let n;
  e.addEventListener("webglCreateContextError", () => n = void 0);
  for (const r of ["webgl", "experimental-webgl"]) {
    try {
      n = e.getContext(r);
    } catch {
    }
    if (n)
      break;
  }
  return t.webgl = { context: n }, n;
}
function fe(t, e, n) {
  const r = t.getShaderPrecisionFormat(t[e], t[n]);
  return r ? [r.rangeMin, r.rangeMax, r.precision] : [];
}
function W(t) {
  return Object.keys(t.__proto__).filter(ge);
}
function ge(t) {
  return typeof t == "string" && !t.match(/[^A-Z0-9_x]/);
}
function z() {
  return re();
}
function he() {
  return ie() || oe();
}
function X(t) {
  return typeof t.getParameter == "function";
}
var N;
class de {
  constructor() {
    y(this, "name", "Canvas Feature");
    y(this, "enabled", !0);
    // #ctx: CanvasRenderingContext2D | null = null;
    b(this, N, null);
  }
  async support() {
    return !0;
  }
  async data() {
    return x(this, N, JSON.stringify($({ cache: {} })) + JSON.stringify(k({ cache: {} }))), {
      fingerprint: u(this, N),
      info: {
        webgl: {
          basics: $({ cache: {} }),
          extensions: k({ cache: {} })
        }
      }
    };
  }
}
N = new WeakMap();
const pe = async (t) => t.enabled ? await t.support() ? await t.data() : (console.log(`Feature ${t.name} is not supported`), null) : (console.log(`Feature ${t.name} is disabled`), null), be = async () => await me(), me = async () => {
  var s, d, h, w, a, i, l, p, m;
  const t = [new ne(), new te(), new de()];
  let e = "", n = "", r = { basics: {}, extensions: {} };
  const f = [];
  for (const S of t) {
    const o = await pe(S);
    console.log(S.name, o == null ? void 0 : o.fingerprint), console.log((s = o == null ? void 0 : o.info) == null ? void 0 : s.image), console.log((d = o == null ? void 0 : o.info) == null ? void 0 : d.audio), console.log((h = o == null ? void 0 : o.info) == null ? void 0 : h.webgl), (w = o == null ? void 0 : o.info) != null && w.image && (e = (a = o == null ? void 0 : o.info) == null ? void 0 : a.image), (i = o == null ? void 0 : o.info) != null && i.audio && (n = (l = o == null ? void 0 : o.info) == null ? void 0 : l.audio), (p = o == null ? void 0 : o.info) != null && p.webgl && (r = (m = o == null ? void 0 : o.info) == null ? void 0 : m.webgl), f.push((o == null ? void 0 : o.fingerprint) || "");
  }
  return console.log("JSON.stringify(webgl)", JSON.stringify(r)), {
    id: await A(JSON.stringify(f)),
    useragent: navigator.userAgent,
    rawData: {
      canvas: {
        hash: await A(e),
        "text image": e
      },
      audio: {
        hash: await A(n),
        value: n
      },
      webgl: {
        hash: await A(JSON.stringify(r)),
        value: r
      }
    }
  };
};
export {
  be as fpPromise
};
