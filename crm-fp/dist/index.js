var g = Object.defineProperty;
var h = (t) => {
  throw TypeError(t);
};
var y = (t, n, e) => n in t ? g(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var l = (t, n, e) => y(t, typeof n != "symbol" ? n + "" : n, e), f = (t, n, e) => n.has(t) || h("Cannot " + e);
var a = (t, n, e) => (f(t, n, "read from private field"), e ? e.call(t) : n.get(t)), c = (t, n, e) => n.has(t) ? h("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, e), u = (t, n, e, i) => (f(t, n, "write to private field"), i ? i.call(t, e) : n.set(t, e), e);
const m = () => navigator.userAgent;
var s, o;
class d {
  constructor() {
    l(this, "name", "Canvas Feature");
    l(this, "enabled", !0);
    c(this, s, null);
    c(this, o, null);
  }
  async support() {
    return document ? (u(this, s, document.createElement("canvas").getContext("2d")), a(this, s) !== null) : !1;
  }
  async data() {
    return a(this, s) === null ? null : (a(this, s).textBaseline = "top", a(this, s).font = "14px 'Arial'", a(this, s).textBaseline = "alphabetic", a(this, s).fillStyle = "#f60", a(this, s).fillRect(100, 1, 55, 20), a(this, s).fillStyle = "#069", a(this, s).fillText("Cyber Universe Canvas", 2, 15), a(this, s).fillStyle = "rgba(102, 204, 0, 0.7)", a(this, s).fillText("Cyber Universe Canvas", 4, 17), u(this, o, a(this, s).canvas.toDataURL()), {
      fingerprint: await p(a(this, o)),
      info: {
        image: a(this, o)
      }
    });
  }
}
s = new WeakMap(), o = new WeakMap();
const p = async (t) => {
  const n = new TextEncoder().encode(t), e = await crypto.subtle.digest("SHA-256", n);
  return Array.from(new Uint8Array(e)).map((r) => r.toString(16).padStart(2, "0")).join("");
}, w = async (t) => t.enabled ? await t.support() ? await t.data() : (console.log(`Feature ${t.name} is not supported`), null) : (console.log(`Feature ${t.name} is disabled`), null), b = async () => {
  var e;
  const t = [new d()], n = [];
  for (const i of t) {
    const r = await w(i);
    console.log(i.name, r == null ? void 0 : r.fingerprint), console.log((e = r == null ? void 0 : r.info) == null ? void 0 : e.image), n.push((r == null ? void 0 : r.fingerprint) || "");
  }
  return await p(JSON.stringify(n));
}, v = m(), C = async () => {
  const t = {
    useragent: v,
    id: await b()
  };
  return console.log("fp", t), t;
};
export {
  C as fpPromise,
  p as hash
};
