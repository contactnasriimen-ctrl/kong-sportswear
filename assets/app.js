(function () {
  "use strict";
  var C = window.KONG_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var CAT_NAMES = C.categories || {};
  var WOO = (C.wooUrl || "").replace(/\/+$/, "");
  var FILTER_MIN = 6; // filtres et tri affichés à partir de 6 produits
  var wooMode = false;

  var state = { products: [], cat: "tout", sort: "", cart: loadCart(), current: null, color: 0, size: null, img: null };

  /* ---------- utilitaires ---------- */
  function money(n) {
    var s = Number(n || 0).toFixed(3).replace(/\.?0+$/, "");
    return s.replace(".", ",") + " " + (C.currency || "DT");
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function stripHtml(h) {
    var d = document.createElement("div");
    d.innerHTML = h || "";
    return (d.textContent || "").trim();
  }
  function byId(id) { return state.products.filter(function (x) { return String(x.id) === String(id); })[0]; }
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("is-on"); }, 2600);
  }
  function loadCart() {
    try { return JSON.parse(localStorage.getItem("kong-cart") || "[]"); } catch (e) { return []; }
  }
  function saveCart() {
    try { localStorage.setItem("kong-cart", JSON.stringify(state.cart)); } catch (e) { /* stockage indisponible */ }
  }

  function imageFor(p, colorIdx) {
    var c = p.colors[colorIdx || 0];
    return (c && c.img) || p.images[0] || "";
  }
  function imgTag(src, alt, eager) {
    if (!src) return '<div class="ph"><img src="images/gorille-blanc.png" alt=""></div>';
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '"' + (eager ? "" : ' loading="lazy"') + ">";
  }
  function swatchStyle(c) {
    return c.h2 ? "background:linear-gradient(135deg," + c.h + " 50%," + c.h2 + " 50%)" : "background:" + c.h;
  }
  function priceHtml(p) {
    return (p.oldPrice ? "<s>" + money(p.oldPrice) + "</s> " : "") + "<b>" + money(p.price) + "</b>" +
      (p.unit ? ' <small>/ ' + esc(p.unit) + "</small>" : "");
  }

  /* ---------- chargement des produits ---------- */
  function normalizeLocal(p) {
    return {
      id: p.id, sku: p.sku, name: p.name, cat: p.cat, catName: CAT_NAMES[p.cat] || p.cat,
      price: p.price, oldPrice: p.oldPrice || null, unit: p.unit || "",
      colors: p.colors || [], sizes: p.sizes || [], sizeLabel: p.sizeLabel || "Taille",
      badge: p.badge || "", desc: p.desc || "", details: p.details || [],
      images: p.images || [], featured: !!p.featured, url: null, inStock: true
    };
  }

  function normalizeWoo(p) {
    var pr = p.prices || {};
    var minor = pr.currency_minor_unit != null ? pr.currency_minor_unit : 2;
    var num = function (v) { return v ? Number(v) / Math.pow(10, minor) : 0; };
    var cat = (p.categories && p.categories[0]) || { slug: "autres", name: "Autres" };
    var attr = function (re) {
      var a = (p.attributes || []).filter(function (x) { return re.test(x.name || ""); })[0];
      return a ? (a.terms || []).map(function (t) { return t.name; }) : [];
    };
    var price = num(pr.price), regular = num(pr.regular_price);
    return {
      id: p.id, sku: p.sku, name: stripHtml(p.name), cat: cat.slug, catName: stripHtml(cat.name),
      price: price, oldPrice: p.on_sale && regular > price ? regular : null, unit: "",
      colors: attr(/couleur|color|colour|coloris/i).map(function (n) { return { n: n }; }),
      sizes: attr(/taille|size|pointure/i), sizeLabel: "Taille",
      badge: p.on_sale ? "Promo" : "", desc: stripHtml(p.short_description || p.description).slice(0, 280), details: [],
      images: (p.images || []).map(function (i) { return i.src; }), featured: false,
      url: p.permalink, inStock: p.is_in_stock !== false
    };
  }

  function loadProducts() {
    if (!WOO) return Promise.resolve(window.KONG_PRODUCTS.map(normalizeLocal));
    var url = WOO + "/wp-json/wc/store/v1/products?per_page=" + (C.wooPerPage || 24);
    return fetch(url, { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (list) {
        if (!Array.isArray(list) || !list.length) throw new Error("aucun produit");
        wooMode = true;
        return list.map(normalizeWoo);
      })
      .catch(function (e) {
        console.warn("[KONG] WooCommerce indisponible (" + e.message + "), catalogue local utilisé.");
        return window.KONG_PRODUCTS.map(normalizeLocal);
      });
  }

  /* ---------- rendu ---------- */
  function gridProducts() { return state.products.filter(function (p) { return !p.featured; }); }

  function renderChips() {
    var list = gridProducts(), show = list.length >= FILTER_MIN;
    $("#chips").hidden = !show;
    $("#sortWrap").hidden = !show;
    if (!show) return;
    var cats = [];
    list.forEach(function (p) {
      if (!cats.some(function (c) { return c.slug === p.cat; })) cats.push({ slug: p.cat, name: p.catName });
    });
    $("#chips").innerHTML = [{ slug: "tout", name: "Tout" }].concat(cats).map(function (c) {
      var n = c.slug === "tout" ? list.length : list.filter(function (p) { return p.cat === c.slug; }).length;
      return '<button class="chip' + (state.cat === c.slug ? " is-on" : "") + '" role="tab" aria-selected="' + (state.cat === c.slug) +
        '" data-cat="' + esc(c.slug) + '">' + esc(c.name) + " <span>" + n + "</span></button>";
    }).join("");
  }

  function renderGrid() {
    var list = gridProducts().filter(function (p) { return state.cat === "tout" || p.cat === state.cat; });
    if (state.sort) list = list.slice().sort(function (a, b) { return state.sort === "asc" ? a.price - b.price : b.price - a.price; });
    $("#grid").innerHTML = list.map(function (p) {
      var dots = p.colors.filter(function (c) { return c.h; }).map(function (c) {
        return '<i style="' + esc(swatchStyle(c)) + '" title="' + esc(c.n) + '"></i>';
      }).join("");
      return '<article class="card">' +
        '<button class="card__media" data-open="' + p.id + '" aria-label="Voir ' + esc(p.name) + '">' +
        (p.badge ? '<span class="badge' + (p.badge === "Promo" ? " badge--promo" : "") + '">' + esc(p.badge) + "</span>" : "") +
        imgTag(p.images[0], p.name) + "</button>" +
        '<div class="card__body">' +
        '<p class="card__cat">' + esc(p.catName) + "</p>" +
        '<h3 class="card__name"><button data-open="' + p.id + '">' + esc(p.name) + "</button></h3>" +
        '<div class="card__row"><p class="price">' + priceHtml(p) + "</p>" +
        (dots ? '<div class="dots">' + dots + "</div>" : "") + "</div>" +
        '<button class="btn btn--dark btn--sm card__add" data-open="' + p.id + '">' + (wooMode ? "Voir le produit" : "Commander") + "</button>" +
        "</div></article>";
    }).join("") || '<p class="muted">Aucun produit dans cette catégorie pour le moment.</p>';
  }

  function renderPack() {
    var p = state.products.filter(function (x) { return x.featured; })[0];
    $("#pack").hidden = !p;
    if (!p) return;
    $("#packMedia").innerHTML = p.images.slice(0, 3).map(function (src, i) {
      return '<figure class="pack__img pack__img--' + i + '">' + imgTag(src, i ? "" : p.name) + "</figure>";
    }).join("");
    $("#packName").textContent = p.name;
    $("#packDesc").textContent = p.desc;
    $("#packList").innerHTML = p.details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("");
    $("#packPrice").innerHTML = priceHtml(p) + (p.oldPrice ? ' <em>−' + money(p.oldPrice - p.price) + "</em>" : "");
    $("#packBtn").dataset.open = p.id;
  }

  function renderPerks() {
    var items = (C.perks || []).map(function (p) { return "<span>" + esc(p) + "</span><i>✦</i>"; }).join("");
    $("#perks").innerHTML = items + items + items;
  }

  function contactLinks() {
    var out = [];
    if (C.whatsapp) out.push('<a class="btn btn--wa" target="_blank" rel="noopener" href="https://wa.me/' + esc(C.whatsapp) + '">WhatsApp</a>');
    if (C.messenger) out.push('<a class="btn btn--dark" target="_blank" rel="noopener" href="' + esc(C.messenger) + '">Messenger</a>');
    if (C.facebook) out.push('<a class="btn btn--line" target="_blank" rel="noopener" href="' + esc(C.facebook) + '">Page Facebook</a>');
    if (C.instagram) out.push('<a class="btn btn--line" target="_blank" rel="noopener" href="' + esc(C.instagram) + '">Instagram</a>');
    $("#contactLinks").innerHTML = out.join("");
  }

  /* ---------- fiche produit ---------- */
  function openProduct(id) {
    var p = byId(id);
    if (!p) return;
    state.current = p; state.color = 0; state.size = p.sizes.length === 1 ? p.sizes[0] : null;
    state.img = imageFor(p, 0);
    $("#mCat").textContent = p.catName;
    $("#mTitle").textContent = p.name;
    $("#mPrice").innerHTML = priceHtml(p);
    $("#mDesc").textContent = p.desc;
    $("#mDetails").innerHTML = p.details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("");
    $("#mHint").textContent = "";
    $("#mColorsWrap").hidden = p.colors.length < 2;
    $("#mSizesWrap").hidden = !p.sizes.length;
    $("#mSizeLabel").textContent = p.sizeLabel;
    $("#mSizes").innerHTML = p.sizes.map(function (s) {
      return '<button class="size' + (state.size === s ? " is-on" : "") + '" data-size="' + esc(s) + '">' + esc(s) + "</button>";
    }).join("");
    if (wooMode) {
      $("#mActions").innerHTML = p.inStock
        ? '<a class="btn btn--gold btn--block" href="' + esc(p.url) + '" target="_blank" rel="noopener">Acheter sur la boutique</a>'
        : '<button class="btn btn--block" disabled>Rupture de stock</button>';
    } else {
      $("#mActions").innerHTML = '<div class="qty"><button data-q="-1" aria-label="Moins">−</button><output id="mQty">1</output><button data-q="1" aria-label="Plus">+</button></div>' +
        '<button class="btn btn--gold btn--grow" id="mAdd">Ajouter au panier</button>';
    }
    paintColors(); paintGallery();
    showLayer("#modal");
  }

  function paintGallery() {
    var p = state.current;
    $("#mMedia").innerHTML = imgTag(state.img, p.name, true);
    var imgs = p.images.slice();
    p.colors.forEach(function (c) { if (c.img && imgs.indexOf(c.img) < 0) imgs.push(c.img); });
    $("#mThumbs").hidden = imgs.length < 2;
    $("#mThumbs").innerHTML = imgs.map(function (src) {
      return '<button class="thumb' + (src === state.img ? " is-on" : "") + '" data-img="' + esc(src) + '" aria-label="Voir la photo">' + imgTag(src, "") + "</button>";
    }).join("");
  }

  function paintColors() {
    var p = state.current;
    $("#mColorName").textContent = p.colors[state.color] ? p.colors[state.color].n : "";
    $("#mColors").innerHTML = p.colors.map(function (c, i) {
      return c.h
        ? '<button class="swatch' + (i === state.color ? " is-on" : "") + '" data-color="' + i + '" style="' + esc(swatchStyle(c)) + '" aria-label="' + esc(c.n) + '"></button>'
        : '<button class="size' + (i === state.color ? " is-on" : "") + '" data-color="' + i + '">' + esc(c.n) + "</button>";
    }).join("");
  }

  function addCurrent() {
    var p = state.current;
    if (p.sizes.length && !state.size) { $("#mHint").textContent = "Choisis une taille."; return; }
    var qty = Number($("#mQty").textContent) || 1;
    var color = p.colors.length > 1 && p.colors[state.color] ? p.colors[state.color].n : "";
    var key = p.id + "|" + color + "|" + (state.size || "");
    var line = state.cart.filter(function (l) { return l.key === key; })[0];
    if (line) line.qty += qty;
    else state.cart.push({ key: key, id: p.id, name: p.name, color: color, size: state.size || "", sizeLabel: p.sizeLabel,
      price: p.price, unit: p.unit, qty: qty, img: imageFor(p, state.color) });
    saveCart(); renderCart();
    hideLayer("#modal");
    toast("Ajouté au panier : " + p.name);
  }

  /* ---------- panier ---------- */
  function cartTotal() { return state.cart.reduce(function (s, l) { return s + l.price * l.qty; }, 0); }

  function renderCart() {
    var count = state.cart.reduce(function (s, l) { return s + l.qty; }, 0);
    $("#cartCount").textContent = count;
    $("#cartCount").classList.toggle("is-on", count > 0);
    $("#cartTotal").textContent = money(cartTotal());
    $("#cartFoot").hidden = !state.cart.length;
    $("#cartItems").innerHTML = state.cart.length ? state.cart.map(function (l, i) {
      return '<div class="line">' +
        '<div class="line__img">' + imgTag(l.img, "") + "</div>" +
        '<div class="line__info"><p class="line__name">' + esc(l.name) + "</p>" +
        '<p class="muted small">' + esc([l.color, l.size && "Taille " + l.size, l.unit].filter(Boolean).join(" · ")) + "</p>" +
        '<div class="qty qty--sm"><button data-line="' + i + '" data-d="-1" aria-label="Moins">−</button><output>' + l.qty +
        '</output><button data-line="' + i + '" data-d="1" aria-label="Plus">+</button></div></div>' +
        '<div class="line__price">' + money(l.price * l.qty) + '<button class="link" data-rm="' + i + '">Retirer</button></div></div>';
    }).join("") : '<div class="empty"><img src="images/logo-kong-noir.png" alt="" width="70"><p>Ton panier est vide.</p><button class="btn btn--dark btn--sm" data-close-cart>Voir les produits</button></div>';
  }

  function orderText(f) {
    var lines = state.cart.map(function (l) {
      return "• " + l.qty + " × " + l.name + (l.color ? " (" + l.color + ")" : "") +
        (l.size ? " – " + (l.sizeLabel || "taille").toLowerCase() + " " + l.size : "") + " = " + money(l.price * l.qty);
    });
    var out = ["Bonjour KONG, je souhaite commander :", ""].concat(lines).concat(["", "Total : " + money(cartTotal()), "",
      "Nom : " + f.name, "Téléphone : " + f.phone]);
    if (f.address) out.push("Adresse : " + f.address);
    return out.join("\n");
  }

  function readForm() {
    var form = $("#orderForm");
    var f = { name: form.name.value.trim(), phone: form.phone.value.trim(), address: form.address.value.trim() };
    if (!f.name || f.phone.replace(/\D/g, "").length < 8) {
      $("#orderHint").textContent = "Indique ton nom et un numéro de téléphone valide.";
      (f.name ? form.phone : form.name).focus();
      return null;
    }
    $("#orderHint").textContent = "";
    return f;
  }

  function renderOrderBtns() {
    var b = [];
    if (C.whatsapp) b.push('<button type="button" class="btn btn--wa btn--block" data-order="wa">Commander sur WhatsApp</button>');
    if (C.messenger) b.push('<button type="button" class="btn ' + (C.whatsapp ? "btn--dark" : "btn--gold") + ' btn--block" data-order="ms">Commander via Messenger</button>');
    $("#orderBtns").innerHTML = b.join("");
  }

  function sendOrder(kind) {
    var f = readForm();
    if (!f) return;
    var text = orderText(f);
    if (kind === "wa") {
      window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      return;
    }
    var open = function () { window.open(C.messenger, "_blank", "noopener"); };
    var done = function () { $("#orderHint").textContent = "Commande copiée : colle-la dans la conversation Messenger."; open(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, open);
    else open();
  }

  /* ---------- calques (modale / panier) ---------- */
  var lastFocus = null;
  function showLayer(sel) {
    lastFocus = document.activeElement;
    var el = $(sel);
    el.hidden = false;
    requestAnimationFrame(function () { el.classList.add("is-open"); });
    document.body.classList.add("no-scroll");
    var f = el.querySelector("[data-close],[data-close-cart]");
    if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 30);
  }
  function hideLayer(sel) {
    var el = $(sel);
    if (el.hidden) return;
    el.classList.remove("is-open");
    setTimeout(function () { el.hidden = true; }, 220);
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  /* ---------- événements ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) {
      if (e.target.matches("[data-close]")) hideLayer("#modal");
      if (e.target.matches("[data-close-cart]")) hideLayer("#drawer");
      return;
    }
    var d = t.dataset;
    if (d.open) return openProduct(d.open);
    if (d.cat) { state.cat = d.cat; renderChips(); renderGrid(); return; }
    if (d.img) { state.img = d.img; return paintGallery(); }
    if (d.color != null) {
      state.color = Number(d.color);
      var ci = state.current.colors[state.color];
      if (ci && ci.img) { state.img = ci.img; paintGallery(); }
      return paintColors();
    }
    if (d.size != null) {
      state.size = d.size; $("#mHint").textContent = "";
      document.querySelectorAll("#mSizes .size").forEach(function (b) { b.classList.toggle("is-on", b.dataset.size === d.size); });
      return;
    }
    if (d.q) { var o = $("#mQty"); o.textContent = Math.max(1, Math.min(20, Number(o.textContent) + Number(d.q))); return; }
    if (t.id === "mAdd") return addCurrent();
    if (t.id === "cartBtn") { renderCart(); return showLayer("#drawer"); }
    if (d.line != null) {
      var l = state.cart[d.line]; l.qty += Number(d.d);
      if (l.qty < 1) state.cart.splice(d.line, 1);
      saveCart(); return renderCart();
    }
    if (d.rm != null) { state.cart.splice(d.rm, 1); saveCart(); return renderCart(); }
    if (d.order) return sendOrder(d.order);
    if (d.close != null) return hideLayer("#modal");
    if (d.closeCart != null) return hideLayer("#drawer");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { hideLayer("#modal"); hideLayer("#drawer"); }
  });
  $("#sort").addEventListener("change", function (e) { state.sort = e.target.value; renderGrid(); });
  $("#orderForm").addEventListener("submit", function (e) { e.preventDefault(); });

  /* ---------- démarrage ---------- */
  $("#year").textContent = new Date().getFullYear();
  $("#cityTxt").textContent = C.city || "La Marsa";
  $("#shipNote").textContent = C.shippingNote || "";
  $("#stepShip").textContent = C.shippingNote ? C.shippingNote + "." : "";
  $("#stepWa").textContent = C.whatsapp ? " ou WhatsApp" : "";
  if (C.facebook) $("#fbFooter").href = C.facebook;
  renderPerks(); contactLinks(); renderOrderBtns(); renderCart();
  $("#grid").innerHTML = '<p class="muted">Chargement des produits…</p>';

  loadProducts().then(function (list) {
    state.products = list;
    $("#demoBar").hidden = !(C.demo && !wooMode);
    $("#cartBtn").hidden = wooMode;
    $("#commander").hidden = wooMode; // en mode WooCommerce, la commande se fait sur la boutique
    if (wooMode) state.cart = [];
    // retire du panier les articles qui n'existent plus dans le catalogue
    state.cart = state.cart.filter(function (l) { return byId(l.id); });
    renderChips(); renderGrid(); renderPack(); renderCart();
  });
})();
