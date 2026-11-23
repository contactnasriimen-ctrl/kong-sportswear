# KONG Sports Wear — site vitrine & boutique

Site statique (HTML/CSS/JS, sans build) pour **KONG Sports Wear**, équipement de musculation, La Marsa.
Hébergé sur GitHub Pages : chaque `git push` sur `main` met le site à jour.
En ligne : https://contactnasriimen-ctrl.github.io/kong-sportswear/

## Structure

| Fichier | Rôle |
|---|---|
| `assets/config.js` | **Réglages** : WhatsApp, Messenger, Facebook, URL WooCommerce, catégories, bandeau, mode démo |
| `assets/products.js` | Catalogue local : produits, prix, coloris, tailles, photos |
| `assets/app.js` | Boutique : grille, fiche produit avec galerie, panier, commande |
| `images/` | Photos produits + logos (blanc / noir, vertical / horizontal) |
| `woocommerce-produits.csv` | Le même catalogue au format d'import WooCommerce |
| `tools/woo-csv.js` | Régénère le CSV : `node tools/woo-csv.js` |

## Modifier le catalogue
Dans `assets/products.js` :
- **prix** : `price` (et `oldPrice` pour afficher un prix barré) ;
- **photos** : déposer l'image dans `images/` puis l'ajouter à `images: [...]` (la 1re = vignette) ;
- **coloris** : `colors` avec `img` pour que la photo change quand on choisit le coloris ;
- **tailles** : `sizes: ["S","M","L","XL"]`, ou `[]` pour une taille unique ;
- `featured: true` place le produit dans le bandeau « Offre pack ».

Filtres et tri apparaissent automatiquement à partir de 6 produits.
Quand les vrais prix sont en place : `demo: false` dans `config.js`.

## Deux modes de fonctionnement

### 1. Catalogue local (par défaut)
`wooUrl: ""`. Le client remplit son panier puis commande via **WhatsApp** (message pré-rempli,
si `whatsapp` est renseigné) ou **Messenger** (la commande est copiée, il la colle dans la conversation).

### 2. Boutique WooCommerce
`wooUrl: "https://votre-boutique.tn"`. Le site lit les produits en direct via l'API publique
WooCommerce (`/wp-json/wc/store/v1/products`, aucune clé) : nom, prix, promo, photos, catégories,
attributs *Taille* / *Couleur*. Le bouton « Acheter sur la boutique » ouvre la fiche WooCommerce.
Si l'API ne répond pas, le site revient au catalogue local.

Pour remplir WooCommerce avec ce catalogue : *Produits → Importer* → `woocommerce-produits.csv`
(photos téléchargées depuis le site GitHub Pages, produits variables Taille × Couleur).

## Test en local
Ouvrir `index.html` dans le navigateur (aucun serveur requis).
