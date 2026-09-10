// Liens partagés par toutes les sections : une seule source de vérité.
//
// Téléchargement : la page /download du site, dont les boutons redirigent vers
// l'installeur de la dernière version via le backend du plugin.
//
// Achat : checkout Lemon Squeezy du produit « License ». `enabled` limite le
// checkout à la variante voulue (identifiants des variantes, communs aux modes
// test et réel, identiques à ceux du backend backend-trial/lib/license-flow.js).
export const DOWNLOAD_PAGE = "/download";
export const FEATURES_ANCHOR = "#features";

const CHECKOUT = "https://logotyps.lemonsqueezy.com/checkout/buy/31470257-06a8-4239-9d09-a3e119eed69e";
export const CHECKOUT_LIFETIME = `${CHECKOUT}?enabled=1077127`;
export const CHECKOUT_ANNUAL = `${CHECKOUT}?enabled=1077121`;
// Studio : variante Lemon Squeezy 1077131 (149 €, 15 activations, créée le 2026-09-10).
export const STUDIO_VARIANT_ID = "1077131";
export const CHECKOUT_STUDIO = STUDIO_VARIANT_ID ? `${CHECKOUT}?enabled=${STUDIO_VARIANT_ID}` : CHECKOUT;

// Offre de lancement affichée sous les tarifs. `enabled` à passer à true UNIQUEMENT
// une fois le code créé dans Lemon Squeezy (Discounts), sinon on annonce un code mort.
export const LAUNCH = { enabled: false, code: "LANCEMENT", until: "2026-10-05" };
