/* ============================================================
   Catalogue local (utilisé quand KONG_CONFIG.wooUrl est vide)
   ⚠ Produits et prix d'exemple : à remplacer par les vrais articles.
   - image : chemin d'une vraie photo (ex. "images/tee-noir.jpg").
     Sans image, une illustration du vêtement est dessinée automatiquement.
   - type  : tee | tank | hoodie | jacket | jogger | short | legging | bra | cap | bag
   ============================================================ */
window.KONG_PRODUCTS = [
  {
    id: 101, sku: "KG-TEE-01", name: "T-shirt Training Dry-Fit", cat: "homme", type: "tee",
    price: 49, colors: [{ n: "Noir", h: "#16171a" }, { n: "Blanc", h: "#f2f2ee" }, { n: "Volt", h: "#c8f31d" }],
    sizes: ["S", "M", "L", "XL", "XXL"], badge: "Best-seller",
    desc: "Tissu respirant à séchage rapide, coupe athlétique. Pour la salle, le running et tous les jours."
  },
  {
    id: 102, sku: "KG-HOOD-01", name: "Hoodie Heavy Kong", cat: "homme", type: "hoodie",
    price: 119, oldPrice: 139, colors: [{ n: "Gris chiné", h: "#8b8e94" }, { n: "Noir", h: "#16171a" }],
    sizes: ["S", "M", "L", "XL"], badge: "Promo",
    desc: "Molleton épais et doux, capuche doublée, poche kangourou. Le sweat de l'échauffement."
  },
  {
    id: 103, sku: "KG-JOG-01", name: "Jogging Fuselé Flex", cat: "homme", type: "jogger",
    price: 89, colors: [{ n: "Noir", h: "#16171a" }, { n: "Kaki", h: "#59614a" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Coupe fuselée, taille élastique avec cordon, chevilles resserrées et poches zippées."
  },
  {
    id: 104, sku: "KG-SHO-01", name: "Short Running 2-en-1", cat: "homme", type: "short",
    price: 59, colors: [{ n: "Noir", h: "#16171a" }, { n: "Bleu nuit", h: "#1d2a44" }],
    sizes: ["S", "M", "L", "XL"],
    desc: "Short léger avec cuissard intégré et poche pour téléphone. Liberté totale de mouvement."
  },
  {
    id: 105, sku: "KG-TANK-01", name: "Débardeur Gym Stringer", cat: "homme", type: "tank",
    price: 39, colors: [{ n: "Noir", h: "#16171a" }, { n: "Rouge", h: "#c4302b" }],
    sizes: ["S", "M", "L", "XL"], badge: "Nouveau",
    desc: "Emmanchures larges pour les séances d'épaules et de dos. Coton stretch."
  },
  {
    id: 106, sku: "KG-JKT-01", name: "Veste Survêtement Track", cat: "homme", type: "jacket",
    price: 129, colors: [{ n: "Noir / Volt", h: "#16171a" }, { n: "Marine", h: "#1d2a44" }],
    sizes: ["S", "M", "L", "XL"],
    desc: "Veste zippée col montant, bandes contrastées, poches zippées. Assortie au jogging Flex."
  },
  {
    id: 107, sku: "KG-TEE-03", name: "T-shirt Oversize Kong", cat: "homme", type: "tee",
    price: 55, colors: [{ n: "Crème", h: "#e9e2d0" }, { n: "Noir", h: "#16171a" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Coupe ample, épaules tombantes, coton épais. Le t-shirt pour l'après-séance."
  },
  {
    id: 201, sku: "KG-LEG-01", name: "Legging Taille Haute Sculpt", cat: "femme", type: "legging",
    price: 79, colors: [{ n: "Noir", h: "#16171a" }, { n: "Bordeaux", h: "#6d2233" }, { n: "Sauge", h: "#8fa58b" }],
    sizes: ["XS", "S", "M", "L", "XL"], badge: "Best-seller",
    desc: "Taille haute gainante, tissu opaque squat-proof, poche latérale pour le téléphone."
  },
  {
    id: 202, sku: "KG-BRA-01", name: "Brassière Maintien Moyen", cat: "femme", type: "bra",
    price: 55, colors: [{ n: "Noir", h: "#16171a" }, { n: "Sauge", h: "#8fa58b" }, { n: "Rose poudré", h: "#d9a5a0" }],
    sizes: ["XS", "S", "M", "L"],
    desc: "Bonnets amovibles, dos nageur, maintien moyen pour le fitness et le yoga."
  },
  {
    id: 203, sku: "KG-TEE-02", name: "T-shirt Crop Femme", cat: "femme", type: "tee",
    price: 45, colors: [{ n: "Blanc", h: "#f2f2ee" }, { n: "Noir", h: "#16171a" }],
    sizes: ["XS", "S", "M", "L"], badge: "Nouveau",
    desc: "Coupe courte et ample, tissu fluide. Idéal par-dessus une brassière."
  },
  {
    id: 204, sku: "KG-HOOD-02", name: "Hoodie Oversize Femme", cat: "femme", type: "hoodie",
    price: 115, colors: [{ n: "Lilas", h: "#a99ac4" }, { n: "Crème", h: "#e9e2d0" }],
    sizes: ["XS", "S", "M", "L"],
    desc: "Coupe oversize, molleton doux, épaules tombantes. Après la séance comme en ville."
  },
  {
    id: 205, sku: "KG-SHO-02", name: "Short Cycliste", cat: "femme", type: "short",
    price: 49, oldPrice: 59, colors: [{ n: "Noir", h: "#16171a" }, { n: "Bordeaux", h: "#6d2233" }],
    sizes: ["XS", "S", "M", "L"], badge: "Promo",
    desc: "Le même tissu sculptant que le legging, version courte pour le vélo et le HIIT."
  },
  {
    id: 206, sku: "KG-TANK-02", name: "Débardeur Femme Racer", cat: "femme", type: "tank",
    price: 39, colors: [{ n: "Blanc", h: "#f2f2ee" }, { n: "Sauge", h: "#8fa58b" }],
    sizes: ["XS", "S", "M", "L"],
    desc: "Dos nageur, tissu léger et respirant. À porter seul ou sur une brassière."
  },
  {
    id: 207, sku: "KG-JOG-02", name: "Jogging Femme Wide", cat: "femme", type: "jogger",
    price: 85, colors: [{ n: "Gris chiné", h: "#8b8e94" }, { n: "Noir", h: "#16171a" }],
    sizes: ["XS", "S", "M", "L", "XL"], badge: "Nouveau",
    desc: "Molleton doux, taille haute élastique et coupe large. Confort total, du studio au café."
  },
  {
    id: 301, sku: "KG-CAP-01", name: "Casquette Kong Classic", cat: "accessoires", type: "cap",
    price: 35, colors: [{ n: "Noir", h: "#16171a" }, { n: "Blanc", h: "#f2f2ee" }],
    sizes: ["Unique"],
    desc: "Visière incurvée, logo brodé, réglage arrière. Taille unique."
  },
  {
    id: 302, sku: "KG-BAG-01", name: "Sac de Sport Duffel", cat: "accessoires", type: "bag",
    price: 95, colors: [{ n: "Noir", h: "#16171a" }],
    sizes: ["Unique"],
    desc: "Compartiment chaussures séparé, bandoulière réglable, tissu déperlant. 35 litres."
  }
];
