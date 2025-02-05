var O = Object.defineProperty;
var U = (n) => {
  throw TypeError(n);
};
var P = (n, t, e) => t in n ? O(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var I = (n, t, e) => P(n, typeof t != "symbol" ? t + "" : t, e), T = (n, t, e) => t.has(n) || U("Cannot " + e);
var d = (n, t, e) => (T(n, t, "read from private field"), e ? e.call(n) : t.get(n)), E = (n, t, e) => t.has(n) ? U("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), R = (n, t, e, s) => (T(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), v = (n, t, e) => (T(n, t, "access private method"), e);
const q = () => navigator.userAgent;
function j(n) {
  function t(i, l) {
    return i >>> l | i << 32 - l;
  }
  const e = new TextEncoder().encode(n), s = Array.from(e), r = [
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
  ], C = s.length * 8;
  for (s.push(128); (s.length * 8 + 64) % 512 !== 0; )
    s.push(0);
  const u = new Array(8).fill(0);
  for (let i = 0; i < 8; i++)
    u[7 - i] = C >>> i * 8 & 255;
  s.push(...u);
  const w = [];
  for (let i = 0; i < s.length; i += 64)
    w.push(s.slice(i, i + 64));
  return w.forEach((i) => {
    const l = new Array(64);
    for (let a = 0; a < 16; a++)
      l[a] = i[a * 4] << 24 | i[a * 4 + 1] << 16 | i[a * 4 + 2] << 8 | i[a * 4 + 3];
    for (let a = 16; a < 64; a++) {
      const x = t(l[a - 15], 7) ^ t(l[a - 15], 18) ^ l[a - 15] >>> 3, A = t(l[a - 2], 17) ^ t(l[a - 2], 19) ^ l[a - 2] >>> 10;
      l[a] = l[a - 16] + x + l[a - 7] + A | 0;
    }
    let [c, m, y, D, f, S, b, F] = o;
    for (let a = 0; a < 64; a++) {
      const x = t(f, 6) ^ t(f, 11) ^ t(f, 25), A = f & S ^ ~f & b, L = F + x + A + r[a] + l[a] | 0, J = t(c, 2) ^ t(c, 13) ^ t(c, 22), K = c & m ^ c & y ^ m & y, N = J + K | 0;
      F = b, b = S, S = f, f = D + L | 0, D = y, y = m, m = c, c = L + N | 0;
    }
    o[0] = o[0] + c | 0, o[1] = o[1] + m | 0, o[2] = o[2] + y | 0, o[3] = o[3] + D | 0, o[4] = o[4] + f | 0, o[5] = o[5] + S | 0, o[6] = o[6] + b | 0, o[7] = o[7] + F | 0;
  }), o.map((i) => (i >>> 0).toString(16).padStart(8, "0")).join("");
}
var g, p, h, B, _, $, H;
class z {
  constructor() {
    E(this, h);
    I(this, "name", "Canvas Feature");
    I(this, "enabled", !0);
    E(this, g, null);
    E(this, p, null);
  }
  async support() {
    return document ? (R(this, g, document.createElement("canvas").getContext("2d")), d(this, g) !== null) : !1;
  }
  async data() {
    if (d(this, g) === null) return null;
    await v(this, h, B).call(this, d(this, g).canvas, d(this, g));
    const t = await v(this, h, $).call(this, d(this, g).canvas), e = v(this, h, H).call(this, t);
    return R(this, p, await v(this, h, _).call(this, e)), {
      fingerprint: await j(d(this, p)),
      info: {
        image: d(this, p)
      }
    };
  }
}
g = new WeakMap(), p = new WeakMap(), h = new WeakSet(), B = function(t, e) {
  const s = "Cyber Universe Canvas";
  t.width = 300, t.height = 75, e.fillStyle = "#fff", e.fillRect(0, 0, e.canvas.width, e.canvas.height), e.imageSmoothingEnabled = !1, e.font = "14px 'Arial'", e.textBaseline = "alphabetic", e.fillStyle = "#f60", e.fillRect(100, 1, 55, 20), e.fillStyle = "#069", e.fillText(s, 2, 15), e.fillStyle = "rgba(102, 204, 0, 0.7)", e.fillText(s, 4, 17);
}, _ = function(t) {
  return t.toDataURL();
}, // ref: https://github.com/google/security-research/security/advisories/GHSA-24cm-69m9-fpw3
$ = function(t) {
  const s = document.createElement("canvas");
  s.width = t.width * 3, s.height = t.height * 3;
  const r = s.getContext("2d");
  if (!r)
    throw new Error("Failed to get 2D _ctx");
  r.imageSmoothingEnabled = !1, r.scale(3, 3), r.drawImage(t, 0, 0);
  const o = r.getImageData(0, 0, s.width, s.height), C = new ImageData(t.width, t.height);
  for (let u = 0; u < t.height; u += 1)
    for (let w = 0; w < t.width; w += 1) {
      const i = (u * t.width + w) * 4, l = (u * 3 * s.width + w * 3 + 1) * 4;
      for (let c = 0; c < 4; c += 1)
        C.data[i + c] = o.data[l + c];
    }
  return C;
}, H = function(t) {
  const e = document.createElement("canvas");
  e.width = t.width, e.height = t.height;
  const s = e.getContext("2d");
  if (!s)
    throw new Error("Failed to get 2D context");
  return s.putImageData(t, 0, 0), e;
};
const G = async (n) => n.enabled ? await n.support() ? await n.data() : (console.log(`Feature ${n.name} is not supported`), null) : (console.log(`Feature ${n.name} is disabled`), null), M = async () => {
  var e;
  const n = [new z()], t = [];
  for (const s of n) {
    const r = await G(s);
    console.log(s.name, r == null ? void 0 : r.fingerprint), console.log((e = r == null ? void 0 : r.info) == null ? void 0 : e.image), t.push((r == null ? void 0 : r.fingerprint) || "");
  }
  return await j(JSON.stringify(t));
}, Q = q(), W = async () => ({
  useragent: Q,
  id: await M()
});
export {
  W as fpPromise
};
