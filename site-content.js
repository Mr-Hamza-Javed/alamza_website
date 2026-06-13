// ════════════════════════════════════════════════════════════════
//  ALAMZA INDUSTRY — Site data loader + Firebase helpers
//  (Website aur Admin Panel dono isko use karte hain)
//  Is file ko edit karne ki zaroorat nahi.
//
//  Website ka sara text "site-data.json" se aata hai. Yeh file
//  page khulte hi woh JSON load karti hai aur website mein bhar deti hai.
// ════════════════════════════════════════════════════════════════

// ─── site-data.json ko load karna ───────────────────────────────
(function () { 
  function apply(data) {
    window.SITE_DATA = data || {};
    window.SITE_DATA_READY = true;
    try { window.dispatchEvent(new Event("sitedata")); } catch (e) {}
  }
  // Agar kisi wajah se JSON load na ho, to khali object — website crash na ho.
  fetch("site-data.json", { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(apply)
    .catch(function (e) {
      console.warn("site-data.json load nahi ho saki:", e);
      apply(window.SITE_DATA || {});
    });
})();

window.ALAMZA = (function () {

  var SDK = [
    "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.14.1/firebase-database-compat.js",
    "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage-compat.js"
  ];
  var fbPromise = null;

  function configOk() {
    var c = window.ALAMZA_FIREBASE_CONFIG;
    return !!(c && c.apiKey && c.apiKey.indexOf("PASTE") === -1 &&
              c.databaseURL && c.databaseURL.indexOf("PASTE") === -1);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // Firebase SDK lazily aur order mein load hota hai — pehla paint hamesha tez.
  function ensureFirebase() {
    if (!configOk()) return Promise.resolve(null);
    if (!fbPromise) {
      fbPromise = SDK.reduce(function (p, src) {
        return p.then(function () { return loadScript(src); });
      }, Promise.resolve()).then(function () {
        if (!window.firebase.apps.length) {
          window.firebase.initializeApp(window.ALAMZA_FIREBASE_CONFIG);
        }
        return window.firebase;
      }).catch(function (e) {
        console.warn("Firebase load failed:", e);
        return null;
      });
    }
    return fbPromise;
  }

  function fmtBytes(n) {
    if (!n) return "0 B";
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
    return (n / (1024 * 1024)).toFixed(1) + " MB";
  }

  function fmtDate(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
      " · " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }

  return {
    configOk: configOk,
    ensureFirebase: ensureFirebase,
    fmtBytes: fmtBytes,
    fmtDate: fmtDate
  };
})();
