# KONG Sports Wear — site vitrine & boutique

Site statique (HTML/CSS/JS, sans build) pour **KONG Sports Wear**, La Marsa.
Hébergé sur GitHub Pages : chaque `git push` sur `main` met le site à jour.

## Structure

| Fichier | Rôle |
|---|---|
| `assets/config.js` | **Réglages** : WhatsApp, Messenger, Facebook, URL WooCommerce, bandeau, mode démo |
| `assets/products.js` | Catalogue local (produits d'exemple à remplacer) |
| `assets/garments.js` | Illustrations SVG des vêtements (affichées tant qu'il n'y a pas de photo) |
| `assets/app.js` | Boutique : filtres, fiche produit, panier, commande |
| `woocommerce-produits.csv` | Le même catalogue au format d'import WooCommerce |
| `tools/woo-csv.js` | Régénère le CSV : `node tools/woo-csv.js` |

## Deux modes de fonctionnement

### 1. Catalogue local (par défaut)
`wooUrl: ""` dans `config.js`. Les produits viennent de `assets/products.js`.
Le client remplit son panier puis commande via **WhatsApp** (message pré-rempli) ou
**Messenger** (la commande est copiée, il la colle dans la conversation).

- Ajouter le numéro WhatsApp : `whatsapp: "216XXXXXXXX"`.
- Vraies photos : déposer les images dans `images/` et ajouter `image: "images/nom.jpg"` au produit (format portrait 4:5 conseillé).
- Quand les vrais produits et prix sont en place : `demo: false`.

### 2. Boutique WooCommerce
Renseigner `wooUrl: "https://votre-boutique.tn"`. Le site lit alors les produits en direct
via l'API publique WooCommerce (`/wp-json/wc/store/v1/products`, aucune clé nécessaire) :
nom, prix, promo, photo, catégories, attributs *Taille* / *Couleur*.
Le bouton « Acheter sur la boutique » ouvre la fiche WooCommerce (panier + paiement là-bas).

Pour remplir WooCommerce avec ce catalogue : *Produits → Importer* → `woocommerce-produits.csv`
(produits variables Taille × Couleur, catégories Homme / Femme / Accessoires).

Si l'API ne répond pas, le site bascule automatiquement sur le catalogue local.

## Test en local
Ouvrir `index.html` dans le navigateur (aucun serveur requis).
