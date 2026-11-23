/* ============================================================
   Catalogue local (utilisé quand KONG_CONFIG.wooUrl est vide)
   ⚠ Les PRIX sont indicatifs : à remplacer par les vrais tarifs.
   - images : photos du produit (la 1re sert de vignette)
   - colors : { n: nom, h: couleur 1, h2: couleur 2 (pastille bicolore), img: photo de ce coloris }
   - sizes  : laisser [] pour une taille unique
   - unit   : précision affichée après le prix (ex. "la paire")
   - featured : true = mis en avant dans le bandeau « Pack » (hors grille)
   ============================================================ */
window.KONG_PRODUCTS = [
  {
    id: 1, sku: "KG-BELT", name: "Ceinture de musculation KONG", cat: "ceintures",
    price: 129, badge: "Best-seller",
    images: ["images/ceintures-trio.jpg", "images/ceinture-noire-salle.jpg"],
    colors: [
      { n: "Noir · coutures blanches", h: "#111", h2: "#f2f2f2", img: "images/ceinture-noire-salle.jpg" },
      { n: "Blanc & or", h: "#f4f3ef", h2: "#c9a13b", img: "images/ceintures-trio.jpg" },
      { n: "Noir · coutures jaunes", h: "#111", h2: "#e8c21d", img: "images/ceintures-trio.jpg" }
    ],
    sizes: ["S", "M", "L", "XL"],
    desc: "Ceinture large pour gainer le tronc et protéger le bas du dos sur les squats, soulevés de terre et développés.",
    details: ["Doubles surpiqûres sur toute la longueur", "Logo KONG imprimé", "3 coloris, tailles S à XL"]
  },
  {
    id: 2, sku: "KG-KNEE", name: "Genouillères de compression (Knee Wraps)", cat: "genouilleres",
    price: 59, unit: "la paire", badge: "Nouveau",
    images: ["images/genouilleres-noir-blanc.jpg", "images/genouilleres-noir-bleu.jpg"],
    colors: [
      { n: "Noir & blanc", h: "#111", h2: "#f2f2f2", img: "images/genouilleres-noir-blanc.jpg" },
      { n: "Noir & bleu", h: "#111", h2: "#2aa8e0", img: "images/genouilleres-noir-bleu.jpg" }
    ],
    sizes: [],
    desc: "Bandes élastiques à enrouler autour du genou pour un maintien maximal pendant les séances les plus lourdes.",
    details: ["Vendues par paire", "Fermeture scratch avec patch KONG", "Livrées dans leur pochette KONG"]
  },
  {
    id: 3, sku: "KG-STRAP", name: "Sangles de tirage (Lifting Straps)", cat: "sangles",
    price: 35, unit: "la paire",
    images: ["images/sangles-tirage.jpg"],
    colors: [{ n: "Noir", h: "#111" }],
    sizes: [],
    desc: "Sécurisent la prise sur les soulevés de terre, tirages et rowings, quand la poigne lâche avant les muscles.",
    details: ["Vendues par paire", "Sangle tissée noire", "Patch KONG cousu"]
  },
  {
    id: 4, sku: "KG-SHAKER", name: "Shaker KONG", cat: "accessoires",
    price: 29,
    images: ["images/shaker-kong.jpg", "images/sangles-tirage.jpg"],
    colors: [{ n: "Noir mat", h: "#151515" }],
    sizes: [],
    desc: "Shaker noir mat avec bouchon à clapet et logo KONG, pour vos protéines avant ou après la séance.",
    details: ["Bouchon à clapet", "Logo KONG blanc"]
  },
  {
    id: 10, sku: "KG-PACK", name: "Pack Force KONG", cat: "packs", featured: true,
    price: 199, oldPrice: 223, badge: "Pack",
    images: ["images/ceintures-trio.jpg", "images/genouilleres-noir-blanc.jpg", "images/sangles-tirage.jpg"],
    colors: [],
    sizes: ["S", "M", "L", "XL"], sizeLabel: "Taille de la ceinture",
    desc: "La ceinture, les genouillères et les sangles réunies pour vos séances les plus lourdes. Précisez vos coloris dans le message de commande.",
    details: ["1 ceinture de musculation", "1 paire de genouillères", "1 paire de sangles de tirage"]
  }
];
