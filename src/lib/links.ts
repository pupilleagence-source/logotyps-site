// Liens partagés par toutes les sections : une seule source de vérité.
//
// Téléchargement : la page /download du site, dont les boutons redirigent vers
// l'installeur de la dernière version via le backend du plugin.
//
// Achat : voir CHECKOUT_* ci-dessous.
export const DOWNLOAD_PAGE = "/download";
export const FEATURES_ANCHOR = "#features";
// Portail global Lemon Squeezy : le client retrouve ses commandes et clés avec son e-mail (lien magique).
export const MY_ORDERS = "https://app.lemonsqueezy.com/my-orders";
// Portail client de la boutique : gérer, mettre en pause ou annuler l'abonnement annuel,
// changer de carte, télécharger les factures. Connexion par lien magique e-mail.
export const CUSTOMER_PORTAL = "https://logotyps.lemonsqueezy.com/billing";

// Chaque bouton passe par le backend du plugin, qui crée un checkout Lemon Squeezy avec
// le plan choisi présélectionné ET les deux autres commutables sur la page de paiement
// (impossible avec le lien public, où `enabled` ne fait que restreindre). Le code promo
// de lancement est pré-rempli quand LAUNCH.enabled est vrai.
const CHECKOUT_API = "https://logotyps.vercel.app/api/checkout";
export const LAUNCH = { enabled: false, code: "LANCEMENT", until: "2026-10-05" };
const withCode = (plan: string) => `${CHECKOUT_API}?plan=${plan}` + (LAUNCH.enabled ? `&code=${LAUNCH.code}` : "");
export const CHECKOUT_ANNUAL = withCode("annual");
export const CHECKOUT_LIFETIME = withCode("lifetime");
export const CHECKOUT_STUDIO = withCode("studio");
