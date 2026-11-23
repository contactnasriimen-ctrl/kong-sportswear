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

  // Instagram (optionnel)
  instagram: "",

  // ---------- WooCommerce ----------
  // Adresse de la boutique WordPress/WooCommerce, ex. "https://boutique.kong.tn".
  // Si renseignée, les produits sont chargés en direct via l'API publique
  // WooCommerce (/wp-json/wc/store/v1/products) et le bouton « Acheter »
  // mène au panier WooCommerce. Laisser vide = catalogue local (assets/products.js)
  // + commande par WhatsApp / Messenger.
  wooUrl: "",
  wooPerPage: 24,

  currency: "DT",
  // Livraison affichée dans le panier (texte libre)
  shippingNote: "Livraison partout en Tunisie — paiement à la livraison",

  // Bandeau défilant sous le header (à adapter aux vraies conditions)
  perks: [
    "Livraison partout en Tunisie",
    "Paiement à la livraison",
    "Tailles XS → XXL",
    "Basé à La Marsa"
  ],

  // true = affiche « catalogue de démonstration » en haut de page.
  // Mettre false une fois les vrais produits et prix en place.
  demo: true
};
