/* ============================================================
   KONG Sports Wear — réglages du site (le seul fichier à modifier)
   ============================================================ */
window.KONG_CONFIG = {
  brand: "KONG Sports Wear",
  city: "La Marsa, Tunis",

  // Page Facebook / Messenger
  facebook: "https://www.facebook.com/kongsportswear",
  messenger: "https://m.me/kongsportswear",

  // Numéro WhatsApp au format international SANS + ni espaces, ex. "21620123456".
  // Laisser vide pour cacher le bouton WhatsApp.
  whatsapp: "",

  // Instagram (optionnel), ex. "https://www.instagram.com/kongsportswear"
  instagram: "",

  // ---------- WooCommerce ----------
  // Adresse de la boutique WordPress/WooCommerce, ex. "https://boutique.kong.tn".
  // Si renseignée, les produits sont chargés en direct via l'API publique
  // WooCommerce (/wp-json/wc/store/v1/products) et le bouton « Acheter »
  // mène à la fiche WooCommerce. Laisser vide = catalogue local (assets/products.js)
  // + commande par WhatsApp / Messenger.
  wooUrl: "",
  wooPerPage: 24,

  currency: "DT",

  // Noms affichés des catégories du catalogue local
  categories: {
    ceintures: "Ceintures",
    genouilleres: "Genouillères",
    sangles: "Sangles",
    accessoires: "Accessoires",
    packs: "Packs"
  },

  // Texte sous le total du panier
  shippingNote: "Livraison partout en Tunisie, paiement à la livraison",

  // Bandeau défilant sous le hero (à adapter aux vraies conditions)
  perks: [
    "Livraison partout en Tunisie",
    "Paiement à la livraison",
    "Équipement de musculation",
    "Basé à La Marsa"
  ],

  // true = affiche « prix indicatifs » en haut de page.
  // Mettre false une fois les vrais prix en place.
  demo: true
};
