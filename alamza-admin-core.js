/* ALAMZA ADMIN core - standalone (sab kuch isi file mein bundle ho jata hai). */
window.ALAMZA_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC1f0eWUA5KCFh6yXtUbR3E7faz7vxWNk8",
  authDomain: "alamza-web.firebaseapp.com",
  databaseURL: "https://alamza-web-default-rtdb.firebaseio.com",
  projectId: "alamza-web",
  storageBucket: "alamza-web.firebasestorage.app",
  messagingSenderId: "273024319035",
  appId: "1:273024319035:web:cb299b5955ba9c94a9261e",
  measurementId: "G-K9YCD3QCLD"
};
/* Apni live website ka link yahan dalein (admin ke OPEN WEBSITE button ke liye): */
window.ALAMZA_WEBSITE_URL = "https://alamza-web.web.app";

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
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  function ensureFirebase() {
    if (!configOk()) return Promise.resolve(null);
    if (!fbPromise) {
      fbPromise = SDK.reduce(function (p, src) {
        return p.then(function () { return loadScript(src); });
      }, Promise.resolve()).then(function () {
        if (!window.firebase.apps.length) window.firebase.initializeApp(window.ALAMZA_FIREBASE_CONFIG);
        return window.firebase;
      }).catch(function (e) { console.warn("Firebase load failed:", e); return null; });
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
      " - " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  return { configOk: configOk, ensureFirebase: ensureFirebase, fmtBytes: fmtBytes, fmtDate: fmtDate };
})();
