(function () {
  var pages = [
    ["About us", "/About-us/"],
    ["Community", "/community-homepage/"],
    ["Our Progress", "/ourprogress/"],
    ["Campus Ambassador", "/campus-ambassador/"],
    ["Internship", "/Dot-internship/"],
    ["Fellowship", "/dot-fellowship/"]
  ];
  var byName = {};
  pages.forEach(function (item) { byName[item[0]] = item[1]; });
  byName["Campus Ambassador Program"] = "/campus-ambassador/";
  byName["Join the waitlist"] = "/";

  function ensureStyle() {
    if (document.getElementById("dot-nav-style")) return;
    var style = document.createElement("style");
    style.id = "dot-nav-style";
    style.textContent = [
      "[data-framer-name='Website Header nav']{display:flex!important;align-items:center;gap:16px 22px;flex-wrap:wrap;width:100%;box-sizing:border-box;padding:0 28px;background:#fff;min-height:72px;position:relative;z-index:30}",
      "a.dot-nav-link{color:inherit;text-decoration:none;font-family:Inter,sans-serif;font-weight:600;font-size:14px;line-height:22px}",
      "a.dot-nav-link:hover,a.dot-nav-link[aria-current='page']{color:#B625B1}",
      "#dot-full-nav{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;margin-left:auto}",
      "#dot-full-nav a{color:#1a1a1a;text-decoration:none;font-family:Inter,sans-serif;font-size:14px;font-weight:600}",
      "#dot-full-nav a:hover,#dot-full-nav a[aria-current='page']{color:#B625B1}"
    ].join("");
    document.head.appendChild(style);
  }

  function currentPath() {
    var path = location.pathname.replace(/\/$/, "") || "/";
    return path;
  }

  function makeLink(href, label) {
    var a = document.createElement("a");
    a.className = "dot-nav-link";
    a.href = href;
    a.textContent = label;
    var target = href.replace(/\/$/, "") || "/";
    if (target === currentPath()) a.setAttribute("aria-current", "page");
    return a;
  }

  function linkifyNamed() {
    Object.keys(byName).forEach(function (name) {
      document.querySelectorAll('[data-framer-name="' + name + '"]').forEach(function (el) {
        if (el.querySelector("a.dot-nav-link")) return;
        var p = el.querySelector("p") || el;
        var label = (p.textContent || name).trim().split("\n")[0] || name;
        p.textContent = "";
        p.appendChild(makeLink(byName[name], label));
      });
    });
    document.querySelectorAll("[data-framer-name='Dot purple wordmark/white bg']").forEach(function (el) {
      if (el.closest("a")) {
        var existing = el.closest("a");
        existing.href = "/";
        return;
      }
      var a = document.createElement("a");
      a.href = "/";
      a.setAttribute("aria-label", "Home");
      a.style.display = "flex";
      a.style.alignItems = "center";
      a.style.height = "72px";
      el.parentNode.insertBefore(a, el);
      a.appendChild(el);
    });
  }

  function fillNav(host) {
    if (!host || host.querySelector("#dot-full-nav")) return;
    var nav = document.createElement("nav");
    nav.id = "dot-full-nav";
    nav.setAttribute("aria-label", "Pages");
    pages.forEach(function (item) { nav.appendChild(makeLink(item[1], item[0])); });
    host.appendChild(nav);
  }

  function mount() {
    ensureStyle();
    linkifyNamed();
    var header = document.querySelector("[data-framer-name='Website Header nav']");
    if (header) {
      fillNav(header);
      return true;
    }
    var title = document.querySelector("[data-framer-name='Title and Icon']");
    var bar = title && title.parentElement;
    if (!bar) return false;
    bar.style.display = "flex";
    bar.style.alignItems = "center";
    bar.style.justifyContent = "space-between";
    bar.style.gap = "16px";
    bar.style.boxSizing = "border-box";
    bar.style.paddingRight = "24px";
    fillNav(bar);
    return true;
  }

  var tries = 0;
  function tick() {
    mount();
    tries += 1;
    if (tries < 60) setTimeout(tick, 300);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tick);
  else tick();
})();
