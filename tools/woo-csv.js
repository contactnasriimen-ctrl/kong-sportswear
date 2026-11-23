// Génère woocommerce-produits.csv depuis assets/products.js
// Usage : node tools/woo-csv.js   puis WooCommerce > Produits > Importer
const fs = require("fs"), path = require("path");
global.window = {};
require(path.join(__dirname, "..", "assets", "products.js"));
const P = window.KONG_PRODUCTS;
const catName = { homme: "Homme", femme: "Femme", accessoires: "Accessoires" };
const q = v => { v = String(v ?? ""); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const code = s => s.normalize("NFD").replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase();
const rows = [["ID", "Type", "SKU", "Name", "Published", "Short description", "Regular price", "Sale price", "Categories", "Tags",
  "In stock?", "Images", "Parent", "Attribute 1 name", "Attribute 1 value(s)", "Attribute 1 visible", "Attribute 1 global",
  "Attribute 2 name", "Attribute 2 value(s)", "Attribute 2 visible", "Attribute 2 global"]];
for (const p of P) {
  const colors = p.colors.map(c => c.n), reg = p.oldPrice || p.price, sale = p.oldPrice ? p.price : "";
  rows.push(["", "variable", p.sku, p.name, 1, p.desc, "", "", catName[p.cat] || p.cat, p.badge || "", 1, "", "",
    "Taille", p.sizes.join(", "), 1, 1, "Couleur", colors.join(", "), 1, 1]);
  for (const c of colors) for (const s of p.sizes)
    rows.push(["", "variation", p.sku + "-" + code(c) + "-" + code(s), p.name + " - " + c + ", " + s, 1, "", reg, sale, "", "", 1, "", p.sku,
      "Taille", s, "", 1, "Couleur", c, "", 1]);
}
const out = path.join(__dirname, "..", "woocommerce-produits.csv");
fs.writeFileSync(out, "\ufeff" + rows.map(r => r.map(q).join(",")).join("\r\n"));
console.log((rows.length - 1) + " lignes -> " + out);
