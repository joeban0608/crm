var H = Object.defineProperty;
var B = (t) => {
  throw TypeError(t);
};
var J = (t, n, s) => n in t ? H(t, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[n] = s;
var S = (t, n, s) => J(t, typeof n != "symbol" ? n + "" : n, s), L = (t, n, s) => n.has(t) || B("Cannot " + s);
var a = (t, n, s) => (L(t, n, "read from private field"), s ? s.call(t) : n.get(t)), A = (t, n, s) => n.has(t) ? B("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, s), C = (t, n, s, c) => (L(t, n, "write to private field"), c ? c.call(t, s) : n.set(t, s), s);
const K = () => navigator.userAgent;
function R(t) {
  function n(r, l) {
    return r >>> l | r << 32 - l;
  }
  const s = new TextEncoder().encode(t), c = Array.from(s), u = [
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
  ], T = c.length * 8;
  for (c.push(128); (c.length * 8 + 64) % 512 !== 0; )
    c.push(0);
  const F = new Array(8).fill(0);
  for (let r = 0; r < 8; r++)
    F[7 - r] = T >>> r * 8 & 255;
  c.push(...F);
  const E = [];
  for (let r = 0; r < c.length; r += 64)
    E.push(c.slice(r, r + 64));
  return E.forEach((r) => {
    const l = new Array(64);
    for (let e = 0; e < 16; e++)
      l[e] = r[e * 4] << 24 | r[e * 4 + 1] << 16 | r[e * 4 + 2] << 8 | r[e * 4 + 3];
    for (let e = 16; e < 64; e++) {
      const x = n(l[e - 15], 7) ^ n(l[e - 15], 18) ^ l[e - 15] >>> 3, v = n(l[e - 2], 17) ^ n(l[e - 2], 19) ^ l[e - 2] >>> 10;
      l[e] = l[e - 16] + x + l[e - 7] + v | 0;
    }
    let [f, p, y, w, h, m, d, b] = i;
    for (let e = 0; e < 64; e++) {
      const x = n(h, 6) ^ n(h, 11) ^ n(h, 25), v = h & m ^ ~h & d, U = b + x + v + u[e] + l[e] | 0, j = n(f, 2) ^ n(f, 13) ^ n(f, 22), $ = f & p ^ f & y ^ p & y, D = j + $ | 0;
      b = d, d = m, m = h, h = w + U | 0, w = y, y = p, p = f, f = U + D | 0;
    }
    i[0] = i[0] + f | 0, i[1] = i[1] + p | 0, i[2] = i[2] + y | 0, i[3] = i[3] + w | 0, i[4] = i[4] + h | 0, i[5] = i[5] + m | 0, i[6] = i[6] + d | 0, i[7] = i[7] + b | 0;
  }), i.map((r) => (r >>> 0).toString(16).padStart(8, "0")).join("");
}
var o, g;
class N {
  constructor() {
    S(this, "name", "Canvas Feature");
    S(this, "enabled", !0);
    A(this, o, null);
    A(this, g, null);
  }
  async support() {
    return document ? (C(this, o, document.createElement("canvas").getContext("2d")), a(this, o) !== null) : !1;
  }
  async data() {
    return a(this, o) === null ? null : (a(this, o).textBaseline = "top", a(this, o).font = "14px 'Arial'", a(this, o).textBaseline = "alphabetic", a(this, o).fillStyle = "#f60", a(this, o).fillRect(100, 1, 55, 20), a(this, o).fillStyle = "#069", a(this, o).fillText("Cyber Universe Canvas", 2, 15), a(this, o).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, o).fillText("Cyber Universe Canvas", 4, 17), C(this, g, a(this, o).canvas.toDataURL()), {
      fingerprint: await R(a(this, g)),
      info: {
        image: a(this, g)
      }
    });
  }
}
o = new WeakMap(), g = new WeakMap();
const O = async (t) => t.enabled ? await t.support() ? await t.data() : (console.log(`Feature ${t.name} is not supported`), null) : (console.log(`Feature ${t.name} is disabled`), null), P = async () => {
  var s;
  const t = [new N()], n = [];
  for (const c of t) {
    const u = await O(c);
    console.log(c.name, u == null ? void 0 : u.fingerprint), console.log((s = u == null ? void 0 : u.info) == null ? void 0 : s.image), n.push((u == null ? void 0 : u.fingerprint) || "");
  }
  return await R(JSON.stringify(n));
}, q = K(), G = async () => {
  const t = {
    useragent: q,
    id: await P()
  };
  return console.log("fp", t), t;
};
export {
  G as fpPromise
};
