// Liens partagés par toutes les sections : une seule source de vérité.
//
// Téléchargement : la page /update du site, dont les boutons redirigent vers
// l'installeur de la dernière version via le backend du plugin.
//
// Achat : checkout Lemon Squeezy du produit « License ». `enabled` limite le
// checkout à la variante voulue (identifiants des variantes, communs aux modes
// test et réel, identiques à ceux du backend backend-trial/lib/license-flow.js).
export const DOWNLOAD_PAGE = "/update";
export const FEATURES_ANCHOR = "#features";

const CHECKOUT = "https://logotyps.lemonsqueezy.com/checkout/buy/31470257-06a8-4239-9d09-a3e119eed69e";
export const CHECKOUT_LIFETIME = `${CHECKOUT}?enabled=1077127`;
export const CHECKOUT_MONTHLY = `${CHECKOUT}?enabled=1077121`;
