// Génère woocommerce-produits.csv depuis assets/products.js
// Usage : node tools/woo-csv.js   puis WooCommerce > Produits > Importer
// Les photos sont référencées par leur URL GitHub Pages : WooCommerce les télécharge à l'import.
const fs = require("fs"), path = require("path");
const SITE = "https://contactnasriimen-ctrl.github.io/kong-sportswear/";
global.window = {};
require(path.join(__dirname, "..", "assets", "config.js"));
require(path.join(__dirname, "..", "assets", "products.js"));
const P = window.KONG_PRODUCTS, CATS = window.KONG_CONFIG.categories || {};
const q = v => { v = String(v ?? ""); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const url = src => (src ? SITE + src : "");

const head = ["Type", "SKU", "Name", "Published", "Short description", "Description", "Regular price", "Sale price",
  "Categories", "Tags", "In stock?", "Images", "Parent",
  "Attribute 1 name", "Attribute 1 value(s)", "Attribute 1 visible", "Attribute 1 global",
  "Attribute 2 name", "Attribute 2 value(s)", "Attribute 2 visible", "Attribute 2 global"];
const rows = [head];

for (const p of P) {
  const colors = (p.colors || []).length > 1 ? p.colors : [];
  const sizes = p.sizes || [];
  const reg = p.oldPrice || p.price, sale = p.oldPrice ? p.price : "";
  const desc = [p.desc].concat((p.details || []).map(d => "• " + d)).join("\n");
  const imgs = (p.images || []).map(url).join(", ");
  const cat = CATS[p.cat] || p.cat;
  const attrs = [];
  if (sizes.length) attrs.push(["Taille", sizes]);
  if (colors.length) attrs.push(["Couleur", colors.map(c => c.n)]);
  const attrCols = vals => [0, 1].flatMap(i => attrs[i] ? [attrs[i][0], vals(i), 1, 0] : ["", "", "", ""]);

  if (!attrs.length) {
    rows.push(["simple", p.sku, p.name, 1, p.desc, desc, reg, sale, cat, p.badge || "", 1, imgs, ""].concat(attrCols(() => "")));
    continue;
  }
  rows.push(["variable", p.sku, p.name, 1, p.desc, desc, "", "", cat, p.badge || "", 1, imgs, ""]
    .concat(attrCols(i => attrs[i][1].join(", "))));
  // une variation par combinaison ; SKU = parent + index (unique)
  const combos = attrs.reduce((acc, [, vals]) => acc.flatMap(a => vals.map(v => a.concat(v))), [[]]);
  combos.forEach((combo, n) => {
    const color = colors.find(c => combo.includes(c.n));
    rows.push(["variation", p.sku + "-" + String(n + 1).padStart(2, "0"), p.name + " - " + combo.join(", "), 1, "", "", reg, sale,
      "", "", 1, url(color && color.img), p.sku].concat(attrCols(i => combo[i])));
  });
}
const out = path.join(__dirname, "..", "woocommerce-produits.csv");
fs.writeFileSync(out, "﻿" + rows.map(r => r.map(q).join(",")).join("\r\n"));
console.log((rows.length - 1) + " lignes -> " + out);
