(function () {
  var D = window.__JG || { faq: {}, reviews: [] };
  var CITIES = [["Dortmund","dortmund"],["Bochum","bochum"],["Essen","essen"],["Düsseldorf","duesseldorf"],["Wuppertal","wuppertal"],["Solingen","solingen"],["Witten","witten"],["Schwerte","schwerte"]];
  var NAV = [["Leistungen","/leistungen/"],["Einsatzbereiche","/einsatzbereiche/"],["Vorteile","/vorteile/"],["Gewerbe","/gewerbe/"],["Über uns","/ueber-uns/"],["Blog","/blog/"],["Kontakt","/kontakt/"]];
  var path = location.pathname.replace(/index\.html$/, "");
  var GOLD = "rgb(184, 149, 106)", DARK = "rgb(44, 44, 44)", LINE = "rgb(232, 226, 220)";

  var header = document.querySelector("header");

  // aktiver Menüpunkt
  if (header) header.querySelectorAll("nav a.jl").forEach(function (a) {
    if (a.getAttribute("href") === path) { a.style.color = DARK; a.style.borderBottomColor = GOLD; }
  });

  // Schatten beim Scrollen + mobile Leiste
  var bar = document.querySelector('div.lg\\:hidden.fixed.bottom-0');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.style.boxShadow = y > 10 ? "0 2px 20px rgba(0,0,0,0.06)" : "none";
    if (bar) bar.style.transform = y > 400 ? "translateY(0)" : "translateY(100%)";
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Standorte-Dropdown
  var std = header && Array.prototype.find.call(header.querySelectorAll("nav button"), function (b) { return b.textContent.trim() === "Standorte"; });
  if (std) {
    var wrap = std.parentNode, dd = document.createElement("div");
    dd.style.cssText = "display:none;position:absolute;top:calc(100% + 14px);right:0;min-width:220px;background:#fff;border:1px solid " + LINE + ";box-shadow:0 12px 30px rgba(0,0,0,0.08);padding:8px 0;z-index:60";
    CITIES.forEach(function (c) {
      var a = document.createElement("a"); a.href = "/moebelfolierung-" + c[1] + "/";
      a.textContent = "Möbelfolierung " + c[0];
      a.style.cssText = "display:block;padding:10px 20px;font-family:Montserrat,sans-serif;font-size:0.68rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:" + (path === a.getAttribute("href") ? GOLD : DARK) + ";text-decoration:none;white-space:nowrap";
      a.onmouseenter = function () { a.style.color = GOLD; }; a.onmouseleave = function () { a.style.color = path === a.getAttribute("href") ? GOLD : DARK; };
      dd.appendChild(a);
    });
    wrap.appendChild(dd);
    std.addEventListener("click", function (e) { e.stopPropagation(); dd.style.display = dd.style.display === "none" ? "block" : "none"; });
    document.addEventListener("click", function () { dd.style.display = "none"; });
    if (/^\/moebelfolierung-/.test(path)) { std.style.color = DARK; std.style.borderBottomColor = GOLD; }
  }

  // Mobiles Menü
  var burger = header && header.querySelector('button[aria-label="Menü"]');
  if (burger) {
    var panel = document.createElement("div");
    panel.style.cssText = "display:none;position:fixed;left:0;right:0;bottom:0;top:" + header.offsetHeight + "px;background:#fff;z-index:49;overflow-y:auto;padding:24px 32px 100px;font-family:Montserrat,sans-serif";
    function link(t, h, sub) {
      var a = document.createElement("a"); a.href = h; a.textContent = t;
      a.style.cssText = "display:block;padding:" + (sub ? "10px 0 10px 14px" : "16px 0") + ";border-bottom:1px solid " + LINE + ";font-size:" + (sub ? "0.72rem" : "0.8rem") + ";font-weight:500;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;color:" + (path === h ? GOLD : DARK);
      panel.appendChild(a);
    }
    link("Startseite", "/"); NAV.forEach(function (n) { link(n[0], n[1]); });
    var h = document.createElement("p"); h.textContent = "Standorte";
    h.style.cssText = "margin:24px 0 4px;font-size:0.62rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:" + GOLD;
    panel.appendChild(h);
    CITIES.forEach(function (c) { link("Möbelfolierung " + c[0], "/moebelfolierung-" + c[1] + "/", true); });
    var wa = document.createElement("a");
    wa.href = "https://wa.me/4915735626023?text=Hallo%20liebes%20Team%20von%20JAGIS.%20Bitte%20kontaktiert%20mich."; wa.target = "_blank"; wa.rel = "noopener noreferrer";
    wa.innerHTML = '<i class="ri-whatsapp-line"></i> WhatsApp Kontakt';
    wa.style.cssText = "display:flex;align-items:center;justify-content:center;gap:8px;margin-top:28px;padding:14px;background:rgb(37,211,102);color:#fff;font-size:0.68rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none";
    panel.appendChild(wa);
    document.body.appendChild(panel);
    var spans = burger.querySelectorAll("span"), open = false;
    burger.addEventListener("click", function () {
      open = !open; panel.style.display = open ? "block" : "none";
      document.body.style.overflow = open ? "hidden" : "";
      spans[0].style.transform = open ? "translateY(6px) rotate(45deg)" : "none";
      spans[1].style.opacity = open ? "0" : "1";
      spans[2].style.transform = open ? "translateY(-6px) rotate(-45deg)" : "none";
    });
  }

  // FAQ
  document.querySelectorAll("button[aria-expanded]").forEach(function (b) {
    var q = b.textContent.trim(), a = D.faq[q];
    if (!a) return;
    var box = document.createElement("div");
    box.style.cssText = "overflow:hidden;max-height:0;transition:max-height 0.4s ease";
    var p = document.createElement("p"); p.textContent = a;
    p.style.cssText = "font-family:Inter,sans-serif;font-size:0.92rem;line-height:1.8;color:rgb(107,107,107);padding:0 76px 28px 28px;margin:0;font-weight:300";
    box.appendChild(p); b.parentNode.appendChild(box);
    b.addEventListener("click", function () {
      var o = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", o);
      box.style.maxHeight = o ? box.scrollHeight + "px" : "0";
      var i = b.querySelector("i"); if (i) i.className = (o ? "ri-subtract-line" : "ri-add-line") + " text-sm";
    });
  });

  // FAQ in Blog-Artikeln (Buttons ohne aria-expanded)
  document.querySelectorAll("button:not([aria-expanded])").forEach(function (b) {
    var q = b.textContent.trim(), a = D.faq[q];
    if (!a) return;
    var box = b.nextElementSibling, isOpen = !!box;
    if (!box) {
      box = document.createElement("div");
      var p = document.createElement("p"); p.textContent = a;
      p.style.cssText = "font-family:Inter,sans-serif;font-size:0.88rem;line-height:1.8;color:rgb(107,107,107);padding:0 24px 24px;margin:0;font-weight:300";
      box.appendChild(p); b.parentNode.appendChild(box);
    }
    box.style.display = isOpen ? "" : "none";
    var icon = b.querySelector("i");
    b.addEventListener("click", function () {
      isOpen = !isOpen;
      box.style.display = isOpen ? "" : "none";
      if (icon) icon.className = icon.className.replace(/ri-(add|subtract)-line/, isOpen ? "ri-subtract-line" : "ri-add-line");
    });
  });

  // Kundenstimmen
  var dots = document.querySelectorAll('button[aria-label^="Bewertung"]');
  if (dots.length && D.reviews.length) {
    var root = dots[0].closest("div.w-full") || document;
    var quote = root.querySelector("blockquote");
    var nameP = quote && quote.nextElementSibling && quote.nextElementSibling.querySelector("p");
    var subP = nameP && nameP.nextElementSibling;
    var firstSub = subP ? subP.textContent : "";
    var idx = 0, timer;
    function show(n) {
      idx = n; var r = D.reviews[n]; if (!r) return;
      quote.style.opacity = 0;
      setTimeout(function () {
        quote.textContent = r.body;
        if (nameP && r.author) nameP.textContent = r.author;
        if (subP) subP.textContent = n === 0 ? firstSub : "";
        quote.style.opacity = 1;
      }, 200);
      dots.forEach(function (d, k) { d.style.width = k === n ? "28px" : "8px"; d.style.backgroundColor = k === n ? GOLD : "rgb(196, 186, 176)"; });
    }
    if (quote) {
      quote.style.transition = "opacity 0.2s";
      dots.forEach(function (d, k) { d.addEventListener("click", function () { clearInterval(timer); show(k); }); });
      timer = setInterval(function () { show((idx + 1) % Math.min(dots.length, D.reviews.length)); }, 7000);
    }
  }

  // Kontaktformular: Themen-Auswahl
  document.querySelectorAll('input[type="radio"][name="topic"]').forEach(function (r) {
    r.addEventListener("change", function () {
      document.querySelectorAll('input[name="topic"]').forEach(function (x) {
        var l = x.parentNode;
        l.style.backgroundColor = x.checked ? DARK : "rgb(255, 255, 255)";
        l.style.color = x.checked ? "#fff" : "rgb(90, 90, 90)";
        l.style.borderColor = x.checked ? DARK : LINE;
      });
    });
  });
  var photos = document.getElementById("contact-photos");
  if (photos) photos.addEventListener("change", function () {
    var s = photos.parentNode.querySelector("span");
    if (s && photos.files.length) s.textContent = photos.files.length + " Datei(en) ausgewählt";
  });

  // Formular-Versand (vorläufig per E-Mail-Programm, bis ein Formular-Dienst angebunden ist)
  var form = document.querySelector("form[data-readdy-form]");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(form);
    if (f.get("website_alt")) return;
    var body = "Name: " + f.get("name") + "\nTelefon: " + (f.get("phone") || "") + "\nE-Mail: " + f.get("email") +
      "\nThema: " + (f.get("topic") || "") + "\n\n" + (f.get("message") || "");
    location.href = "mailto:gottmannjascha@gmail.com?subject=" + encodeURIComponent("Anfrage über die Website") + "&body=" + encodeURIComponent(body);
  });
})();

// ===== Cookie-Banner + Meta-Pixel (lädt erst nach Zustimmung) =====
(function () {
  var PIXEL_ID = ""; // <- Meta-Pixel-ID hier eintragen
  var KEY = "jg-consent", GOLD = "rgb(184, 149, 106)", DARK = "rgb(44, 44, 44)";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadPixel() {
    if (!PIXEL_ID || window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
    var p = location.pathname;
    if (/^\/moebelfolierung-|^\/blog\/.+/.test(p)) fbq("track", "ViewContent", { content_name: document.title });
  }
  function track(ev, data) { if (window.fbq) fbq("track", ev, data || {}); }

  // Events
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href");
    if (h.indexOf("wa.me") > -1) track("Contact", { method: "WhatsApp" });
    else if (h.indexOf("tel:") === 0) track("Contact", { method: "Telefon" });
  }, true);
  var form = document.querySelector("form[data-readdy-form]");
  if (form) form.addEventListener("submit", function () {
    if (!form.querySelector('[name="website_alt"]').value) track("Lead", { content_name: "Kontaktformular" });
  }, true);

  // Banner
  function banner() {
    var old = document.getElementById("jg-cookie"); if (old) old.remove();
    var d = document.createElement("div"); d.id = "jg-cookie";
    d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Cookie-Einstellungen");
    d.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:70;max-width:560px;margin-left:auto;background:#fff;border:1px solid rgb(232,226,220);box-shadow:0 18px 40px rgba(0,0,0,0.12);padding:24px;font-family:Inter,sans-serif";
    d.innerHTML =
      '<p style="font-family:Montserrat,sans-serif;font-weight:600;font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;color:' + GOLD + ';margin:0 0 10px">Cookies & Datenschutz</p>' +
      '<p style="font-size:0.85rem;line-height:1.7;color:rgb(90,90,90);font-weight:300;margin:0 0 18px">Wir verwenden notwendige Cookies für den Betrieb der Website. Mit Ihrer Zustimmung nutzen wir zusätzlich den Meta-Pixel, um die Wirkung unserer Werbung zu messen. Mehr in der <a href="/datenschutz/" style="color:' + DARK + ';text-decoration:underline">Datenschutzerklärung</a>.</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<button data-c="no" style="flex:1 1 160px;cursor:pointer;padding:12px 16px;background:#fff;border:1px solid ' + DARK + ';color:' + DARK + ';font-family:Montserrat,sans-serif;font-weight:600;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase">Nur notwendige</button>' +
      '<button data-c="yes" style="flex:1 1 160px;cursor:pointer;padding:12px 16px;background:' + DARK + ';border:1px solid ' + DARK + ';color:#fff;font-family:Montserrat,sans-serif;font-weight:600;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase">Alle akzeptieren</button></div>';
    d.addEventListener("click", function (e) {
      var c = e.target.getAttribute && e.target.getAttribute("data-c"); if (!c) return;
      set(c); d.remove(); if (c === "yes") loadPixel(); else if (window.fbq) location.reload();
    });
    document.body.appendChild(d);
  }
  window.jgCookieSettings = banner;

  // Link "Cookie-Einstellungen" im Footer
  var fl = document.querySelectorAll('footer a[href="/datenschutz/"]');
  var foot = fl.length ? fl[fl.length - 1] : null;
  if (foot) {
    var l = foot.cloneNode(false); l.removeAttribute("href"); l.className = ""; l.textContent = "Cookie-Einstellungen";
    l.setAttribute("role", "button"); l.style.cursor = "pointer";
    l.addEventListener("click", banner);
    foot.parentNode.appendChild(l);
  }

  var c = get();
  if (c === "yes") loadPixel(); else if (!c) banner();
})();
