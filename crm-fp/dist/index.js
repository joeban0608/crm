var D = Object.defineProperty;
var R = (t) => {
  throw TypeError(t);
};
var H = (t, n, i) => n in t ? D(t, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[n] = i;
var C = (t, n, i) => H(t, typeof n != "symbol" ? n + "" : n, i), T = (t, n, i) => n.has(t) || R("Cannot " + i);
var l = (t, n, i) => (T(t, n, "read from private field"), i ? i.call(t) : n.get(t)), A = (t, n, i) => n.has(t) ? R("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, i), E = (t, n, i, f) => (T(t, n, "write to private field"), f ? f.call(t, i) : n.set(t, i), i);
function U(t) {
  function n(o, c) {
    return o >>> c | o << 32 - c;
  }
  const i = new TextEncoder().encode(t), f = Array.from(i), y = [
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
  ], w = f.length * 8;
  for (f.push(128); (f.length * 8 + 64) % 512 !== 0; )
    f.push(0);
  const r = new Array(8).fill(0);
  for (let o = 0; o < 8; o++)
    r[7 - o] = w >>> o * 8 & 255;
  f.push(...r);
  const B = [];
  for (let o = 0; o < f.length; o += 64)
    B.push(f.slice(o, o + 64));
  return B.forEach((o) => {
    const c = new Array(64);
    for (let e = 0; e < 16; e++)
      c[e] = o[e * 4] << 24 | o[e * 4 + 1] << 16 | o[e * 4 + 2] << 8 | o[e * 4 + 3];
    for (let e = 16; e < 64; e++) {
      const F = n(c[e - 15], 7) ^ n(c[e - 15], 18) ^ c[e - 15] >>> 3, S = n(c[e - 2], 17) ^ n(c[e - 2], 19) ^ c[e - 2] >>> 10;
      c[e] = c[e - 16] + F + c[e - 7] + S | 0;
    }
    let [u, p, m, v, h, b, d, x] = s;
    for (let e = 0; e < 64; e++) {
      const F = n(h, 6) ^ n(h, 11) ^ n(h, 25), S = h & b ^ ~h & d, L = x + F + S + y[e] + c[e] | 0, j = n(u, 2) ^ n(u, 13) ^ n(u, 22), I = u & p ^ u & m ^ p & m, $ = j + I | 0;
      x = d, d = b, b = h, h = v + L | 0, v = m, m = p, p = u, u = L + $ | 0;
    }
    s[0] = s[0] + u | 0, s[1] = s[1] + p | 0, s[2] = s[2] + m | 0, s[3] = s[3] + v | 0, s[4] = s[4] + h | 0, s[5] = s[5] + b | 0, s[6] = s[6] + d | 0, s[7] = s[7] + x | 0;
  }), s.map((o) => (o >>> 0).toString(16).padStart(8, "0")).join("");
}
var a, g;
class J {
  constructor() {
    C(this, "name", "Canvas Feature");
    C(this, "enabled", !0);
    A(this, a, null);
    A(this, g, null);
  }
  async support() {
    return document ? (E(this, a, document.createElement("canvas").getContext("2d")), l(this, a) !== null) : !1;
  }
  async data() {
    return l(this, a) === null ? null : (l(this, a).textBaseline = "top", l(this, a).font = "14px 'Arial'", l(this, a).textBaseline = "alphabetic", l(this, a).fillStyle = "#f60", l(this, a).fillRect(100, 1, 55, 20), l(this, a).fillStyle = "#069", l(this, a).fillText("Cyber Universe Canvas", 2, 15), l(this, a).fillStyle = "rgba(102, 204, 0, 0.7)", l(this, a).fillText("Cyber Universe Canvas", 4, 17), E(this, g, l(this, a).canvas.toDataURL()), {
      fingerprint: await U(l(this, g)),
      info: {
        image: l(this, g)
      }
    });
  }
}
a = new WeakMap(), g = new WeakMap();
const K = async (t) => t.enabled ? await t.support() ? await t.data() : (console.log(`Feature ${t.name} is not supported`), null) : (console.log(`Feature ${t.name} is disabled`), null), P = async () => {
  const t = await N();
  return console.log("fpFeatureInfo", t), {
    useragent: navigator.userAgent,
    ...t
  };
}, N = async () => {
  var f, y, s;
  const t = [new J()];
  let n = "";
  const i = [];
  for (const w of t) {
    const r = await K(w);
    console.log(w.name, r == null ? void 0 : r.fingerprint), console.log((f = r == null ? void 0 : r.info) == null ? void 0 : f.image), (y = r == null ? void 0 : r.info) != null && y.image && (n = (s = r == null ? void 0 : r.info) == null ? void 0 : s.image), i.push((r == null ? void 0 : r.fingerprint) || "");
  }
  return {
    id: await U(JSON.stringify(i)),
    canvas: {
      image: n
    }
  };
};
export {
  P as fpPromise
};
